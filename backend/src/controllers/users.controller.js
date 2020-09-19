const UsersCtrl = {};
const jwt = require('jsonwebtoken');
const { formatWithOptions } = require('util');
const User = require('../models/User');


UsersCtrl.getUsers = async (req, res) => {
    const users =  await User.find();
    res.json({users});
}

UsersCtrl.createUser = async ( req, res) => {
    const {name, email, tel, password, googel } = req.body;
    const newUser = new User({name, email, tel, password, googel});
    newUser.password = await newUser.encryptPassword(password);
    User.find({ email: email },async (err, a) => {
        if(a.length > 0){
            res.json({m: "Email registrado"})
        } else{
            await newUser.save();
            res.json({m : 1})
        }

    })
  //  
   
}

UsersCtrl.getUser = async (req, res) => {
    const decoded =  await jwt.verify(req.params.id, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.id );    
    res.json({user});
};

UsersCtrl.updateUser =  async (req, res) => {
    const  {name, email, tel } = req.body;
    await User.findOneAndUpdate(req.params.id, {name, email, tel} );
    res.json({message:'Note update'})
}
UsersCtrl.deleteUser = async (req, res) => {
    await User.findOneAndDelete(req.params.id);    
    res.json({message: 'Delete note'});
}


module.exports = UsersCtrl;
