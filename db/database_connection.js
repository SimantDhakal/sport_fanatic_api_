const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://sport_fanatic:simant123@cluster0-4l5jk.mongodb.net/sport_fanatic_api', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true})
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));