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
            :label="item.Name"
            :value="item.Name">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="form1">
      <el-form :inline="true" :model="form1" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="渠道ID:">
              <el-input v-model="form1.Id"  style="width: 220px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道名称:">
              <el-input v-model="form1.Name"  style="width: 220px;"></el-input>
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
          <el-col :span="24">
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
        </el-row>
      </el-form>
    </div>

    <div class="form2">
      <h2>添加渠道</h2>
      <el-form :inline="false" :model="form2" label-width="100px"  label-position="left" size="small">
        <el-form-item label="渠道ID:">
          <el-input v-model.number="form2.id"  style="width:220px"></el-input>
        </el-form-item> 
        <el-form-item label="渠道名称:">
          <el-input v-model="form2.name"  style="width: 220px;"></el-input>
        </el-form-item>   
        <el-form-item label="联系人姓名:">
          <el-input v-model="form2.linkmanName"  style="width: 220px;"></el-input>
        </el-form-item>   
        <el-form-item label="联系人电话:">
          <el-input v-model="form2.linkmanPhone"  style="width: 220px;"></el-input>
        </el-form-item>  
        <el-form-item label="上线日期:">
          <el-date-picker
            v-model="form2.data"
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
  </div>
</template>

<script>
import axios from '../../http';
  export default {
    data() {
      return {
        options: [],
        pickerOptions: {
            disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        form1: {
          Id: '',
          Name: '',
          LinkmanName: '',
          LinkmanPhone: '',
          Data: ''
        },
        form2: {
          id: '',
          name: '',
          linkmanName: '',
          linkmanPhone: '',
          data: '',
        },
        options: [],
        value: [],
        list: [],
        loading: false,
        restaurants: [],
        timeout: null,
        selectValue: ''
      }
    },
    mounted() {
      axios.get('/getChannels').then(
        res => {
          if(res.status == 200) {
            this.restaurants = res.data
            console.log(res.data)
          }
        }
      )
    },
    methods: {
      submit() {
        axios.post('/addChannel', this.form2).then(
          res => {
            if(res.status == 200) {
              console.log(res.data)
            }
          }
        )
      },
      filter(v) {
        for(let i=0;i<this.restaurants.length;i++) {
          if(this.restaurants[i].Name = v) {
            this.form1 = this.restaurants[i]
            console.log( this.form1)
            return
          }
        }
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
.form2{
    width: 40%;
    margin: 100px auto;
}
</style>