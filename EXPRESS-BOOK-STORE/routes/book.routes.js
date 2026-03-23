const express = require("express")
const controller = require("../controllers/book.controller")

const router = express.Router()

router.get('/',controller.getAllbooks)



router.get('/:xyz', controller.getBookByID)

router.post('/', controller.createtBook)

router.delete('/:id', controller.deleteBookByID)

module.exports = router;