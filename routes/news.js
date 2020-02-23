const express = require("express");
const News = require("../models/news");
const router = express.Router();

router.post("/", (req, res, next) => {
        News.create({
            news_title: req.body.news_title,
            news_desc: req.body.news_desc,
            news_image: req.body.news_image,
            post_time: req.body.post_time,
            post_source: req.body.post_source
        })
            .then(news => {
                res.json({ status: "success!"});
            })
            .catch(next);
});

router.get('/news_api', (req, res, next) => {
    News.find()
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

router.post('/getNews', (req,res,next) => {
  const id = req.body.newsId;
  News.find({_id:id}).exec()
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