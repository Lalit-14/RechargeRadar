const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb+srv://aadi:mongopass123@cluster0.lwjxmia.mongodb.net/VolunteerBridge?retryWrites=true&w=majority")
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error("Error connecting to MongoDB:", err));