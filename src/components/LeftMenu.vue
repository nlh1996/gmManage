<template>
    <div class="left-menu">
        <el-menu
        router
        default-active="/playerManage"
        class="el-menu-vertical-demo"
        active-text-color="#409eff">
        <el-menu-item index="/playerManage">
            <span slot="title">玩家管理</span>
        </el-menu-item>
        <el-menu-item index="/goodsManage">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">物品管理</span>
        </el-menu-item>
        <el-menu-item index="/wayManage">
            <!-- <i class="el-icon-menu"></i> -->
            <span slot="title">渠道管理</span>
        </el-menu-item>
        <el-menu-item index="/openService">
            <!-- <i class="el-icon-document"></i> -->
            <span slot="title">开服管理</span>
        </el-menu-item>
        <el-menu-item index="/giftManage">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">礼包管理</span>
        </el-menu-item>
        <el-menu-item index="/emailManage">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">邮件管理</span>
        </el-menu-item>
        <el-menu-item index="6">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">激活码管理</span>
        </el-menu-item>
        </el-menu>
        <!-- <div>
            <vue-star animate="animated bounceIn" color="#F05654">
                <i class="el-icon-setting" slot="icon"></i>
            </vue-star>
        </div> -->
    </div>
</template>

<script>
import VueStar from 'vue-star'
  export default {
    components: {
      VueStar
    }
  }
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
  background-color: #E6E6E6;
}

</style>