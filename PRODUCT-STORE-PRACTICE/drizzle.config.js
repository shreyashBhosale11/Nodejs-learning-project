const dotenv = require("dotenv")
const { defineConfig }= require('drizzle-kit');

dotenv.config();
const config = defineConfig({
    dialect: 'postgresql',
    schema: "./model/product.model.js",
    dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})

module.exports = config;