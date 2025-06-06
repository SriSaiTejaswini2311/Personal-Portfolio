const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the views directory
app.use(express.static(path.join(__dirname, 'frontend/views')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/views/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/views/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/views/contact.html'));
});

app.get('/reply', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/views/reply.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 