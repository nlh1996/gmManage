<template>
  <div id="app">
    <div class="head-menu">
      <head-menu></head-menu>
    </div>

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
</template>

<script>
import headMenu from '@/components/HeadMenu'
import leftMenu from '@/components/LeftMenu'
export default {
  name: 'App',
  data() {
    return {
      visiable: false
    }
  },
  components: {
      headMenu,
      leftMenu,
  }
}
</script>

<style>

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

.head-menu{
  height: 100%;
}
.main{
  padding: 0px;
  margin: 0px;
  height: 900px;

}

.left-menu{
  height: 100%;
}

.right-view{
  background-color: #E6E6E6;
  height: 100%;
}

.router-view{
  background-color:rgb(240, 237, 237);
  height: 100%;
}

</style>
