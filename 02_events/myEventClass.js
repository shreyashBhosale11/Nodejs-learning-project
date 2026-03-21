const EventEmitter = require("events")

class Chat extends EventEmitter{
    sendMessage(msg){
        console.log(`message sent : ${msg} `);
        this.emit('messageRecieved', msg)
        
    }
}

const chat = new Chat();

chat.on("messageRecieved" ,(msg)=>{
    console.log(`new message : ${msg}`);
    
});

// trigger event 

chat.sendMessage('hello shreyash ')