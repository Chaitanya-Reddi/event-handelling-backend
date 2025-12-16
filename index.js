require('dotenv').config();
const express=require('express')
const app=express();
const connectDB=require('./db');
app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(3000,()=>{
    console.log("server runs on 3000 port");
    connectDB();
});


