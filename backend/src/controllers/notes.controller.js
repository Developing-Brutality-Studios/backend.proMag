const notesCtrl = {};
const Note = require('../models/Note');


notesCtrl.getNotes = async (req, res) => {
    const notes =  await Note.find();
    res.json({notes});
}

notesCtrl.createNotes = async ( req, res) => {
     const {title, content, date, author } = req.body;
     const newNote = new Note({title, content, date, author});
     console.log(newNote);
     await newNote.save();
    res.json({message: 'Notes save'})
}

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);    
    res.json({note});
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