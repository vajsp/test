var fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

var dataArr = [];



(async () => {
    var res = await axios.get(`https://xiaoluoli99.xyz`);
    const $ = cheerio.load(res.data);
    var pageNum = $('.page-number-js').attr('data-max');
    var promiseArr = []; 

    for (let i = 0; i < 20; i++) {
        promiseArr.push(getOneListContent(i));
    }

    Promise.all(promiseArr).then((res) => {
        var newArr = [];
        res.forEach((ele) => {
            newArr = newArr.concat(ele);
        })

        exportJson(newArr);
        console.log('完成');
    })
})()


async function getOneListContent(pageNum) {

    var res = await axios.get(`https://xiaoluoli99.xyz/page/${pageNum}`);
    const $ = cheerio.load(res.data);
    var listArr = [];
    var promiseArr = [];

    var list = $('.i_list a img');

    for (const key in list) {
        if (/\d/.test(key)) {
            promiseArr.push(getOneDetail(list[key]));
        }
    }

    return new Promise((reslove) => {
        Promise.all(promiseArr).then(() => {
            reslove(listArr)
        })
    })

    async function getOneDetail(obj) {
        let imgSrc = obj['attribs']['data-original'];
        let detailSrc = obj['parent']['attribs']['href'];

        var res = await axios.get(detailSrc);
        const $ = cheerio.load(res.data);

        var title = $('h1').text();
        var videoSrc = $('video').attr('src');
        var videoOriginName = videoSrc.match(/\d+(\.\w+)$/g)[0];
        var dateOrigin = $('.single-cat').text();
        var date = dateOrigin.match(/\d+-\d+-\d+/g)[0];

        var moveInfo = {
            title,
            videoSrc,
            imgSrc,
            videoOriginName,
            date
        }

        listArr.push(moveInfo);
    }
}



function exportJson(dataArr) {
    fs.readFile(__dirname + "/data.json", 'utf8', function (err, data) {
        if (err) console.log(err);
        var t = JSON.stringify(dataArr);
        fs.writeFileSync(__dirname + '/data.json', t)
    });
}
