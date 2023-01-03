<template>
    <van-nav-bar title="主页"></van-nav-bar>
    <el-card style="margin-top:10px" class="m-card">
        <span>欢迎回来，</span>
        <h2>{{username}}</h2>
    </el-card>
    <el-card style="margin-top:10px" class="m-card">
        <span>您的UID</span>
        <h2>{{uid}}</h2>
    </el-card>
    <el-card style="margin-top:10px" class="m-card">
        <span>金币</span>
        <h2>{{gold}}</h2>
    </el-card>
    <el-card style="margin-top:10px" class="m-card">
        <span>银币</span>
        <h2>{{silver}}</h2>
    </el-card>
    <van-tabbar route>
        <van-tabbar-item replace to="/m" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/m/list" icon="bookmark-o">节点列表</van-tabbar-item>
        <van-tabbar-item replace to="/m/code" icon="edit">穿透码列表</van-tabbar-item>
        <van-tabbar-item replace to="/m/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
</template>
<style>
.el-card{
    max-width:300px;
    margin-left:20px;
    margin-top:30px;
    border:0;
    border-radius:10px;
    /* background: linear-gradient(135deg,#02dd2a,#1ae78b); */
    /* color: #FFF; */
    margin: auto;
}
</style>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { GetStatusCode, isPassedVerifictionInt } from '../modules/StatusCodeParser';
import { GetCookie, RemoveCookie } from '../modules/CookieHelper';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from './router';
import { showFailToast, showSuccessToast, showLoadingToast } from 'vant';
const route = useRoute();
let username = ref('**');
let gold = ref('--');
let silver = ref('--')
let uid= ref('0')
const logout = () => {
  ElMessageBox.confirm('确认退出登录？','退出登录')
  .then(function(){
    RemoveCookie('token')
    router.push('/mlogin')
    showSuccessToast('您已退出登录')
  })
}

axios.get(`/api?type=userInfo&token=${GetCookie('token')}`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        var userData = Response['data']['userInfo']
        username.value = userData['username']
        gold.value = userData['gold']
        silver.value = userData['silver']
        uid.value = userData['userID']
    }else{
        if (ResponseCode == 423){
            showFailToast('IP黑名单，请稍后重试')
        }else{
            showFailToast('您还没有登录噢！')
            router.push('/login')
        }
    }
})
</script>