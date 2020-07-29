const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: String,
    nombre: String,
    password: String,
    tel: String
}, {
    timestamps: true
}); 

module.exports = model('User',userSchema);