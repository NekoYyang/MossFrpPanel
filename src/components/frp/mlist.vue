<template>
    <van-nav-bar title="节点列表"></van-nav-bar>
    <!-- <div class="m-node-card">
        <h2>某个节点</h2>
        <span>这是节点备注</span>
        <span><i class="van-badge__wrapper van-icon van-icon-arrow-up"></i> 0.0 kbps</span>
        <span><i class="van-badge__wrapper van-icon van-icon-arrow-down"></i> 0.0 kbps</span>
        <span><i class="van-badge__wrapper van-icon van-icon-balance-o"></i> 0 银币</span>
    </div> -->
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

axios.get(`/api?type=allNode&token=${GetCookie('token')}&getAsList=true`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        for (var i = 0; i < Response.data['nodeData'].length; i++){
            console.log(Response.data['nodeData'][i])
            var vnode = document.createElement('div')
            vnode.className = "m-node-card"
            vnode.innerHTML = `<h2>${Response.data['nodeData'][i]['node']} | ${Response.data['nodeData'][i]['address']}</h2><span>${Response.data['nodeData'][i]['info']}</span><span><i class="van-badge__wrapper van-icon van-icon-arrow-up"></i> ${Response.data['nodeData'][i]['load']}</span><span><i class="van-badge__wrapper van-icon van-icon-balance-o"></i>${Response.data['nodeData'][i]['price']}  银币</span>`
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