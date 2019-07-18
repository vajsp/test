// let Promise = require('./原理实现/promise');

// let p1 = new Promise(function (resolve,reject) { 
//   setTimeout(() => {
//     var num = Math.random()

//     if (num > 0.5) {
//       resolve('成功')
//     }else{
//       reject('失败')
//     }
//   });
// })

// p1.then((res) => {
//   console.log(res)
// },(res) => {
//   console.log(res)
// })

// var str = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbd3978ceed6ed58&redirect_uri=http%3A%2F%2Fwxlogin.maxrocky.com%2FweixinKWSqhZblYx%2Fbasketball-children-test%2Findex.html&response_type=code&scope=snsapi_userinfo&state=MQ==&connect_redirect=1&uin=MjAzMDQ1NTQzNg%3D%3D&key=e83f21bbb1373290c3aaa181eb73291a0c8b2949504622b70e7da0256a7c71fa5ad4c31570baa3bbb30067941f443dcd&pass_ticket=4HJRbaCgbMcTbjHFiRGwoRu5WncNJTlVNh1DmYYhjgK0V/wUd9lm+hfphAgl71GreMCLBqHQcMTSs1hOyIDeLg=='

// var st = str.split('&')

// var sr = st.map((item) => {
//   if (item.includes('redirect_uri')) {
//     return item = item + '?shareId=1'
//   }else{
//     return item
//   }
// })

