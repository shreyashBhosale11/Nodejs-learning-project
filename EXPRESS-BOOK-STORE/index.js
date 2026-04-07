require("dotenv").config();

const express = require("express");
const { title } = require("process");

const authorRoute = require("./routes/author.routes")
const bookRouters = require("./routes/book.routes")
const {loggerMiddleware} = require("./middlewares/logger")



const app = express();
const port = 8000;

// in Memory DB

//Middlewares (plugeins)
app.use(express.json());

// ours custom middelware 
app.use(loggerMiddleware); 

app.use(function(req , res , next ){
    console.log("I am Middleware B")
    next();
}); 

//Routes
app.use('/books',bookRouters);
app.use('/authors',authorRoute);







app.listen(port , ()=>console.log("Http server is runing on PORT 8000"));


