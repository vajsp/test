var obj = {
    index: '1',
    type: 'chart-line',
    commonid: 'com3444445',
    style: {
        w: '954px',
        h: '506px',
        l: '200px',
        t: '0px',
        text: '跳转场景0'
    },
    data: {
        title: {
            text: '万达产业分布',
            textStyle: {
                color: '#fff',
                fontSize: '26'
            }
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: 'none'
        },
        legend: {
            data: [
                '商业地产',
                '文化集团',
                '影视集团',
                '金融集团',
                '网络科技集团'
            ],
            textStyle: {
                color: '#fff',
                fontSize: 18
            },
            selected: {
                商业地产: false,
                影视集团: false
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018'
            ],
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#fff',
                    width: '2'
                }
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 20
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#fff',
                    width: '2'
                }
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 20
                }
            }
        },
        series: [
            {
                name: '商业地产',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '文化集团',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '影视集团',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '金融集团',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '网络科技集团',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    },
    logic: {
        on: [{ event: 'event3444445' }]
    }
};


var json = JSON.stringify(obj);
console.log(json);

