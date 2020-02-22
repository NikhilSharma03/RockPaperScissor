const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportLocalmongoose = require('passport-local-mongoose');

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: 'HelloRinaSayMelloRimaSayMostHumblyIamForYou',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Database
mongoose.connect('mongodb://localhost:27017/game', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const gameSchema = new mongoose.Schema({
    name:String,
    username:String,
    passport:String
});
gameSchema.plugin(passportLocalmongoose);

const game = mongoose.model("game",gameSchema);
passport.use(game.createStrategy()); 
passport.serializeUser(game.serializeUser());
passport.deserializeUser(game.deserializeUser());

let usern = "";
//Listen
app.listen(process.env.PORT || 3000,()=>{
   console.log("Server Is Running On 3000"); 
});

//Get Request
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.get("/game",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("game",{player:usern});
    } else{
        res.redirect("/login");
    }
});

//Post Request
app.post("/signup",(req,res)=>{
    usern = req.body.name;
    game.register({username:req.body.username,name:req.body.name},req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/signup");
        } else {
            passport.authenticate("local")(req,res,()=> {
                res.redirect("/game");
            })
    }});
});

app.post("/login",(req,res)=>{
    usern = req.body.name;
    const user = new game({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user, function(err) {
        if(err){
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req,res,()=> {
                res.redirect("/game");
        })}
    })
});