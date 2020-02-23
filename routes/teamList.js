const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TeamList = require("../models/teamlist");
const router = express.Router();


router.post("/", (req, res, next) => {
    TeamList.create({
        user: req.body.user,
        team: req.body.team
    })
        .then(futsal => {
            res.json({ status: "success!"});
        })
        .catch(next);
});



router.post('/getProfile', (req,res,next) => {
  const id = req.body._user_id;
  result=[];
  var data={};
  TeamList.find({user:id})
  .populate("user")
  .populate("team")
  .exec()
  .then(doc => {
      if(doc) {
          console.log(doc);
          data.team_name=doc[0].user.team_name;
          data.full_name=doc[0].user.fullname;
          data.email=doc[0].user.email;
          data.phone=doc[0].user.number;
          data.address=doc[0].user.address;
          data.image=doc[0].user.image;
          data.team_name=doc[0].team.team_name
       res.json(data);
      }else{
          res.status(404).json({
              message: 'No users found'
          });
      }
  }).catch(err => {
      console.log(err);
      res.status(500).json({error:err});
  });
});


module.exports = router;