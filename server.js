
// =-=-=-=-=- Express -=-=-=-=- //
var express = require('express');
var app = express();

// =-=-=-=-=- Mongoose -=-=-=-=- //
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pets', {useNewUrlParser: true}); // name of DataBase!!!!

//Use Native Promises
mongoose.Promise = global.Promise;

// Require path
var path = require('path');

// Integrate body-parser with our App

const bodyParser = require("body-parser");

// -=-=-=-=-=-=-=-=-=-=-=-=- Use static folder directory -=-=-=-=-=-=-=-=-=-//
//app.use(express.static(path.join(__dirname, 'static'))); dup
// app.use(express.static(__dirname + "/static"));Altered for static anglar files
app.use(express.static( __dirname + '/public/dist/public' ));

// -=-=-=-=-=-=-=-=-=-=-=-=- // Setting our View Engine location -=-=-=-=-=-=-=-=-=-//
//app.set('views', path.join(__dirname, './views')); now in json

// -=-=-=-=-=-=-=-=-=-=-=-=- Setting up SCHEMAs -=-=-=-=-=-=-=-=-=-//
//var Schema = mongoose.Schema;

var PetSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Pet must have a name"], minlength: [3, "Title must be at least 3 chars long"]}, //validations added so that no empty fields are permitted
    type: {type: String, required: [true, "Pet must have a type "], minlength: [3, "Title must be at least 3 chars long"]}, //validations added so that no empty fields are permitted
    desc: {type: String, required: [true, "Please describe your pet"], minlength: [3, "Title must be at least 3 chars long"]}, //validations added so that no empty fields are permitte
    sk1: { type: String }, //Not required
    sk2: { type: String },
    sk3: { type: String },
    // comp: {type: Boolean, required: [false, "false is not, true means that it is done"]}, 
    },{ timestamps: true });

//-=-=-=-=-=- Store models in variables
mongoose.model("Pet", PetSchema); // make collection

// -=-=-=-=- Set models by passing the schemas -=-=-=-=--=//

var Pet = mongoose.model("Pet"); //store collection inside

// ================================== ROUTES!!! ===============================//

app.use(bodyParser.json());

// //GET ALL -

app.get('/pet', function(req, res){
    Pet.find({}, function(err, data){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
            console.log('Success - get in app.get - get all');
            res.json({message: "Success", data: data})
        }
    })
})

// //GET by Id
app.get('/pet/:id', function(req, res){
    Pet.findById(req.params.id, function(err, data){
        if(err){
            console.log("Returned error Getting by ID", err);
             // respond with JSON
            res.json({message: "Returned error Getting by ID", error: err})
         }
         else {
             // respond with JSON
             console.log('Success - get in app.get - get by id!');
             res.json({message: "Success got data in app.get by id", data: data})
         }
    })
})

// // //POST -

app.post('/pet/', function(req, res){
    console.log("Posting in a new pet: ", req.body);
    Pet.create(req.body, function(err, data){
        if(err){
            // handle the error from creating a blog
            //console.log("Something went wrong in - saving task/post", err);
            res.json({message: "Error - Posting in a post  new pet", error: err})
        }
        else {
            console.log('Success - Posting in app.post - new pet!');
            res.json({message: "Success!", data:data})
        }
    })    
})

//PUT by id - corrected
app.put('/pet/', function(req, res){
    console.log("ADDing in a name: ", req.body);
    //Pet.create(req.body, function(err, data){
    Pet.findByIdAndUpdate({_id: req.body._id}, {$set:{title: req.body.title, price: req.body.price, imgUrl: req.body.imgUrl}}, function(err, data){
        if(err){
            // handle the error from creating a blog
            console.log("Something went wrong in - app.put Putting in an ID", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log('Success - Posting app.put in a Task by ID!');
            res.json({message: "Success!", data:data})
        }
    })
})

// //DELETE by id ?
app.delete('/pet/:id', function(req, res){
    console.log("deleting by id, in a name: ", req.body);
    Pet.findByIdAndDelete(req.params.id, function(err, data){
        if(err){
            // handle the error from creating a blog
            console.log("Something went wrong in - app.delete Deleting by ID", err);
            res.json({message: "Error", error: err});
        }
        else {
            console.log('successfully Deleted!');
            res.json({message: "Success!", data:data});
        }
    })    
})

// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});


// -=-=-=-=-=-=-=-Setting our Server to Listen on Port: 8000 -=-=-=-=-
app.listen(8000, function() {
    console.log("Board is running, listening on port 8000");
    });  



