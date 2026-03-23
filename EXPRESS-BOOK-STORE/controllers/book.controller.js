const {books} = require("../db/book")

exports.getAllbooks = function (req , res){
    res.json(books)
}

exports.getBookByID = function(req , res){
    const id = parseInt(req.params.xyz);
    if(isNaN(id)){
        return res.status(400).json({error:"id must be a type number"});
    }

    const book = books.find(e => e.id === id);



    if(!book) return res.status(404).json({error:`Book with ${id} does not exsites`});

    return res.json(book);
}

exports.createtBook = function(req , res){
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
}

exports.deleteBookByID = function(req , res){
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

}