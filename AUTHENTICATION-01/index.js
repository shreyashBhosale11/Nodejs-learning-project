const express = require("express");


const app = express();
const PORT = 8000;

app.use(express.json())

const DIRY = {};
const EMAILS = new Set();


app.post('/signup', (req , res)=>{
    const {name , email ,password} = req.body
    if (EMAILS.has(email)) {
        return res.status(400).json({error: 'Email is already taken '})
    }
    // create a taken 
    const token = `${Date.now()}`;
    // do a entry in dairy
    DIRY[token] = {name , email , password}
    EMAILS.add(email);

    return res.json({status:"sucess " , token})
})


app.get('/me',(req , res)=>{
    const {token} = req.body;
    if(!token){
        return res.status(400).json({error:"MIssing token"})
    }

    if(!(token in DIRY)){
         return res.status(400).json({error:"Invalid token"})
    }

    const entry = DIRY[token];
    return res.json({data:entry});

} )


app.post('/private-data', (req , res)=>{
      const { token } = req.body;
    if(!token){
        return res.status(400).json({error:"MIssing token"})
    }

    if(!(token in DIRY)){
         return res.status(400).json({error:"Invalid token"})
    }
   

    const entry = DIRY[token];
    return res.json({data:{privateData: "Access Granted "}})
})


app.listen(PORT, ()=> console.log(`Server started on PORT ${PORT} `))