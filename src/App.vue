<template>
  <div id="app">
    <div class="head-menu">
      <head-menu v-bind:obj="msg" v-on:exit="exit"></head-menu>
    </div>

    <div v-if="isLogin">
      <el-row class="main">
        <el-col :span="4" class="left-menu">
          <left-menu></left-menu>
        </el-col>

        <el-col :span="20" class="right-view">
          <div class="router-view">
            <transition>
              <router-view></router-view>
            </transition>
          </div>
        </el-col>
      </el-row> 
    </div>

    <div v-else>
      <login v-on:loginSucess="login"></login>
    </div>
  </div>
</template>

<script>
import headMenu from '@/components/HeadMenu'
import leftMenu from '@/components/LeftMenu'
import login  from '@/components/Login'
export default {
  name: 'App',
  data() {
    return {
      isLogin: eval(localStorage.getItem('tag')),
      msg: {
        username: '',
        state: '未登录'
      }
    }
  },
  components: {
    headMenu,
    leftMenu,
    login
  },

  beforeMount() {
    this.msg.state = localStorage.getItem('state')
    this.msg.username = localStorage.getItem('name')
  },
  updated() {
    this.isLogin = eval(localStorage.getItem('tag'))
    this.msg.state = localStorage.getItem('state')
    this.msg.username = localStorage.getItem('name')
  },
  methods: {
    login() {
      this.isLogin = true
      localStorage.setItem('tag', this.isLogin)
      localStorage.setItem('state', '退出登录')
      localStorage.setItem('name', 'admin')
    },
    exit() {
      this.isLogin = false
      localStorage.setItem('tag', this.isLogin)
      localStorage.setItem('state', '未登录')
      localStorage.setItem('name', '')
    }
  },
}
</script>

<style>
@import "./assets/index.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0 auto;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
</style>
