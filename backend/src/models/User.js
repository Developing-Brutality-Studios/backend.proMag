const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    tel: {
       type: String            
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    googel:{
        type: Boolean
    }
}, {
    timestamps: true
});

userSchema.methods.encryptPassword =  async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);