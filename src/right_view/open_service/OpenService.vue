<template>
  <div>
    <div class="head">
      <div class="text">开服管理</div>
    </div>
    <div class="form">
      <el-col :span="14">
      <el-form :model="form" label-position="left" label-width="100px">
        <el-form-item label="选择渠道:">
          <el-select v-model="form.ChannelName" :change="filter(form.ChannelName)" placeholder="请选择渠道" class="select">
          <el-option
            v-for="item in restaurants"
            :key="item.Id"
            :label="item.ChannelName"
            :value="item.ChannelName">
          </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务器ID:">
          <el-input v-model.number="form.ServerId" placeholder="输入"></el-input>
        </el-form-item>
        <el-form-item label="服务器名称:">
          <el-input v-model="form.ServerName" placeholder="输入"></el-input>
        </el-form-item>
        <el-form-item label="开服时间:">
          <el-date-picker
            v-model="form.Data"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          
          <el-Time-select
            v-model="form.Time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="选择时间">
          </el-Time-select>
        </el-form-item>           
 
      </el-form>
      </el-col>
      <el-col :span="10">
        <el-button style="margin-top:90px" @click="tianjia"><strong>添加服务器</strong></el-button>
      </el-col>
    </div>

    <div class="table">
      <div class="text">
        数据列表   
      </div>
      <el-table :data="serverList" border height="350" style="width: 100%">
        <el-table-column label="Id" width="80" prop="ServerId"></el-table-column>
        <el-table-column label="服务器名称" width="140" prop="ServerName"></el-table-column>
        <el-table-column label="开服时间" width="180" prop="Data"></el-table-column>
        <el-table-column label="渠道管理" width="100">      
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="medium">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        form :{
          ServerId: '',
          ServerName: '',
          Time: '',
          Data: '',
          ChannelName: '',
        },
        restaurants: [],
        serverList: [],
        serverList2: [],
        lastname: ''
      }
    },
    mounted() {
      axios.get('/getChannels').then(
        res => {
          if(res.status == 200) {
            this.restaurants = res.data.data
          }
        }
      )
    },
    methods: {
      tianjia() {
        axios.post('/addArea', this.form)
        .then( res => {
          if (res.status == 200) {       
            this.serverList = res.data.data
          }
        })
      },
      filter(v) {
        if(v != '' && v != this.lastname) {
          axios.post('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.serverList = res.data.data
              this.lastname = v
            }
          })
        }
      },
      handleClick(v) {
        axios.post('/delArea', {"ChannelName": this.form.ChannelName,"ServerName":v.ServerName})
        .then( res => {
          if (res.status == 200) {
            this.serverList = res.data.data
          }
        })
      }
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
.table{
  margin: 0 auto;
  width: 520px;
}

.select{
  margin-bottom: 30px;
}
</style>