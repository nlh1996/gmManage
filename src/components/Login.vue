<template>
  <div class="view">  
    <div class="login">
      <h1>Login</h1>
      <form>
        <input type="text" required="required" placeholder="用户名" v-model="name"/> 
        <input type="password" required="required" placeholder="密码" v-model="pwd"/>
        <button class="but" type="submit" @click="login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        pwd: ''
      }
    },
    methods: {
      login() {
        if(this.name == 'admin' && this.pwd == 'admin') {
          this.$emit('login')
        }
      },
    },
  }
</script>

<style scoped>
.view{
  width: 100%;
  height: 100vh;
  font-family: 'Open Sans',sans-serif;
  margin: 0;
  background-color: rgb(172, 169, 172);
}
.login{
  position: absolute;
  top: 50%;
  left:50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
.login h1{
    color: #fff;
    text-shadow:0 0 10px;
    letter-spacing: 1px;
    text-align: center;
}
h1{
    font-size: 2em;
    margin: 0.67em 0;
}
input{
  width: 278px;
  height: 18px;
  margin-bottom: 10px;
  outline: none;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  text-shadow:1px 1px 1px;
  border-top: 1px solid #312E3D;
  border-left: 1px solid #312E3D;
  border-right: 1px solid #312E3D;
  border-bottom: 1px solid #56536A;
  border-radius: 4px;
  background-color: #2D2D3F;
}
.but{
  width: 300px;
  min-height: 20px;
  display: block;
  background-color: #4a77d4;
  border: 1px solid #3762bc;
  color: #fff;
  padding: 9px 14px;
  font-size: 15px;
  line-height: normal;
  border-radius: 5px;
  margin: 0;
  cursor: pointer;
}
</style>