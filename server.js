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
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNotes (body, createdNote) {
    const newNote = body;
    if (!Array.isArray(createdNote))
        createdNote= [];

    if(createdNote.length === 0)
        createdNote.push(0);

    body.id = createdNote[0];
    createdNote[0]++;

    createdNote.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(createdNote, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNotes(req.body, completeNotes);
    res.json(newNote);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});