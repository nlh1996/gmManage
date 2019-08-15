<template>
  <div class="way">
    <div class="head">
      <div class="text">渠道管理</div>
      
      <div class="search">
        <span>输入查找</span>
        <el-select v-model="selectValue" :change="filter(selectValue)" placeholder="请选择渠道" class="select">
          <el-option
            v-for="item in restaurants"
            :key="item.Id"
            :label="item.ChannelName"
            :value="item.ChannelName">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="form1">
      <el-form :inline="true" :model="form1" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="渠道ID:">
              <el-input v-model.number="form1.Id"  style="width: 220px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道名称:">
              <el-input v-model="form1.ChannelName"  style="width: 220px;"></el-input>
            </el-form-item>                        
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名:">
              <el-input v-model="form1.LinkmanName"  style="width: 220px;"></el-input>
            </el-form-item>                        
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话:">
              <el-input v-model="form1.LinkmanPhone"  style="width: 220px;"></el-input>
            </el-form-item>                        
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上线日期:">
              <el-date-picker
                v-model="form1.Data"
                align="left"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>                       
          </el-col>
          <el-col :span="12">
            <el-button @click="updateChannel"><strong>确认修改</strong></el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="form2">
      <h2>添加渠道</h2>
      <el-form :inline="false" :model="form2" label-width="100px"  label-position="left" size="small">
        <el-form-item label="渠道ID:">
          <el-input v-model.number="form2.Id"  style="width:220px"></el-input>
        </el-form-item> 
        <el-form-item label="渠道名称:">
          <el-input v-model="form2.ChannelName"  style="width: 220px;"></el-input>
        </el-form-item>   
        <el-form-item label="联系人姓名:">
          <el-input v-model="form2.LinkmanName"  style="width: 220px;"></el-input>
        </el-form-item>   
        <el-form-item label="联系人电话:">
          <el-input v-model="form2.LinkmanPhone"  style="width: 220px;"></el-input>
        </el-form-item>  
        <el-form-item label="上线日期:">
          <el-date-picker
            v-model="form2.Data"
            align="left"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item> 

        <el-form-item>
          <el-button @click="submit" size="medium">确定</el-button>
        </el-form-item>                
      </el-form>
    </div>

    <div class="form3">
      <h2>删除渠道</h2>
      <el-form :inline="false" :model="form3" label-width="100px"  label-position="left" size="small">
        <el-form-item label="渠道名称:">
          <el-input v-model="form3.ChannelName"  style="width: 220px;"></el-input>
        </el-form-item>   
        <el-form-item>
          <el-button @click="del" size="medium">确定</el-button>
        </el-form-item>                
      </el-form>
    </div>    

  </div>
</template>

<script>
import axios from '../../http';
  export default {
    data() {
      return {
        form1: {
          Id: '',
          ChannelName: '',
          LinkmanName: '',
          LinkmanPhone: '',
          Data: ''
        },
        form2: {
          Id: '',
          ChannelName: '',
          LinkmanName: '',
          LinkmanPhone: '',
          Data: ''
        },
        form3: {
          ChannelName: '',
        },
        restaurants: [],
        selectValue: '',
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
      submit() {
        axios.post('/addChannel', this.form2).then( res => {
          if(res.status == 200) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.form2.Id = ''
            this.form2.ChannelName = ''
            this.form2.LinkmanName = ''
            this.form2.LinkmanPhone = ''
            this.form2.Data = ''
            axios.get('/getChannels').then(
              res => {
                if(res.status == 200) {
                  this.restaurants = res.data.data
                }
              }
            )
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      del() {
        if(this.form3.ChannelName) {
          axios.post('/delChannel', this.form3).then( res => {
            if(res.status == 200) {
              for(let i=0;i<this.restaurants.length;i++) {
                if(this.restaurants[i].ChannelName == this.form3.ChannelName) {
                  this.restaurants.splice(i,1)
                  break
                }  
              }
              this.form3.ChannelName =''
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
            }
          })
        }
      },
      filter(v) {
        for(let i=0;i<this.restaurants.length;i++) {
          if(this.restaurants[i].ChannelName == v) {
            this.form1 = this.restaurants[i]
            return
          }
        }
      },
      updateChannel() {
        axios.post('/changeChannel', this.form1).then ( res => {
          if(res.status == 200) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.form1 = {}
          }else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },        
}
</script>

<style scoped>
.head{
  background-color: rgb(120, 144, 156);
  height: 80px;

}

.text{
  margin: 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}
.search{
  margin: 20px;
  float: right;
}
.form1{
    padding: 30px;
    background-color:rgb(38, 166, 154)
}
.form2,.form3{
    width: 40%;
    margin-left: 70px;
    float: left;
}
</style>