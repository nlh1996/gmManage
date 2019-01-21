<template>
  <div>
    <div class="head">
      <div class="text">兑换码管理</div>
    </div>
    <div class="form">

      <el-form :model="form" label-position="left" label-width="100px">
        <el-col :span="12">
        <el-form-item label="选择服务器:">
          <el-select v-model="form.Channel" :change="filter1(form.Server)" placeholder="请选择服务器" class="select">
            <el-option
              v-for="item in serverList"
              :key="item.Id"
              :label="item.ChannelName"
              :value="item.ChannelName">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>

        <el-col :span="12">
        <el-form-item label="选择镜像:">
          <el-select v-model="form.Image" :change="filter2(form.Image)" placeholder="请选择镜像" class="select">
            <el-option
              v-for="item in images"
              :key="item.Id"
              :label="item.ServerName"
              :value="item.ServerName">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="区服名称:">
            <el-input v-model.number="form.Area"  style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 

        <el-col :span="12">
          <el-form-item label="容器名称:">
            <el-input v-model.number="form.Name"  style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 
      </el-form>

      <el-col :span="24">
        <el-button style="margin-top:30px;" @click="tianjia"><strong>确定创建</strong></el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
import axios from '../../http'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
  export default {
    data() {
      return {
        form: {
          Name: '',
          Area: '',
          Server: '',
          Image: ''
        },
        images: [],
        serverList: []
      }
    },
    mounted() {
      axios.get('/getChannels').then(
        res => {
          if(res.status == 200) {
            this.channels = res.data.data
          }
        }
      )
    },
    methods: {
      tianjia() {
        axios.post('/addRedeemCodes', this.form)
        .then( res => {
          if (res.status == 200) {       
            this.tablelist = res.data.data
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
          }
        })
      },
      filter1(v) {
        if(v != '' && v != this.lastChannel) {
          this.form.Area = ''
          axios.post('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.areas = res.data.data
              this.lastChannel = v
            }
          })
        }
      },
      filter2(v) {
        if(v != '' && v != this.lastArea) {
          axios.get('/getGiftPack').then( res=> {
            this.gifts = res.data.data
            this.lastArea = v
          }) 
        }
      },
    }
  }
</script>

<style scoped>
.head{
  background-color: rgb(120, 144, 156);
  height: 80px;
}
.form{
  margin: 0;
  padding: 40px;
  background-color: rgb(38, 166, 154);
  height: 260px;
}
.text{
  margin: 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}
.select{
  margin-bottom: 0px;
}
</style>