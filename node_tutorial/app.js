var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://yky:yky123@ds141294.mlab.com:41294/stbc_db");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    { name: "apple", image: "https://image.shutterstock.com/image-photo/red-apple-on-white-background-450w-158989157.jpg" },
    { name: "banana", image: "https://www.istockphoto.com/in/photo/banana-bunch-gm173242750-7671231" },
    { name: "orange", image: "https://media.istockphoto.com/photos/orange-with-leaf-on-white-background-with-clipping-path-picture-id517988386?s=170x170" },
    function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log("Newly created campground");
            console.log(campground);
        }
    }
    );



var campgrounds = [
    { name: "apple", image: "https://image.shutterstock.com/image-photo/red-apple-on-white-background-450w-158989157.jpg" },
    { name: "banana", image: "https://www.istockphoto.com/in/photo/banana-bunch-gm173242750-7671231" },
    { name: "orange", image: "https://media.istockphoto.com/photos/orange-with-leaf-on-white-background-with-clipping-path-picture-id517988386?s=170x170" },
]

app.get("/", function (req, res) {
    // res.send("Landing page");
    res.render("landing");
});

app.get("/campGrounds", function(req, res){
    
    res.render("campGrounds",{campgrounds:campgrounds});

});

app.get("/campGrounds/new", function (req, res) {
    res.render("new");
});

app.post("/campGrounds", function (req,res) {
    // res.send("This is a post request.");
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name:name, image:image};
    campgrounds.push(newCamp);
    res.redirect("/campGrounds");
});



app.listen(8081, "localhost", function () {
    console.log("The yelp camp server has started.");
});