const express = require("express")

const app = express()

app.get('/',function(req , res){
    res.end('Homepage')
})

app.get('/contact-us', function(req , res){
    res.end("You can Conatact me at my email adress")
});

app.post('/tweet', (req, res)=>{
    res.status(201).end("Tweet created sucess")
})

app.listen(8000, ()=>{
    console.log("server is runing at POET 8000")
})