const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Register= new mongoose.Schema(
{
    fullname:{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    },
    address:{
        type:String
    },
    number:{
       type:String 
    },
    image:{
        type:String
    }
});

module.exports=mongoose.model('_tbl_user',Register);