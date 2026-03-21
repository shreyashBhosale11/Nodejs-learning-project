const { log } = require("console")
const ChatRoom = require("./chatRoom.js")

const chat = new ChatRoom()

chat.on('join' , (user)=>{
    console.log(`${user} has join the chat`);
    
})

chat.on('message' , (user , message)=>{
    console.log(`${user} : ${message}`);
    
})

chat.on('leave' , (user)=>{
    console.log(`${user} has left the chat`);
    
})

//simulating the chat

chat.join("Atharv")
chat.join("shreyash")
chat.join("kunal")

chat.sendMessage('shreyash', "hey boys what are you doing")
chat.sendMessage('Atharv', "hello brother")
chat.sendMessage('kunal', "hi i want to leave now ")

chat.leave('kunal')
chat.sendMessage('shreyash', "why is he leaving")










