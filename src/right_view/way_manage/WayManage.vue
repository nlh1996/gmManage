<template>
    <div class="way">
        <div class="head">
            <div class="text">渠道管理</div>
            
            <div class="search">
                <span>输入查找</span>
                <el-autocomplete
                    v-model="form1.name"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect">
                </el-autocomplete>
            </div>
        </div>
        <div class="form1">
            <el-form :inline="true" :model="form1" label-width="100px" label-position="left">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="渠道ID:">
                            <el-input v-model="form1.id"  style="width: 220px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="渠道名称:">
                            <el-input v-model="form1.name"  style="width: 220px;"></el-input>
                        </el-form-item>                        
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系人姓名:">
                            <el-input v-model="form1.linkmanName"  style="width: 220px;"></el-input>
                        </el-form-item>                        
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话:">
                            <el-input v-model="form1.linkmanPhone"  style="width: 220px;"></el-input>
                        </el-form-item>                        
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="上线日期:">
                            <el-date-picker
                                v-model="form1.data"
                                align="left"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
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
                    <el-input v-model="form2.id"  style="width:220px"></el-input>
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
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item> 
                <el-form-item>
                    <el-button @click="submitForm('form2')" size="medium">确定</el-button>
                </el-form-item>                
            </el-form>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
        pickerOptions: {
            disabledDate(time) {
            return time.getTime() > Date.now();
          },
        shortcuts: [{
            text: '今天',
            onClick(picker) {
                picker.$emit('pick', new Date());
            }
        }, {
            text: '昨天',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
            }
        }, {
            text: '一周前',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
            }
        }],
        },
        form1: {
            id: '',
            name: '',
            linkmanName: '',
            linkmanPhone: '',
            data: ''
        },
        form2: {
            id: '',
            name: '',
            linkmanName: '',
            linkmanPhone: '',
            data: ''
        },
        options: [],
        value: [],
        list: [],
        loading: false,
        restaurants: [],
        timeout: null
      }
    },
    mounted() {
        this.restaurants = this.loadAll()
    },
    methods: {
        loadAll() {
            return [
                {"id":"1","value":"小明"},
                {"id":"2","value":"小张"},
                {"id":"3","value":"大三"}
            ]
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 1000);
        },
        createStateFilter(queryString) {
            return (form1) => {
                return (form1.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            this.form1.id = item.id
            //console.log(item);
        }
        },        
        submitForm(formName) {
            console.log("添加成功")
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