const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://aadi:mongopass123@cluster0.lwjxmia.mongodb.net/RechargeRadar?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema, 'Users');

const stationSchema = new mongoose.Schema({
    area: String,
    name: String,
    address: String,
    contact: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    image: String,
    logo: String,
    status: String,
    slots: [{
      slotNumber: String,
      timing: String
    }]
  });
  
  

const Station = mongoose.model('Station', stationSchema, 'stations');

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set secure: true in production with HTTPS
}));

app.post('/register', async (req, res) => {
  const { name, phone, username, password, email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, phone, username, password, email });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/stations', async (req, res) => {
  try {
    const stations = await Station.find().exec();
    res.status(200).json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/stations', async (req, res) => {
    const { area, name, address, contact, location, image, logo } = req.body;
  
    try {
      const newStation = new Station({ area, name, address, contact, location, image, logo });
      await newStation.save();
  
      res.status(200).json({ message: 'Station created successfully' });
    } catch (error) {
      console.error('Error creating station:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.put('/stations/:id', async (req, res) => {
    const { id } = req.params;
    const { area, name, address, contact, location, image, logo } = req.body;
  
    try {
      await Station.findByIdAndUpdate(id, { area, name, address, contact, location, image, logo });
  
      res.status(200).json({ message: 'Station updated successfully' });
    } catch (error) {
      console.error('Error updating station:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  app.delete('/stations/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Station.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Station deleted successfully' });
    } catch (error) {
      console.error('Error deleting station:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/bookSlot', async (req, res) => {
    const { stationId, slotId } = req.body;
  
    try {
      const station = await Station.findById(stationId);
      if (!station) {
        return res.status(404).json({ message: 'Station not found' });
      }
  
      const slot = station.slots.id(slotId);
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      if (slot.isBooked) {
        return res.status(400).json({ message: 'Slot already booked' });
      }
  
      slot.isBooked = true;
      await station.save();
  
      res.status(200).json({ message: 'Slot booked successfully' });
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
