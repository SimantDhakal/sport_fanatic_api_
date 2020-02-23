const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const futsalSchema= new mongoose.Schema(
{
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "_tbl_team",
        required:true
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "_tbl_user",
        required:true
      },
});

module.exports=mongoose.model('_tbl_teamlist',futsalSchema);