function cutDownTime(argument) {
    //定义 总时间 写时间时建议这样写
    var totalHour = 3;

    //转化为秒
    var totalSec = 3 * 60 * 60;
    //获取想要修改的所有li标签
    var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');

    //开启定时器
    //有了定时器id以后就能干掉对应的定时器
    var timeld = setInterval(function () {
        //0 判断是否 小于0
        if (totalSec <= 0) {
            //干掉定时器
            clearInterval(timeld);
            console.log('结束啦，你买不到了哦');

            return
        }

        //递减
        totalSec--;
        //当前的秒对应到多少小时多少分多少秒

        var hour = Math.floor(totalSec / 3600);
        var minute = Math.floor(totalSec % 3600 / 60);
        var sec = totalSec % 60;

        //修改DOM元素显示
        liArr[0].innerHTML = Math.floor(hour / 10); //十位 41/10 = 4.1所以要取整
        liArr[1].innerHTML = hour % 10; //个位

        //分
        liArr[3].innerHTML = Math.floor(minute / 10); //是为55/10=5.5取整
        liArr[4].innerHTML = minute % 10;

        //秒
        liArr[6].innerHTML = Math.floor(sec / 10);
        liArr[7].innerHTML = sec % 10;

    }, 1000);

};