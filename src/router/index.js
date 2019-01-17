import Vue from 'vue'
import Router from 'vue-router'
import goodsManage from '@/right_view/goods_manage/GoodsManage'
import playerManage from '@/right_view/player_manage/PlayerManage'
import wayManage from '@/right_view/way_manage/WayManage'
import openService from '@/right_view/open_service/OpenService'
import giftManage from '@/right_view/gift_manage/GiftManage'
import emailManage from '@/right_view/email_manage/EmailManage'
import codeManage from '@/right_view/code_manage/CodeManage'
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
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x:0,y:0}
  }
})