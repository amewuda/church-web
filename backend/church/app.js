var express = require("express");
app = express();
mongoose = require("mongoose");
bodyparser = require("body-parser");
mongoose.connect("mongodb://localhost/church");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
var churchSchema = new mongoose.Schema({
    name_of_ministry : String,
    speaker : String,
    topic : String,
    attendance : Number,
    offering : Number,
    body : String
});
var church = mongoose.model("church", churchSchema);

//  church.create({
//        name_of_ministry: "Evangelism ministry",
//        speaker: "Pastor James Mckweon",
//        topic: "The Holy Spirit",
//        attendance: 100,    
//        offering: 500,
//        body: "THE HOLY SPIRIT IS GOD'S GIFT UNTO US. IT IS HIS DESIRE TO BLESS ANY MAN WHO DESIRES TO BE BLESSED"
//    });
app.get("/", function(req,res){
    res.redirect("/church");
});
app.get("/church", function(req,res){
    church.find({}, function(err, churchies){
        if (err){
            console.log("ERROR");
        } else {
            res.render("index", {church: churchies});
        }
    })
});
app.get("/church/new/", function(req,res){
    res.render("new");
});
app.post("/church", function(req,res){
    church.create(req.body.church, function(err, churchies){
        if (err){
            res.render("new");
        } else {
            res.redirect("/church");
        }
    });
});
app.get("/church/:id", function(req, res){
    church.findById(req.params.id, function(err, showChurch){
        if (err){
            res.redirect("/church");
        } else {
            res.render("show", {church:showChurch});
        }
    });
});
app.get("/church/:id/edit", function(req,res){
    res.render("edit");
});

app.listen(3000, function(){
    console.log("The server has started");
});