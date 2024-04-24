const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {   
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://localhost:27017/test').then((res)=>{
    console.log(res);
})

const saltRounds = 10;

// by using of mongoose we create a object and schema for the model
//Creating Schema using Mongoose
const data = new mongoose.Schema({
    email:String,
    password:String,
})

//Creating Model or instance Using Schema
const auth = mongoose.model('auth',data);

// End point todeal with register
app.post('/auth',(req,res)=>{
    // console.log("Called Frontend");
    // const email = req.body.email;
    // const password = req.body.password;
    
    // if( email === "example@gmail.com" && password === "1234"){
    //     res.json(true);
    // }else{
    //     res.json(false);
    // }

    // console.log(req.body.email);
    // console.log(req.body.password);
   
   console.log(req.body);
   const password = req.body.password;
   const email = req.body.email;

   auth.findOne({email}).then((val)=>{
   
    if(val==null)
    {
      console.log("No data found")
      
      bcrypt.hash(password,saltRounds,function(err,hash){
        console.log(hash)
        let sendauth = new auth({email:email,password:hash});
      sendauth.save().then((val)=>{
        console.log(val)
        res.json(val)
      })
    });
      
    }
    else{
      console.log("user already exist")
    }
  })
})


//End point to deal with log gin
app.post('/login',(req,res)=>{
    const email = req.body.email;
    console.log(email);
    auth.findOne({email : email}).then((val) =>{

       if( val != null) {
       console.log(val);
       
       bcrypt.compare(req.body.password,val.password , function(err , result){
        console.log(result);
        res.json(result);
       })
    }else{
        res.json("Enter Correct Email")
        // console.log(val)
    }
    })
})

// get to send data to frontend 

app.get('/dashboard',(req,res)=>{
    res.json()
})

app.listen(4000 ,( res) => {
    console.log(`example app listening on the port `);

});
