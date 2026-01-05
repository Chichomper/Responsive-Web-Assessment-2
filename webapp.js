const express = require('express');
const mongoose = require('mongoose'); // Imports Mongoose, the one that helps with interacting with MongoDB
const app = express();
const port = 3000;

app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/myPortfolio')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect...', err));

// Defines a "Schema" (The structure of the art data)
const artSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    description: String
});

const Art = mongoose.model('Art', artSchema);

// Creates an route to get art from the database
app.get('/api/art', async (req, res) => {
    const artworks = await Art.find();
    res.json(artworks);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
