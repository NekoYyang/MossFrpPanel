<template>
    <van-nav-bar title="登录"/>
    <div class="loginBox">
        <h2>请登陆您的账户</h2>
        <van-cell-group inset>
            <van-field
            v-model="qq"
            name="QQ号"
            label="QQ号"
            placeholder="QQ号"
            :rules="[{ required: true, message: '请填写QQ' }]"
            />
            <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit" @click="LoginButtonClicked">
            登录
            </van-button>
        </div>
    </div>
</template>
<style>
    .loginBox{
        text-align: center;
    }
</style>
<script lang="ts" setup>
import axios from 'axios';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { SetCookie } from '../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import router from '../router';
import { showFailToast, showSuccessToast, showLoadingToast } from 'vant';
    let qq = ref(null)
    let password = ref(null)
    const LoginButtonClicked = () => {
    if (qq.value == '' && password.value ==''){
        showFailToast('用户名或密码不可为空噢！🙅‍♂️')
    }else{
        showLoadingToast({ message: '少女祈祷中...', forbidClick: true })
        axios.get(`/api?type=login&loginType=QQ&account=${qq.value}&password=${password.value}`)
        .then(function(Response){
            const ResponseCode = GetStatusCode(Response)
            if (isPassedVerifictionInt(ResponseCode,200) == true){
                SetCookie('token',Response['data']['token'])
                showSuccessToast('欢迎回家 ，博士🥰')
                router.push('/m')
            }else{
                if (ResponseCode == 423){
                    showFailToast('⚡您请求的太快啦！请一分钟后再试噢 ！⚡')
                }else{
                    showFailToast('唔，你的账号密码是不是错了捏🤔')
                }
            }
        })
        .catch(function(){
            ElNotification.error({title: "错误", message: "唔，API 貌似无法访问呢！"})
        })
    }
}
</script>