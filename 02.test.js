var arr = [{ "total": 1, "PROVICE": "四川省" }, { "total": 5, "PROVICE": "天津市" }, { "total": 1, "PROVICE": "安徽省" }, { "total": 1, "PROVICE": "山东省" }, { "total": 21, "PROVICE": "广东省" }, { "total": 5, "PROVICE": "江苏省" }, { "total": 13, "PROVICE": "河北省" }, { "total": 3, "PROVICE": "河南省" }, { "total": 4, "PROVICE": "浙江省" }, { "total": 1, "PROVICE": "湖北省" }, { "total": 1, "PROVICE": "湖南省" }, { "total": 4, "PROVICE": "贵州省" }, { "total": 1, "PROVICE": "陕西省" }]

var newArr = [];

var pointLocationArray = [
    { name: '北京', x: 980, y: 312 },
    { name: '天津', x: 1011, y: 343 },
    { name: '上海', x: 1105, y: 575 },
    { name: '重庆', x: 768, y: 614 },
    { name: '香港', x: 1006, y: 880 },
    { name: '澳门', x: 940, y: 911 },
    { name: '黑龙江', x: 1268, y: 171 },
    { name: '吉林', x: 1192, y: 222 },
    { name: '辽宁', x: 1138, y: 292 },
    { name: '河北', x: 946, y: 387 },
    { name: '山西', x: 881, y: 442 },
    { name: '山东', x: 1062, y: 422 },
    { name: '河南', x: 933, y: 499 },
    { name: '安徽', x: 1003, y: 565 },
    { name: '江苏', x: 1050, y: 514 },
    { name: '浙江', x: 1072, y: 654 },
    { name: '湖北', x: 877, y: 587 },
    { name: '湖南', x: 868, y: 682 },
    { name: '福建', x: 1034, y: 737 },
    { name: '广东', x: 921, y: 790 },
    { name: '贵州', x: 774, y: 696 },
    { name: '云南', x: 658, y: 775 },
    { name: '四川', x: 665, y: 584 },
    { name: '甘肃', x: 706, y: 457 },
    { name: '青海', x: 592, y: 420 },
    { name: '江西', x: 957, y: 694 },
    { name: '海南', x: 854, y: 890 },
    { name: '陕西', x: 814, y: 499 },
    { name: '台湾', x: 1093, y: 792 },
    { name: '新疆', x: 340, y: 224 },
    { name: '广西', x: 808, y: 798 },
    { name: '內蒙古', x: 885, y: 278 },
    { name: '宁夏', x: 762, y: 390 },
    { name: '西藏', x: 420, y: 610 },
]

pointLocationArray.forEach((ele) => {
    newArr.push({
        PROVICE: ele.name,
        total: 3
    });
})

console.log(JSON.stringify(newArr));


