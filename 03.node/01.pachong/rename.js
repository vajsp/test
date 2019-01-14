var fs = require('fs');
var path = require('path'); //解析需要遍历的文件夹
var tools = require('./tools');

var filePath = path.resolve(__dirname + '/data');

var moviePath = 'F:\迅雷下载';


(async () => {
    var nameArr = await getFileName(filePath);
    // console.log(nameArr);

    fs.readdir(moviePath, function (err, files) {

        // files是名称数组
        files.forEach(function (filename) {

            var newName = filename;

            nameArr.forEach((ele) => {
                if (ele.videoOriginName[0] === filename) {

                    newName = tools.formatDate(ele.date) + '&' + ele.title + '.mp4';

                };
            })

            var oldPath = moviePath + '/' + filename;
            var newPath = moviePath + '/' + newName;

            fs.rename(oldPath, newPath, function(err) {
                if (err) {
                    console.log(err);
                } 
            })
        })
    })

})();






// 将data中所有文件数据合并成一个数组输出并去重
function getFileName(filePath) {
    var proArr = [];
    var nameArr = [];

    return new Promise((resolve, reject) => {

        fs.readdir(filePath, function (err, files) {
            if (err) {
                console.log(err);
            } else {
                files.forEach((filename) => {
                    // console.log(filename);
                    var filedir = path.join(filePath, filename);
                    var myPromise = new Promise((resolve, reject) => {
                        fs.stat(filedir, function (eror, stats) {
                            if (eror) {
                                console.warn('获取文件stats失败');
                            } else {
                                var isFile = stats.isFile(); //是文件
                                var isDir = stats.isDirectory(); //是文件夹
                                if (isFile) {
                                    // 读取文件内容
                                    var content = fs.readFileSync(filedir, 'utf-8');
                                    content = JSON.parse(content);
                                    resolve(content)
                                }
                                if (isDir) {
                                    fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                                }
                            }
                        })
                    })
                    proArr.push(myPromise);
                })

                Promise.all(proArr).then((res) => {
                    res.forEach((arr) => {
                        nameArr = nameArr.concat(arr);
                    })

                    var arr = tools.uniq(nameArr);

                    resolve(arr);
                })
            }
        })
    })

}