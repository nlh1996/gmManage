import Vue from 'vue'
import Router from 'vue-router'
const goodsManage = () => import('@/right_view/goods_manage/GoodsManage')
const playerManage = () => import('@/right_view/player_manage/PlayerManage')
const wayManage = () => import('@/right_view/way_manage/WayManage')
const openService = () => import('@/right_view/open_service/OpenService')
const giftManage = () => import('@/right_view/gift_manage/GiftManage')
const emailManage = () => import('@/right_view/email_manage/EmailManage')
const codeManage = () => import('@/right_view/code_manage/CodeManage')
const logs = () => import('@/right_view/logs/LogManage')
const count = () => import('@/right_view/day_count/Count')
// const dockerCreate = () => import('@/right_view/docker_create/DockerCreate')
// const dockerStatus = () => import('@/right_view/docker_status/DockerStatus')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goodsManage', 
      name: 'goodsManage', 
      component: goodsManage
    },
    {
      path: '/playerManage',
      name: 'playerManage',
      component: playerManage
    },
    {
      path: '/wayManage',
      name: 'wayManage',
      component: wayManage
    },
    {
      path: '/openService',
      name: 'openService',
      component: openService
    },
    {
      path: '/giftManage',
      name: 'giftManage',
      component: giftManage
    },
    {
      path: '/emailManage',
      name: 'emailManage',
      component: emailManage
    },      
    {
      path: '/codeManage',
      name: 'codeManage',
      component: codeManage
    }, 
    {
      path: '/logs',
      name: 'logs',
      component: logs
    },
    {
      path: '/count',
      name: 'count',
      component: count
    },
    // {
    //   path: '/dockerCreate',
    //   name: 'dockerCreate',
    //   component: dockerCreate
    // }, 
    // {
    //   path: '/dockerStatus',
    //   name: 'dockerStatus', 
    //   component: dockerStatus
    // },  
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x:0,y:0}
  }
})