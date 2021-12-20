const PORT = process.env.PORT || 3001;

const fs = require('fs');

const path = require('path');

const express = require('express');

const app = express();

const completeNotes = require('./db/db.json');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(completeNotes.slice(1));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});