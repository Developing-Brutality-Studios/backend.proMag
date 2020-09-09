const UsersCtrl = {};

const User = require('../models/User');

UsersCtrl.getUsers = async (req, res) => {
    const users =  await User.find();
    res.json({users});
}

UsersCtrl.createUser = async ( req, res) => {
    const {name, email, tel, password } = req.body;
    const newUser = new User({name, email, tel, password});
    console.log(newUser);
    await newUser.save();
   res.json({message: 'Notes save'})
}

UsersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);    
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