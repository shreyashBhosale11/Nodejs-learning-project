const EventEmitter = require("events")

const eventEmitter = new EventEmitter()

eventEmitter.on('error' , (err)=>{
    console.error(`Error Occurred : ${err.message}`)
})

eventEmitter.emit('error' , new Error('Somthing went wrong'))