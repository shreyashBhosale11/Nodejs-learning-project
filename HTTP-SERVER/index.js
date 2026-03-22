const http = require("node:http")

const server = http.createServer(function(req , res){
    console.log("I got an incoming request")
    //db..
    res.writeHead(200)
    res.end("Thanks for visiting my server")
});

server.listen(8000 , ()=>{
    console.log(`Http server is up and running on port 8000`);
    
});

