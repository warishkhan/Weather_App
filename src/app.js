const express = require("express");
const path = require("path");
const hbs = require("hbs")
const app = express();

const port = process.env.PORT || 8000;

const public_path =  path.join(__dirname,"../public");
const template_path =  path.join(__dirname,"../templates/views");
const partials_path =  path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.use(express.static(public_path))

app.get("/",(req,res)=>{
    res.render('index');
})
app.get("/weather",(req,res)=>{
    res.render('weather');
})
app.get("/about",(req,res)=>{
    res.render('about');
})
app.get("*",(req,res)=>{
    res.render('404error',{
        errormsg:'Opps! Page Not Found'
    });
})

app.listen(port,()=>{
    console.log(`app is listening to the port at ${port}`);
})