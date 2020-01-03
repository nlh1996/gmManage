<template>
  <section class="player">
    <el-row>
        <div class="text aa">玩家查找</div>
    </el-row>
    <hr>
      <!--表单-->
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item label="选择渠道:">
          <el-select v-model="formInline.Channel" @change="filter(formInline.Channel)" placeholder="请选择渠道" style="width: 140px;">
            <el-option
              v-for="item in channels"
              :key="item.Id"
              :label="item.ChannelName"
              :value="item.ChannelName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择区服:">
          <el-select v-model="formInline.Area"  @change="filter2(formInline.Area)" placeholder="请选择游戏区" style="width: 140px;">
            <el-option
              v-for="item in areas"
              :key="item.Id"
              :label="item.ServerName"
              :value="item.ServerName">
            </el-option>
          </el-select>
        </el-form-item>         

          <el-form-item label="玩家昵称:">
            <el-input v-model="formInline.NickName" style="width: 140px;"></el-input>     
          </el-form-item> 

          <el-form-item label="玩家id:">
            <el-input v-model="formInline.Uid"  style="width: 140px;margin-left:20px;"></el-input>     
          </el-form-item> 
        </el-form>
        
        <el-button type="success" @click="search">搜索</el-button>
      </div>

      <pre>{{jsondata}}</pre>

    <div class="clean"></div>
    <el-row>
      <el-row>
        <div class="text">玩家管理</div>
      </el-row>
      <hr>
      <el-col :span="24">
        <el-form :inline="true" :model="control" class="demo-form-inline">
          <el-row>
            <el-form-item label="当前玩家:">{{player}}
            </el-form-item>
          </el-row>
          <el-form-item label="输入禁言时间:">
            <el-input v-model.number="control.jinyan" style="width: 140px;"></el-input>
            <el-button type="warning" size="medium" @click="submit(control.jinyan,'禁言')">禁言</el-button> 
          </el-form-item>
          <el-form-item label="输入封号时间:">
            <el-input v-model.number="control.fenghao" style="width: 140px;"></el-input>
            <el-button type="warning" size="medium" @click="submit(control.fenghao,'封号')">封号</el-button> 
            <el-button type="warning" size="medium" @click="submit(control.fenghao,'正常')">正常</el-button> 
            <el-button type="warning" size="medium" @click="submit(control.xiaxian,'踢下线')">下线</el-button> 
          </el-form-item>    
        </el-form>      
      </el-col>
    </el-row>

    <el-row>
    <div class="text">
      服务列表 
      <el-select v-model="formInline.Channel" @change="filter(formInline.Channel)" placeholder="请选择渠道" style="width: 140px;">
        <el-option
          v-for="item in channels"
          :key="item.Id"
          :label="item.ChannelName"
          :value="item.ChannelName">
        </el-option>
      </el-select>
    </div>
    </el-row>
    <hr>

    <div class="table">
      <el-table :data="areas" border height="350" style="width: 100%">
        <el-table-column label="Id" width="80" prop="ServerId"></el-table-column>
        <el-table-column label="服务器名称" width="140" prop="ServerName"></el-table-column>
        <el-table-column label="服务器地址" width="180" prop="ServerIP"></el-table-column>
        <el-table-column label="GM管理地址" width="180" prop="GmIP"></el-table-column>
        <el-table-column label="服务状态" width="100" prop="ServerState"></el-table-column>
        <el-table-column label="服务标签" width="100" prop="ServerTag"></el-table-column>
        <el-table-column label="服务管理" width="100">      
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="xiaXian(scope.row)">全部下线</el-button> 
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-select v-model="tip" placeholder="请选择tip" style="width: 180px;">
      <el-option
        v-for="item in tips"
        :key="item.tipId"
        :label="item.customStr"
        :value="item.customStr">
      </el-option>
    </el-select>
    <el-input v-model="msg" style="width: 140px;"></el-input>
    <el-button type="warning" size="medium" @click="sendTip">发送</el-button> 
  </section>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        formInline: {
          Channel: '',
          Area: '',
          NickName: '',
          Uid: ''
        },
        control: {
          xiaxian: 0,
          fenghao: 0,
          jinyan: 0
        },
        tableData_log: [],
        channels: [],
        areas: [],
        lastname: '',
        url: '',
        jsondata: '',
        player: '',
        uid: '0',
        tips:[
          {tipId: 30000, customStr: '自定义tip'},
          {tipId: 30001, customStr: '自定义跑马灯'},
          {tipId: 30002, customStr: '自定义系统消息'},
          {tipId: 30003, customStr: '关服'},
        ],
        tip: '',
        msg: ''
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
      filter(v) {
        if(v != '') {
          this.formInline.Area = ''
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res != undefined &&res.status == 200) {
              this.areas = res.data.data
              this.lastname = v
            }
          })
        }
      },

      filter2(v) {
        if(v == '') {
          return
        } 
        for (let i of this.areas) {
          if (i.ServerName == v) {
            this.url = 'http://' + i.GmIP
          }
        }
      },

      search() {
        if(this.url == '') {
          return
        }
        axios.post(this.url + '/findPlayer',this.formInline).then(
          res => {
            if(res.status==200) {
              this.jsondata = res.data.data
              this.player = this.formInline.NickName
              this.uid = res.data.data.base.uid
            }else{
              this.$message({
                message: '查找失败！',
                type: 'warning'
              })
            }
          }
        )
      },

      submit(time,v) {
        if(this.player) {
          axios.post(this.url +'/managePlayer',{NickName: this.player, StateStr: v, SurplusHour: time, Uid: this.uid}).then(
            res => {
              if(res.status == 200) {
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                })
              }else{
                this.$message({
                  message: '操作失败！',
                  type: 'warning'
                })
              }
            }
          )
        }else{
          this.$message({
            message: '无效的操作对象！',
            type: 'warning'
          })
        }
      },
      xiaXian(data) {
        let url = ''
        if(data.ChannelName == "本地测试") {
          url = 'http://' + i.GmIP
        }else{
          url = 'https://' + i.GmIP
        }
        axios.post(url + '/kickOutAll').then(
          res => {
            if(res.status==200) {
              this.$message({
                message: '下线成功！',
                type: 'success'
              })
            }else{
              this.$message({
                message: '操作失败！',
                type: 'warning'
              })
            }
          }
        )
      },
      sendTip() {
        let data = ''
        for(let item of this.tips) {
          if(item.customStr == this.tip) {
            data = item
          }
        }
        if(data == '' && this.url == '') {
          return
        }
        if(this.msg != '') {
          data.customStr = this.msg
        }
        axios.post(this.url +'/tip', data).then(
          res => {
            if(res.status == 200) {
              this.$message({
                message: '发送成功！',
                type: 'success'
              })
            }else{
              this.$message({
                message: '发送失败！',
                type: 'warning'
              })
            }
          }
        )
      }
    }
  }
  
</script>

<style scoped>
.form{
  width: 600px;
  float: left;
}

.player{
  padding: 30px;
}

.table{
  margin: 0 auto;
  width: 900px;
}

pre{
  font-size: 14px;
  color: goldenrod;
  text-align: left;
  background-color: #fff;
  width: 320px;
  max-height: 330px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.clean{
  clear: both;
}
.text{
  margin-left: 110px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}

.table1{
  margin: 10px auto;
  width: 615px;
}

.table2{
  margin: 10px auto;
  width: 80%;
}

hr{
  width: 95%;
  margin: 20px auto;border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

</style >