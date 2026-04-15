import express from 'express'
import userRoutes from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

import {authenticationMiddleware } from './middlewares/auth.middleware.js'

const app = express()
const PORT = process.env.PORT ?? 8000;

app.use(express.json())
app.use(authenticationMiddleware)


app.get('/',(req,res)=>{
    return res.json({status:"okay  serveer is up and runnning"})
})

app.use('/user' , userRoutes);
app.use('/admin', adminRouter);

app.listen(PORT, ()=>console.log(`server is running on PORT: ${PORT}`))