const {Buffer} = require("buffer");

// const buf = Buffer.alloc(4);
// console.log(buf)


// const buf = Buffer.from('Hello Chai')
// console.log(buf);
// console.log(buf.toString());


// const bufTwo = Buffer.allocUnsafe(10);
// console.log(bufTwo);


// const bufe = Buffer.alloc(10)
// bufe.write("Hello")
// console.log(bufe.toString());


// const buf = Buffer.from('Chai aur Code')
// console.log(buf.toString());
// console.log(buf.toString("utf-8" , 0 , 4));


// const buf = Buffer.from('Chai')
// buf[0] = 0x4A
// console.log(buf);
// console.log(buf.toString());


const buf1 = Buffer.from("Chai aur")
const buf2 = Buffer.from(" code")
const merged = Buffer.concat([buf1 , buf2])
console.log(merged.toString());
