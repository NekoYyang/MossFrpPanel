<template>
    <van-nav-bar title="穿透码列表"></van-nav-bar>
    <span style="color: #444444; font-size: 0.7em; margin-left:5px">*目前手机版仅支持预览功能，如需操作请前往群内或电脑端进行操作</span>
    <div id="nodeParent"></div>
    <van-tabbar route>
        <van-tabbar-item replace to="/m" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/m/list" icon="bookmark-o">节点列表</van-tabbar-item>
        <van-tabbar-item replace to="/m/code" icon="edit">穿透码列表</van-tabbar-item>
        <van-tabbar-item replace to="/m/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
</template>
<style>
.m-node-card{
    width: 300px;
    padding: 15px 15px;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    margin: auto;
    margin-top: 10px;
}

.m-node-card span{
    display: block;
    margin-top:10px;
}
</style>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import { GetCookie, RemoveCookie } from '../../modules/CookieHelper';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../router';
import { showFailToast, showSuccessToast, showLoadingToast } from 'vant';
const route = useRoute();
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
        return;
    }else{
        if (ResponseCode == 423){
            showFailToast('IP黑名单，请稍后重试')
        }else{
            showFailToast('您还没有登录噢！')
            router.push('/login')
        }
    }
})

axios.get(`/api?type=userCode&token=${GetCookie('token')}&getAsList=true`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        for (var i = 0; i < Response.data['codeData'].length; i++){
            console.log(Response.data['codeData'][i])
            var vnode = document.createElement('div')
            vnode.className = "m-node-card"
            var outdatedTime = new Date(parseInt(Response.data['codeData'][i]['stop']))
            vnode.innerHTML = `<h2>${Response.data['codeData'][i]['node']} | ${Response.data['codeData'][i]['number']}</h2><span>端口：${Response.data['codeData'][i]['port']} (+10)</span><span><i class="van-badge__wrapper van-icon van-icon-coupon-o"></i> ${Response.data['codeData'][i]['code']}</span><span><i class="van-badge__wrapper van-icon van-icon-warn-o"></i>${outdatedTime.toLocaleDateString().replace(/\//g, "/") + " " + outdatedTime.toTimeString()}</span>`
            document.getElementById('nodeParent').appendChild(vnode)
        }
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