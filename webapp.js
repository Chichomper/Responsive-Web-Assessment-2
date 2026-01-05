const express = require('express');
const mongoose = require('mongoose'); // 1. Import Mongoose
const app = express();
const port = 3000;

app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/myPortfolio')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect...', err));

// 3. Define a "Schema" (The structure of your art data)
const artSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    description: String
});

const Art = mongoose.model('Art', artSchema);

// 4. Create an API route to get art from the database
app.get('/api/art', async (req, res) => {
    const artworks = await Art.find();
    res.json(artworks);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
