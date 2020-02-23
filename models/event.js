const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const eventSchema= new mongoose.Schema(
{
    full_name:String,
    futsal_name:String,
    location:String,
    post_date:String,
    event_name:String,
    event_description:String,
    image:String,
    map:String,
    futsal_id:String
});

module.exports=mongoose.model('_tbl_event',eventSchema);