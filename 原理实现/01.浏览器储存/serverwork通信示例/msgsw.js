self.addEventListener('message',function (event) {
    var promise = self.clients.matchAll().then(function (clientList) {
        var senderID = event.source?event.source.id: 'unknow'
        clientList.forEach(function (client) {
            // 判断发送消息页面是不是当前页面
            if (client.id == senderID) {
                return 
            }else{
                client.postMessage({
                    client: senderID,
                    message: event.data
                })
            }
        })
    })
    event.waitUntil(promise);
})