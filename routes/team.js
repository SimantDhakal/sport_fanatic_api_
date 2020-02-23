const express = require("express");
const Team = require("../models/team");
const router = express.Router();

// upload
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
var upload = multer({ storage: storage });

// create team here
router.post("/create_team",upload.single("profilePicture"), (req, res, next) => {
    console.log(req.file);
    Team.create({
        team_name: req.body.team_name,
        no_of_players: req.body.no_of_players,
        info: req.body.info,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        addresses: req.body.addresses,
        image: req.file.filename
    })
    .then(news => {
        res.json({ status: "Successfully created team!!"});
    })
    .catch(next);
});

// get team profile
router.post('/getTeam', (req,res,next) => {
  const id = req.body._user_id;
  result=[];
  var data={};
  Team.find({_id:id}).exec()
  .then(doc => {
      if(doc) {
          data.full_name=doc[0].fullname;
          data.email=doc[0].email;
          data.phone=doc[0].number;
          data.address=doc[0].address;
          data.image=doc[0].image;
       res.json(data);
      }else{
          res.status(404).json({
              message: 'No team found'
          });
      }
  }).catch(err => {
      console.log(err);
      res.status(500).json({error:err});
  });
});

// search team by name
router.post('/searchTeam', (req,res,next) => {
  const id = req.body.team_name;
  // RegExp used as LIKE 
  Team.find({team_name: new RegExp(id)}).exec()
  .then(doc => {
    console.log(doc);
      if(doc) {
       res.status(200).json(doc);
      }else{
          res.status(404).json({
              message: 'No data found'
          });
      }
  }).catch(err => {
      console.log(err);
      res.status(500).json({error:err});
  });
});

module.exports = router;