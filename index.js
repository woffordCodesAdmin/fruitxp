const express = require("express");
const app = express();
// const fruit = require('./models/fruits')
require('dotenv').config()
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');


// ----------[MiddleWare]
app.set('view engine', 'jsx');
    // ---> This allows your ExpressApp to have a view on browser
app.engine('jsx', require('express-react-views').createEngine());
    // ---> This instantiates the view engine& creates an instance of the view engine created above
app.use(express.urlencoded({extended:false}));
    // --> This parses incoming requests with urlencoded payloads and is based on a middleware called body-parser.

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
// -----> Instantiates Middleware to be executed during requestCycle.

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


// --------------------------------[Routes]
// ----------> [Index]
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('Index', {
            fruits: allFruits
        });
    });
});

// -------------> [New]
app.get('/fruits/new', (req, res) => {
    res.render('New');
});



// -------------> [POST]
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){ 
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; 
        //set to true
    } else { 
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; 
        //set to false
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.render('Show',{fruit: createdFruit})
        res.redirect('/fruits');
    });
});

// ----------> [Show]
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params._id, (err, foundFruit)=>{
        
        res.send({fruit: foundFruit})
        console.log(err)
        // res.send(foundFruit);
    });
});









app.listen(3000, () => {
  console.log("listening");
});
