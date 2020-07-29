const {Router} = require('express');
const router = Router();

const User =require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello word'))

router.post('/registro',async (req, res) => {
    const { email,nombre,password,tel} = req.body;
    const newUser = new User({email,nombre,password,tel});
    await newUser.save();    

    const token = jwt.sign({_id: newUser._id}, 'llave')
    res.status(200).json({token})
})
router.get('/data', verifyToken,(req,res) =>{
    res.json([
        {
            grupo: 'trabajo',
            tarea: 'Lavar ropa'
        }
    ])
})

router.post('/login', async(req, res) => {
    const {email,password} =req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("Usuario no existe");
    if(user.password !== password) return res.status(401).send('Password incorrecta');

    const token = jwt.sign({_id: user._id},'llave');
    return res.status(200).json({token});
    
});

module.exports = router;

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('no autorizado1');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('no autorizado');
    }
    const payload = jwt.verify(token, 'llave')
    req.userId = payload._id;
    next();
}