require('dotenv').config();

const db = require('./db');   // ✅ IMPORTANT
// console.log("DB VALUE:", db);
const {userTable} = require("./drizzle/schema.js")

// dotenv.config();
async function getAllUser() {
    const users = await db.select().from(userTable);
    console.log(users);
    return users;
}


async function createUser({id , name , email}) {
    await db.insert(userTable).values({
        id,
        name,
        email,
    })

    
}





getAllUser();