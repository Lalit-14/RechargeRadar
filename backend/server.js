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
  username: {type:String, unique: true},
  password: String,
  email: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema, 'Users');

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
