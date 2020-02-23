const express = require("express");
const Image = require("../models/images");
const router = express.Router();

router.post("/", (req, res, next) => {
        Image.create({
            image:req.body.image,
            futsal_id:req.body.futsal_id
        })
            .then(image => {
                res.json({ status: "success!"});
            })
            .catch(next);
});

router.get('/image_api', (req, res, next) => {
    Image.find()
        .exec()
        .then(docs => {
            //console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/futsal_image_api', (req,res,next) => {
  const id = req.body.futsal_id;
console.log(id);
  Image.find({futsal_id:id}).exec()
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