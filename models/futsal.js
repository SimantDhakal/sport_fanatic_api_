const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const futsalSchema= new mongoose.Schema(
{
    futsal_name:String,
    futsal_desc:String,
    price:String,
    image:String,
    cover_video:String,
    latitude:String,
    longitude:String,
    city:String,
    location:String,
    map:String,
    upload_on:String
});

module.exports=mongoose.model('_tbl_futsal',futsalSchema);