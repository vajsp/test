import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shehuiwang from '@/components/shehuiwang'
import Shehuiwang1 from '@/components/shehuiwang.1'
import Shehuiwang2 from '@/components/shehuiwang.2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/shehuiwang',
      
      component: Shehuiwang,
      children:[
        { path: "/", name: 'shehuiwang', component: Shehuiwang},
        { path: "shehuiwang1", name: 'shehuiwang1',component:Shehuiwang1},
        { path: "shehuiwang2", name: 'shehuiwang2',component:Shehuiwang2},
      ]
    }
  ]
})
