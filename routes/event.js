const express = require("express");
const Event = require("../models/event");
const router = express.Router();

router.post("/", (req, res, next) => {
        Event.create({
            full_name: req.body.event_name,
            event_desc: req.body.event_desc,
            futsal_name: req.body.price,
            location: req.body.cover_video,
            post_date: req.body.latitude,
            event_name: req.body.longitude,
            event_description: req.body.city,
            image: req.body.location,
            map: req.body.map,
            futsal_id:req.body.futsal_id
        })
            .then(event => {
                res.json({ status: "success!"});
            })
            .catch(next);
});

router.get('/event_api', (req, res, next) => {
    Event.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/event_futsal_api', (req,res,next) => {
  const id = req.body.futsal_id;
  
  Event.find({futsal_id:id}).exec()
  .then(doc => {
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