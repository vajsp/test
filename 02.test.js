const fs = require('fs');
const path = require('path')

var readStream = fs.createReadStream(path.resolve( __dirname + '/img.jpg'));

// console.log(data);

readStream.on("data",(data)=>{
    console.log("数据来了！");
    console.log("已经读取的字节数",readStream.bytesRead);
})


