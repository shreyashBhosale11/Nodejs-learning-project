const express = require("express")
const controller = require("../controllers/book.controller")
const authorsTable = require("../model/author.model")
const booksTable = require("../model/book.model")

const db = require('../db')
const {eq} = require('drizzle-orm')
const autherTable = require("../model/author.model")
const { error } = require("node:console")

const router = express.Router()

router.get('/',async (req , res)=>{
    const authors = await db.select().from(authorsTable)
    return res.json(authors);


})



router.get('/:xyz',async (req , res)=>{
    const [author] = await db.select().from(authorsTable)
    .where(eq(autherTable.id , req.params.xyz))

    if(!author){
        return res.status(404).json({error: `auther with ID ${req.params.xyz} does not exist`})
    }

    return res.json(author);


})

router.post('/', async (req , res)=>{
    const {firstName ,lastName , email} = req.body;
   const [result]= await db.insert(autherTable).values({
        firstName, 
        lastName, 
        email
    }).returning({id: autherTable.id})

    return res.json({message: `Auther is created , ID:${result.id} `})


})

router.get('/:id/books' , async (req , res)=>{
    const books = await db.select().from(booksTable).where(eq(
        booksTable.authorId , req.params.id
    ))

    return res.json(books)
})

router.delete('/:id', controller.deleteBookByID)

module.exports = router;