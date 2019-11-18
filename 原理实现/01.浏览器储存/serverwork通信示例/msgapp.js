if (navigator.serviceWorker) {
    var sendBtn = document.getElementById('send-msg-button');
    var msgInput = document.getElementById('msg-input');
    var msgBox = document.getElementById('msg-box');

    sendBtn.addEventListener('click',function () {
        // 主页面发送信息到service worker
        if (msgInput.value) return
        navigator.serviceWorker.controller.postMessage(msgInput.value);
    })

    navigator.serviceWorker.addEventListener('message',function (event) {
        msgBox.innerHTML = msgBox.innerHTML + ('<li>' + event.data.message +'</li>')
    })

    navigator.serviceWorker.register('./msgsw.js', { scope: './' })
        .then(function (reg) {
            console.log('注册成功')
            console.log(reg);
        })
        .catch(function (e) {
            // console.log('出错了么')
            console.log(e);
        })
} else {
    alert('Service Worker is not supported');
}