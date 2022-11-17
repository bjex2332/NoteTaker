const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, deleteNote } = require('../helpers/fs');

// route to get notes
router.get('/api/notes', (req, res) => 
 readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// route to add a new note and add it to the json file
router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        };
        readAndAppend(newNote, './db/db.json');

        const interfaceResponse = {
            status: 'New Note Added',
            body: newNote,
        }

        res.json(interfaceResponse);
    } else {
        res.json('Error in adding note');
    }
});

// router.delete('/api/notes/:id', (req, res) => {
//     if (req.params.id) {
//     deleteNote(req.params.id);
//     } else {
//         res.json('Error in deletion');
//     }
// });

module.exports = router;