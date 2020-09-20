const { Router } =  require('express');
const router = Router();

const { getNotes, createNotes, getNote, updateNote, deleteNote } = require('../controllers/notes.controller');

router.route('/todas')
        .get(getNotes)
        
router.route('/:id')
        .post(createNotes)
        .get(getNote)
        .put(updateNote)
        .delete(deleteNote);
module.exports = router;