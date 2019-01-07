const { exec } = require('child_process');
var data = require('./data/2019-01-04&&22-30-51.json');

var context = '';

data.forEach(ele => {
    context += ele.videoSrc + '\n'
});

exec('clip').stdin.end(context);


// 重置剪切板
setTimeout(() => {
    exec('clip').stdin.end('reset ctrl c');
}, 3000);

