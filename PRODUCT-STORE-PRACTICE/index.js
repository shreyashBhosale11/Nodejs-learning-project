const express = require("express");
const { json } = require("stream/consumers");
const products = require("./model/products")
const productsRouers = require("./routes/products.routes")

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', function(req , res){
    return res.end("This is Home Page")
})

app.use("/products" ,productsRouers)





app.listen(port , ()=>{
    console.log("http server is runing on port 8000");
    
})