const express = require("express");
const Futsal = require("../models/futsal");
const router = express.Router();

router.post("/", (req, res, next) => {
        Futsal.create({
            futsal_name: req.body.futsal_name,
            futsal_desc: req.body.futsal_desc,
            price: req.body.price,
            cover_video: req.body.cover_video,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            city: req.body.city,
            location: req.body.location,
            map: req.body.map,
            upload_on: req.body.upload_on
        })
            .then(futsal => {
                res.json({ status: "success!"});
            })
            .catch(next);
});
 
router.get('/futsal_api', (req, res, next) => {
    Futsal.find()
        .exec()
        .then(docs => {
            result=[];
          docs.forEach(doc => {
              var data={};
              data.futsal_name=doc.futsal_name;
              data.futsal_desc=doc.futsal_desc;
              data.price=doc.price;
              data.latitude=doc.latitude;
              data.city=doc.city;
              data.longitude=doc.longitude;
              data.map=doc.map;
              data.upload_on=doc.upload_on;
              data.location=doc.location;
              data.futsal_id=doc._id;
              data.image=doc.image;
              result.push(data);
              
          });
    
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/futsal_brief', (req,res,next) => {
  const id = req.body.futsal_id;
  console.log(id);
  Futsal.find({_id:id}).exec()
  .then(doc => {
      if(doc) {
          result={};
          result.futsal_name=doc[0].futsal_name;
          result.futsal_desc=doc[0].futsal_desc;
          result.location=doc[0].location;
       res.status(200).json(result);
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

router.post('/locationEvent_api', (req,res,next) => {
    const id = req.body.futsalId;
    Futsal.find({city:id}).exec()
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