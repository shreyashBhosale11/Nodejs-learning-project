const http = require("node:http")

const server = http.createServer(function(req , res){
    console.log(`Incoming request at [${Date.now()}]`)
    // console.log(req.headers);
    console.log(req.method);
    console.log(req.url);

    switch (req.url) {
        case '/':
            return res.end("homePage")
        case '/about':
            return res.end('I am a software Engginer')
        
    
        default:
            res.writeHead(404)
            res.end(" you are lost")
            break;
    }



    //..
    // res.writeHead(200);
    // res.end("OK!")

})

server.listen(8000 , ()=>{
    console.log("server is runing on PORT: 8000")
})