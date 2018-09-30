import Vue from 'vue'
import Router from 'vue-router'
import goodsManage from '@/right_view/goods_manage/GoodsManage'
import playerManage from '@/right_view/player_manage/PlayerManage'
import wayManage from '@/right_view/way_manage/WayManage'
import openService from '@/right_view/open_service/OpenService'
Vue.use(Router)

export default new Router({
  mode: 'history',
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
    }
 
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x:0,y:0}
  }
})