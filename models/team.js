const mongoose=require('mongoose');
const Team= new mongoose.Schema(
{
    team_name:{
        type:String, 
        required: true,
        unique: true
    },
    no_of_players:{
        type:String
    },
    info:{
        type:String,
        required: true
    },
    longitude:{
        type:String
    },
    latitude:{
       type:String 
    },
    addresses:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports=mongoose.model('_tbl_team',Team);