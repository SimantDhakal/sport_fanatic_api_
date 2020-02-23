const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const eventSchema= new mongoose.Schema(
{
    email:String,
    futsal_id:String,
    review_desc:String,
    timestamp:String,
    full_name:String,
    profile_pic:String
});

module.exports=mongoose.model('_tbl_review',eventSchema);