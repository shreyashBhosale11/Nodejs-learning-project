const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (username)=>{
    console.log(`hello ${username} event in node js`);
    
})

eventEmitter.on("greet", (username)=>{
    console.log(`whats happening ${username} `);
    
})

eventEmitter.once("pushnotify" , ()=>{
    console.log("this will run only once");
    
})



//emit the event

eventEmitter.emit("greet" , "shreyash")
// eventEmitter.emit("greet" , "Atharv")
// eventEmitter.emit("pushnotify" )
// eventEmitter.emit("pushnotify" )
// eventEmitter.emit("greet" , "shreya")

const myListener =() => console.log("I am a test listener");
eventEmitter.on("test" , myListener);
// eventEmitter.emit("test")
// eventEmitter.emit("test")
// eventEmitter.removeListener("test", myListener)
// eventEmitter.emit("test")
// eventEmitter.emit("test")

console.log(eventEmitter.listeners("greet"));





