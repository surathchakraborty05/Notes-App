const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get logged in user details using post "/api/auth/getuser" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }

})

//Route 2: Adding New notes using post "/api/auth/addnote" Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a Valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }

})

//Route 3:Update Existing notes using put "/api/auth/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };
        //find the note to be updted
        let note = await Notes.findById(req.params.id);
        console.log(note);
        if (!note) { return req.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id) {
            return req.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }


})
//Route 4:Update Existing notes using DELETE "/api/auth/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be deleted
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }

        //Allows Deletion 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note has been Deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
})

module.exports = router