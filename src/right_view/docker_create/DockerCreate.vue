<template>
  <div>
    <div class="head">
      <div class="text">容器创建</div>
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
          <el-select v-model="form.Image" placeholder="请选择镜像" class="select">
            <el-option
              v-for="(item,index) in images"
              :key="index"
              :label="item.name"
              :value="item.name">
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
        serverList: [],
        config: {
          Hostname: 'abc',
          Domainname: "hehe",
          Image: "nginx",
          ExposedPorts: {
            "80/tcp": {}
          },
          HostConfig: {
            PortBindings: {
              "80/tcp": [{HostPort: "12100"}]
            }
          },
        }
      }
    },
    mounted() {
      axios.dockerApi.get('/images/json').then( res => {
        for(let i=0;i<res.data.length;i++) {
          this.images.push({name: res.data[i].RepoTags[0]})
        }
      })   
    },

    methods: {
      tianjia() {
        axios.dockerApi.post('/containers/create',JSON.stringify(this.config)).then( 
          res => {
            if(res.status==201) {
              this.$message({
                message: '容器创建成功！',
                type: 'success'
              })
            }
            console.log(res.data)
          }
        ) 
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