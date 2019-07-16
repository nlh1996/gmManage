<template>
  <div>
    <el-row class="header">
      <el-col :span="8"><div class="text1">GM后台</div></el-col>
      <el-col :span="14"><div class="text2">用户名：{{this.obj.username}}</div></el-col>
      <el-col :span="2"><el-button type="text" class="text3" @click="exit">{{this.obj.state}}</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {obj:''},
    data() {
      return {
        // username: this.obj.username,
        // state: this.obj.state
      }
    },
    methods: {
      exit() {
        this.$emit('exit')
      }
    }
  }
</script>

<style scoped>
.header{
  width: 100%;
  height: 60px;
  background-color: #48525e;
}
.text1{
  color: white;
  font-size: 24px;
  line-height: 60px;
}
.text2{
  color: white;
  font-size: 20px;
  height: 60px;
  line-height: 80px;
}
.text3{
  font-size: 18px;
  line-height: 30px;
}
</style>