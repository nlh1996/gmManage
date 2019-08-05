<template>
  <div>
    <el-row class="header">
      <el-col :span="8"><div class="text1">GM后台</div></el-col>
      <el-col :span="6">
        <div class="text2">用户名：{{this.obj.username}}</div>
      </el-col>
      
      <el-col :span="8">
        <div class="text4">
          <a href="http://212.129.149.224:9100" target="_blank">Kibana</a>
          <a href="http://212.129.149.224:9600" target="_blank">Portainer</a>
        </div>
      </el-col>
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

.text4{ 
  padding-top: 30px;
  font-size: 16px;
  line-height: 30px;
}
a{
  color: cadetblue;
  padding-left: 5px;
}
a:hover{
  color: lightseagreen;
}
</style>