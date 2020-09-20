const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(!user) {
      return res.json({err: true, prop:'email err'})
  }
  const validPassword = await user.comparePassword(req.body.password, user.password);
  if (!validPassword) {
    return res.json({err: true, prop: 'password err'})
  }
  const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24
  });
  res.status(200).json({err: false, auth: true, token});
});


module.exports = router;
