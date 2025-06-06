// backend/app.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const Message = require('./models/Message');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/contact.html'));
});

app.get('/reply', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/reply.html'));
});

app.post('/reply', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.sendFile(path.join(__dirname, '../frontend/views/success.html'));
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).send('Error saving message.');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


