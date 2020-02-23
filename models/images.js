const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const eventSchema= new mongoose.Schema(
{
    image:String,
    futsal_id:String
});

module.exports=mongoose.model('_tbl_image',eventSchema);