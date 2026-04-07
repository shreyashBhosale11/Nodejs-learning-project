const { integer, pgTable, varchar , uuid} = require("drizzle-orm/pg-core")


const productTable = pgTable('products', {
    id:uuid().primaryKey().defaultRandom(),
    productName: varchar({length: 55}).notNull(),
    price: integer().notNull(),

})

module.exports = autherTable;