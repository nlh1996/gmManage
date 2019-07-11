<template>
  <div>
    <div class="head">
      <div class="text">容器创建</div>
    </div>
    <div class="form">
      <el-form label-position="left" label-width="100px">
        <el-col :span="12">
          <el-form-item label="选择服务器:">
            <el-select v-model="form.Channel" placeholder="请选择服务器" class="select">
              <el-option
                v-for="(item,index) in serverList"
                :key="index"
                :label="item.ChannelName"
                :value="item.ChannelName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="选择镜像:">
            <el-select v-model="config.Image" placeholder="请选择镜像" class="select">
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
            <el-input v-model="form.Area" style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 

        <el-col :span="12">
          <el-form-item label="容器名称:">
            <el-input v-model="form.Name" style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 

        <el-col :span="12">
          <el-form-item label="端口1填写:">
            <el-input v-model="form.Port1" style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 
        
        <el-col :span="12">
          <el-form-item label="端口2填写:">
            <el-input v-model="form.Port2" style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 
      </el-form>

      <el-col :span="24">
        <el-button style="margin-top:30px;" @click="create"><strong>确定创建</strong></el-button>
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
          Channel: '',
          Area: '',
          Port1: '',
          Port2: '',
        },        
        images: [],
        serverList: [],
        config: {
          Domainname: '123',
          Image: '',
          ExposedPorts: {
            "10000/tcp": {},
            "10001/tcp": {},
          },
          HostConfig: {
            "Binds": [
              "/data/bs/mir:/data",
              "/data/bs/mir/json/private/server_1.json:/data/json/private/server.json"
            ],
            PortBindings: {
              "10000/tcp": [{HostPort: ''}],
              "10001/tcp": [{HostPort: ''}],
            }
          },
        }
      }
    },

    mounted() {
      axios.dockerApi.get('/images/json').then( res => {
        for(let i=0;i<res.data.length;i++) {
          let index = res.data[i].RepoTags[0].indexOf(':')
          this.images.push({name: res.data[i].RepoTags[0].substring(0,index)})
        }
      }) 
    },

    methods: {
      create() {
        this.config.HostConfig.PortBindings["10000/tcp"][0].HostPort = this.form.Port1
        this.config.HostConfig.PortBindings["10001/tcp"][0].HostPort = this.form.Port2
        axios.dockerApi.post('/containers/create?name='+this.form.Name,JSON.stringify(this.config))
        .then( 
          res => {
            if(res.status==201) {
              this.$message({
                message: '容器创建成功！',
                type: 'success'
              })
            }
          }
        )
        .catch(err => {this.$message.error('创建失败！')}) 
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