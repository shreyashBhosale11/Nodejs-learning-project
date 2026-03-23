const express = require("express");
const { title } = require("process");
const fs = require("node:fs")


const app = express();
const port = 8000;

// in Memory DB
const books = [
    {id: 1 , title:'Book one', author: 'Auther one'},
    {id: 2 , title:'Book Two', author: 'Auther Two'},

];
//Middlewares (plugeins)
app.use(express.json());

// ours custom middelware 
app.use(function(req , res , next ){
    const log = `\n[${Date.now()} ${req.method} ${req.path}]`
    fs.appendFileSync('log.txt' , log , 'utf-8')
    next();
}); 
app.use(function(req , res , next ){
    console.log("I am Middleware A")
    next();
}); 
app.use(function(req , res , next ){
    console.log("I am Middleware B")
    next();
}); 

//Routes
app.get('/books', (req , res)=>{
    res.json(books)
})

app.get('/books/:xyz', (req , res)=>{
    const id = parseInt(req.params.xyz);
    if(isNaN(id)){
        return res.status(400).json({error:"id must be a type number"});
    }

    const book = books.find(e => e.id === id);



    if(!book) return res.status(404).json({error:`Book with ${id} does not exsites`});

    return res.json(book);
})

app.post('/books', (req , res)=>{
    const {title , author}= req.body;

    if(!title || title ===""){
        return res.status(404).json({error:`title is reqiured`});
    }

     if(!author || author ===""){
        return res.status(404).json({error:`author is reqiured`});
    }

    const id = books.length + 1;

    const book = {id: id , title , author }
    books.push(book)

    return res.status(201).json({message:`Book created success , id :${id}`})
})


app.delete('/books/:id', (req , res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({error:"id must be a type number"});
    }


    const indexToDelete = books.findIndex(e=> e.id === id)

    if(indexToDelete < 0){
        return res.status(404).json({error:`Book with ${id} does not exsites`});
    }

    books.splice(indexToDelete , 1);

    return res.status(200).json({message : "book deleted"})

})
app.listen(port , ()=>console.log("Http server is runing on PORT 8000"));


