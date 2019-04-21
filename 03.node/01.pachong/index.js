var fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
var moment = require('moment');
var path = require('path');
var dataArr = [];


// endPage最小值为1，第一页
var endPage = 10;



(async () => {
    var promiseArr = [];

    // 设置页码
    for (let i = 6; i < endPage; i++) {
        // setTimeout(() => {
        promiseArr.push(getOneListContent(i));
        // }, i*1000);
    }

    Promise.all(promiseArr).then((res) => {
        var newArr = [];
        res.forEach((ele) => {
            newArr = newArr.concat(ele);
        })

        exportJson(newArr);
        console.log('完成');
    })
})();


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
        var reg = /\/|\\/g;

        let imgSrc = obj['attribs']['data-original'];
        let detailSrc = obj['parent']['attribs']['href'];

        var res = await axios.get(detailSrc);
        const $ = cheerio.load(res.data);

        var title = $('h1').text().replace(reg, '');
        var videoSrc = $('video').attr('src').replace('?end=120', '');
        var videoOriginName = videoSrc.match(/\w+(\.mp4)$/g);
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

    var time = moment().format('YYYY-MM-DD&&HH-mm-ss');
    var pathPlus = path.resolve(__dirname, `./data/${time}.json`);
    var content = JSON.stringify(dataArr);

    fs.writeFile(pathPlus, content, function (error) {

        if (error) {
            console.log(error);
            return false;
        }
    })
}