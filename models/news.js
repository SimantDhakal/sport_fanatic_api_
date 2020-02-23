const mongoose=require('mongoose');
const newsSchema= new mongoose.Schema(
{
    news_title:String,
    news_desc:String,
    news_image:String,
    post_time:String,
    post_source:String
});

module.exports=mongoose.model('_tbl_news',newsSchema);