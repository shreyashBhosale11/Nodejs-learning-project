// const {books} = require("../model/book.model")
// const db = require("../db/index")
// const booksTable = require("../model/book.model")
// const { eq} = require("drizzle-orm")

// exports.getAllbooks = async function (req , res){
//     const books = await db.select().from(booksTable)
//     return res.json(books)
// }

// exports.getBookByID =async function(req , res){
//     // const id = parseInt(req.params.xyz);
//     const id = req.params.xyz;

//     // if(isNaN(id)){
//     //     return res.status(400).json({error:"id must be a type number"});
//     // }

//     // const book = books.find(e => e.id === id);
//      books = await db.select()
//      .from(booksTable)
//      .where(table => eq(table.id , id))
//      .limit(1);



//     if(!book) return res.status(404).json({error:`Book with ${id} does not exsites`});

//     return res.json(book);
// }

// exports.createtBook = async function(req , res){
//     const {title ,discription,  authorId}= req.body;

//     if(!title || title ===""){
//         return res.status(404).json({error:`title is reqiured`});
//     }

//     //  if(!author || author ===""){
//     //     return res.status(404).json({error:`author is reqiured`});
//     // }

//     const[ result] = await db.insert(booksTable).value({
//         title, 
//         authorId ,
//         discription
//     }).returining({
//         id: booksTable.id
//     })

//     // const id = books.length + 1;

//     // const book = {id: id , title , author }
//     // books.push(book)

//     return res.status(201).json({message:`Book created success , id :${result.id}`})
// }

// exports.deleteBookByID =async function(req , res){
//     // const id = parseInt(req.params.id);
//     const id = req.params.id;

//     // if(isNaN(id)){
//     //     return res.status(400).json({error:"id must be a type number"});
//     // }


//     // const indexToDelete = books.findIndex(e=> e.id === id)

//     // if(indexToDelete < 0){
//     //     return res.status(404).json({error:`Book with ${id} does not exsites`});
//     // }

//     // books.splice(indexToDelete , 1);

//     await db.delete(booksTable).where(eq(booksTable.id ,id))

//     return res.status(200).json({message : "book deleted"})

// }


const { booksTable } = require("../model");
const { autherTable } = require("../model");

const db = require("../db/index");
const {sql} = require("drizzle-orm")
const { eq , ilike } = require("drizzle-orm");

exports.getAllbooks = async function (req, res) {
    const search = req.query.search;

    if(search){
        const books = await db.select().from(booksTable)
        .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);

        return res.json(books);
    }
    console.log({search})
    const books = await db.select().from(booksTable);
    return res.json(books);
};

exports.getBookByID = async function (req, res) {
    // const id = parseInt(req.params.xyz);
     const id = req.params.xyz;

    const book = await db.select()
        .from(booksTable)
        .where(eq(booksTable.id, id))
        .leftJoin(autherTable , eq(booksTable.authorId , autherTable.id))
        .limit(1);

    if (book.length === 0) {
        return res.status(404).json({ error: `Book with ${id} does not exist` });
    }

    return res.json(book[0]);
};

exports.createtBook = async function (req, res) {
    const { title, description, authorId } = req.body;

    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }

    const [result] = await db.insert(booksTable).values({
        title,
        description,
        authorId
    }).returning({
        id: booksTable.id
    });

    return res.status(201).json({
        message: `Book created successfully, id: ${result.id}`
    });
};

exports.deleteBookByID = async function (req, res) {
    const id = parseInt(req.params.id);

    await db.delete(booksTable).where(eq(booksTable.id, id));

    return res.status(200).json({ message: "book deleted" });
};