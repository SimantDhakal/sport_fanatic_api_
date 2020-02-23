const express = require("express");
const Review = require("../models/review");
const router = express.Router();

router.post("/", (req, res, next) => {
        Review.create({
            email: req.body.email,
            futsal_id: req.body.futsal_id,
            review_desc: req.body.review_desc,
            timestamp: req.body.timestamp,
            full_name: req.body.full_name,
            profile_pic: req.body.profile_pic
        })
            .then(review => {
                res.json({ status: "success!"});
            })
            .catch(next);
});

router.get('/review_api', (req, res, next) => {
    Review.find()
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

router.post('/futsal_review_api', (req,res,next) => {
  const id = req.body.futsal_id;
  Review.find({futsal_id:id}).exec()
  .then(doc => {
      if(doc) {
          console.log(doc);
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