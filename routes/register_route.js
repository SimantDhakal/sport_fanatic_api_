const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("../models/register");
const router = express.Router();
const auth = require("../auth");

// upload
var fs = require('fs');
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

router.post("/register_user",upload.single("profilePicture"), (req, res, next) => {
    console.log(req.file);
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error("Could not hash!");
        }
        Register.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            number: req.body.number,
            image: req.file.filename
        })
            .then(register => {
                let token = jwt.sign({ _id: register._id }, process.env.SECRET);
                res.json({ status: "Signup success!", token: token });
            })
            .catch(next);
    });
});
//forgot password
router.post("/forgotpassword", (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error("Could not hash!");
        }
        Register.findOne({
            email: req.body.email,
            number: req.body.number
        })
            .then(register => {
                password: hash
            })
            .catch(next);
    });
});
router.post("/login_user", (req, res, next) => {
    Register.findOne({ email: req.body.email })
        .then(register => {
            if (register == null) {
                let err = new Error("User not found!");
                err.status = 401;
                return next(err);
            } else {
                bcrypt
                    .compare(req.body.password, register.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            let err = new Error("Password does not match!");
                            err.status = 401;
                            return next(err);
                        }

                        let token = jwt.sign({ _id: register._id }, process.env.SECRET);
                        console.log(token);
                        res.json({ status: "Login success!", token: token, _user_id:register._id });
                    })
                    .catch(next);
            }
        })
        .catch(next);
});
router.get("/me", auth.verifyUser, (req, res, next) => {
    let password = req.Register.password;
    bcrypt.hash(password, 10);
    res.json({
        _id: req.Register._id,
        fullname: req.Register.fullname,
        email: req.Register.email,
        address: req.Register.address,
        number: req.Register.number,
        password: req.Register.password
    });
});
router.put("/me", auth.verifyUser, (req, res, next) => {
    Register.findByIdAndUpdate(
        req.Register._id,
        { $set: req.body },
        { new: true }
    )
        .then(register => {
            res.json({
                _id: register._id,
                fullname: req.register.fullname,
                email: reg.email,
                address: req.register.address,
                number: req.register.number
            });
        })
        .catch(next);
});

router.get('/getusers', (req, res, next) => {
    Register.find()
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
router.delete('/deleteuser/:id', function (req, res, next) {
    Register.findByIdAndDelete(req.params.id).then(response => {
        console.log("User detleted of" + req.params.id)
    })
})

router.post('/getProfile', (req,res,next) => {
  const id = req.body._user_id;
  result=[];
  var data={};
  Register.find({_id:id})
  .exec()
  .then(doc => {
      if(doc) {
          console.log(doc);
          data.full_name=doc[0].fullname;
          data.email=doc[0].email;
          data.phone=doc[0].number;
          data.address=doc[0].address;
          data.image=doc[0].image;
          
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

// testing api
router.post('/mes', (req,res,next) => {
    const _id = req.body._id;
    result=[];
    var data={};
    console.log(_id);
    Register.find({_id:_id})
    .exec()
    .then(doc => {
        if(doc) {
            console.log(doc);
            result={};
            data.fullname=doc[0].user.fullname;
            data.email=doc[0].user.email;
            data.phone=doc[0].user.number;
            data.address=doc[0].user.address;
            data.image=doc[0].user.image;
         res.status(200).json(result);
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