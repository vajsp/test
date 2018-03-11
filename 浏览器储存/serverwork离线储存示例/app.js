if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .then(function (reg) {
            console.log(reg);
        })
        .catch(function (e) {
            // console.log('出错了么')
            console.log(e);
        })
} else {
    alert('Service Worker is not supported');
}


