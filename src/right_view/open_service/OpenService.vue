<template>
  <div>
    <div class="head">
      <div class="text">开服管理</div>
    </div>
    <div class="form">
      <el-col :span="12">
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
        <el-form-item label="服务器地址:">
          <el-input v-model="form.ServerIP" placeholder="输入"></el-input>
        </el-form-item>         
        <el-form-item label="GM地址:">
          <el-input v-model="form.GmIP" placeholder="输入"></el-input>
        </el-form-item>         
      </el-form>
      </el-col>
      <el-col :span="2">
        &nbsp
      </el-col>
      <el-col :span="10">
        <el-form :model="form" label-position="left" label-width="100px">
          <el-form-item label="开服时间:">
            <el-date-picker
              v-model="form.Date"
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

          <el-form-item label="开区状态:">
            <el-select v-model="form.ServerState" placeholder="请选择状态" class="select">
              <el-option
                v-for="item in states"
                :key="item.id"
                :label="item.state"
                :value="item.state">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="区服标签:">
            <el-select v-model="form.ServerTag" placeholder="请选择标签" class="select">
              <el-option
                v-for="item in tags"
                :key="item.id"
                :label="item.tag"
                :value="item.tag">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button @click="addServer"><strong>添加服务器</strong></el-button>
          <el-button @click="updateServer"><strong>修改设置</strong></el-button>
        </el-form>
      </el-col>
    </div>

    <div class="table">
      <div class="text">
        数据列表   
      </div>
      <el-table :data="serverList" border height="350" style="width: 100%">
        <el-table-column label="Id" width="80" prop="ServerId"></el-table-column>
        <el-table-column label="服务器名称" width="140" prop="ServerName"></el-table-column>
        <el-table-column label="服务器地址" width="180" prop="ServerIP"></el-table-column>
        <el-table-column label="服务状态" width="100" prop="ServerState"></el-table-column>
        <el-table-column label="服务标签" width="100" prop="ServerTag"></el-table-column>
        <el-table-column label="渠道管理" width="100">      
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" type="text" size="medium">修改</el-button>
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
        form: {
          ChannelName: '',
          ServerId: '',
          ServerName: '',
          ServerIP: '',
          ServerState: '',
          ServerTag: '',
          Time: '',
          Date: '',
          GmIP: ''
        },
        restaurants: [],
        states: [{id: 1, state: '维护'},{id: 2, state: '良好'},{id: 3, state: '拥挤'}],
        tags: [{id: 1, tag: '最新'},{id: 2, tag: '热门'}],
        serverList: [],
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
      addServer() {
        axios.post('/addArea', this.form)
        .then( res => {
          if (res.status == 200) {       
            this.serverList = res.data.data
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
          }
        })
      },
      filter(v) {
        if(v != '' && v != this.lastname) {
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.serverList = res.data.data
              this.lastname = v
            }
          })
        }
      },
      handleClick(v) {
        axios.post('/delArea', {"ChannelName": this.form.ChannelName,"ServerName": v.ServerName})
        .then( res => {
          if (res.status == 200) {
            this.serverList = res.data.data
          }
        })
      },
      updateServer() {
        axios.post('/changeArea', this.form)
        .then( res => {
          if (res.status == 200) {       
            this.form = {}
            this.serverList = res.data.data
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
          }
        })
      },
      handleUpdate(data) {
        let tmp = JSON.stringify(data)
        this.form = JSON.parse(tmp)
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
  height: 300px;
}

.text{
  margin: 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}

.table{
  margin: 0 auto;
  width: 720px;
}

.select{
  margin-bottom: 20px;
}
</style>