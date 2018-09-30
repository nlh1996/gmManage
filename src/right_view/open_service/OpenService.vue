<template>
    <div>
        <div class="head">
            <div class="text">开服管理</div>
        </div>
        <div class="form">
            <el-col :span="14">
            <el-form :model="form" label-position="left" label-width="100px">
              <el-form-item label="服务器ID:">
                  <el-input v-model="form.id" placeholder="输入"></el-input>
              </el-form-item>
              <el-form-item label="服务器名称:">
                  <el-input v-model="form.name" placeholder="输入"></el-input>
              </el-form-item>
              <el-form-item label="开服时间:">
                <el-date-picker
                    style="width:180px"
                    v-model="form.data"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                
                <el-time-select
                    style="width:180px;margin-left:65px"
                    v-model="form.time"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                    }"
                placeholder="选择时间">
                </el-time-select>
              </el-form-item>           
              <el-form-item label="渠道管理:">
                  <el-input v-model="form.way" placeholder="输入"></el-input>
              </el-form-item>   
            </el-form>
            </el-col>
            <el-col :span="10">
                <el-button style="margin-top:90px">添加服务器</el-button>
            </el-col>
        </div>

        <div class="table">
            <div class="text">数据列表</div>
            <el-table :data="tableData" border height="250" style="width: 100%">
              <el-table-column label="id" width="80"></el-table-column>
              <el-table-column label="服务器名称" width="140" prop="name"></el-table-column>
              <el-table-column label="开服时间" width="180" prop="time"></el-table-column>
              <el-table-column label="渠道管理" width="100" prop="way"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form :{
                    id: '',
                    name: '',
                    time: '',
                    way: '',
                    data: '',
                    time: ''
                },
                tableData: [

                ],

            }
        },
    }
</script>

<style scoped>
.head{
    background-color: rgb(120, 144, 156);
    height: 80px;
}
.form{
    margin: 0;
    padding: 80px;
    background-color: rgb(38, 166, 154);
    height: 260px;
}
.text{
    margin: 20px;
    float: left;
    font-size: 24px;
    font-weight: bold;
}
    
</style>