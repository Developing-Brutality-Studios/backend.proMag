const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
 
  const { email, password } = req.body;

  User.find({$and : [{email:email}, {password:password}]}, (err, a) =>{
    a.length < 1 ? 
    res.json({m: "usuario no encontrado"}) : res.json({a})
  })      

});
module.exports = router;