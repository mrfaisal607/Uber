const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3,"First name should be at least 3 characters long"],
        },
        lastname:{
            type: String,
             minlength: [3,"Last name should be at least 3 characters long"],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength :[5,"Email should be at least 5 characters long"],
    },
    password:{
        type: String,
        required: true,
        minlength: [8,"Password should be at least 8 characters long"],
        select:false,
    },
    socketId:{
        type: String,
    }
});

userSchema.method.ggenerateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}


userSchema.method.commparePassword = async function(){
    return await bcrypt.compareSync(this.password, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('user', userSchema);


module.exports = userModel;

