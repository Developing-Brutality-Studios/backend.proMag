const notesCtrl = {};
const Note = require('../models/Note');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


notesCtrl.getNotes = async (req, res) => {
    const notes =  await Note.find();
    res.json({notes});
}

notesCtrl.createNotes = async (req, res) => {
    const aut =  await jwt.verify(req.params.id, process.env.ACCESS_TOKEN_SECRET)
    const author= aut.id
     const {title, content, date, grupo } = req.body;
     const newNote = new Note({title, content, date, author, grupo});     
     await newNote.save();
    res.json({
        message: 'Notes save',
        err: false
    })
}

notesCtrl.getNote = async (req, res) => {
    const aut =  await jwt.verify(req.params.id, process.env.ACCESS_TOKEN_SECRET)
    const author = aut.id
    const note = await Note.find({ author: author});                                    
    res.json(note);
};

notesCtrl.updateNote = async (req, res) => {
    const  {title, content, date, author } = req.body;
    await Note.findOneAndUpdate(req.params.id, {title, content, date, author} );
    res.json({message:'Note update'})
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findOneAndDelete(req.params.id);    
    res.json({message: 'Delete note'});
}


module.exports = notesCtrl;