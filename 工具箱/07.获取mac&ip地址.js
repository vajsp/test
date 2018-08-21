var os=require("os");

var networkInterfaces = os.networkInterfaces();

var macArr = [];

for (const key in networkInterfaces) {
    if (networkInterfaces[key][0].mac !== '00:00:00:00:00:00') {
        macArr.push(networkInterfaces[key][0].mac);
    }
}
console.log(macArr);
