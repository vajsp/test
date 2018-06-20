var str = '{"data":{"points":[[{ "name": "上海", "value": [121.4648, 31.2891, 395] }], [{ "name": "北京", "value": [116.4551, 40.2539, 395] }], [{ "name": "纽约", "value": [-110.4651, 30.3373, 395] }], [{ "name": "拉萨", "value": [91.1865, 30.1465, 50] }], [{ "name": "重庆", "value": [107.7539, 30.1904, 120] }], [{ "name": "广州", "value": [113.5107, 23.2196, 210] }]], "flyLines": [["上海", "北京"], ["上海", "纽约"]] }, "type": "global", "index": "2", "logic": { "on": [{ "event": "datachange" }] }, "style": { "h": "800px", "l": "200px", "t": "50px", "w": "800px", "back": "none", "text": "跳转场景0", "z_index": "2" }, "commonid": "com0123" }'



var obj = JSON.parse(str);

console.log(obj);