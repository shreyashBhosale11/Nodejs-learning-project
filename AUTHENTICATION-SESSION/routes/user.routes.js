import express from 'express'
import db from '../db/index.js'
import {usersTable , userSessions} from '../db/schema.js'
import {eq} from 'drizzle-orm'
import { error, table } from 'node:console';
import { randomBytes , createHmac } from 'node:crypto';
import jwt from "jsonwebtoken"
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.patch('/', ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id));

  return res.json({ status: 'success' });
});


router.get('/', ensureAuthenticated, async (req, res) => {
  return res.json({ user });
});// return to current logged in hear 

router.post('/signup', async (req, res )=>{
    const {name , email , password}= req.body;
    
    const [existingUser] = await db
    .select({
        email: usersTable.email
    })
    .from(usersTable)
    .where((table)=> eq(table.email , email))

    if(existingUser){
        return res.status(400)
        .json({error: "this email is allready exits "})
    }

    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256' , salt).update(password).digest('hex')

    const user = await db.insert(usersTable).values({
        name,
        email, 
        password: hashedPassword , 
        salt,

    })
    .returning({id: usersTable.id})

    


    return res.status(201).json({status: 'sucess' , data: {userID: user[0].id}})


})//sign up

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const [existingUser] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            salt: usersTable.salt,
            role: usersTable.role,
            password: usersTable.password
        })
        .from(usersTable)
        .where((table) => eq(table.email, email));

    if (!existingUser) {
        return res.status(404).json({ error: "this email does not exist" });
    }

    const salt = existingUser.salt;
    const existingHash = existingUser.password;

    const newHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (newHash !== existingHash) {
        return res.status(400).json({ error: 'incorrect password' });
    }

    // // generatee a session 
    // const [session] = await db.insert(userSessions).values({
    //     userId: existingUser.id
    // }).returning({id: userSessions.id})

    const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ status: 'success', token });
});


export default router;
