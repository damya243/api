//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect("mongodb://localhost:27017/store",{useNewUrlParser:true});
const storeSchema={
    name:String,
    totalSale:String,
    targetSale:String,
    color:String,
    percentage:Number,
    level:String,
    category:String
}
const article=mongoose.model("Article",storeSchema);

app.get("/articles",function(req,res){
    article.find(function(err,foundArticles){
        console.log(foundArticles);
})});

// Create product
app.post("/api/v1/article/new",(req,res)=>{
    const item=await article.create(req.body);
    res.status(200).json({
        sucess:true
    })
});

// Read Product (retrive data)
app.get("/api/v1/artice/new/:id/:cat",(req,res)=>{
    const reqItem=(article.findOne({category:req.params.cat},{level:req.params.id}));
    res.status(200).json({
        sucess:true,
        reqItem
    })
});

// Getting parent 
app.get("/api/v1/artice/new/parent/:id/:cat",(req,res)=>{
    const catChild=req.params.cat;
    const idChild=req.params.id;
    const catParent=(catChild-1)/2;
    const idParent=idChild-1;
    const reqItem=(article.findOne({category:catParent},{level:idParent}));
    res.status(200).json({
        sucess:true,
        reqItem
    })
});

// Deleting item 
app.delete("/api/v1/artice/new/parent/:id/:cat/:flag",(req,res)=>{
        const reqItem=(article.findOne({category:req.params.cat},{level:req.params.id}));
        article.remove(reqItem);
  
   res.status(200).json({
         sucess:true,
         message:"Product is deleted"
   })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});