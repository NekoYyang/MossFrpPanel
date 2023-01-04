<template>
  <div class="background" v-loading="isLoading">
    <div id="loginBox" v-loading="isLoading">
        <h2 style="font-size:var(--el-font-size-extra-large)">请登陆您的账户</h2>
        <el-input ref="v1" v-model="userName" placeholder-color="#ffebcd" placeholder="邮箱" />
        <el-input ref="v2" type="password" v-model="passWord" placeholder="密码" />
        <el-button @click="LoginButtonClicked" type="primary" size="large" color="rgb(46 36 36 / 70%)" class="loginbutton">登录</el-button>
        <el-button type="text" @click="ForgetPasswordButttonClicked" color="#114514">忘记密码？</el-button>
        <el-button @click="RegButtonClicked" type="text">注册账户</el-button>
    </div>
</div>
</template>
<style>
    .background{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        position: relative;
        background-image: url("https://api.lazy.ink/img");
    }
    .left-float{
        float: left
    }
    #loginBox{
        color: blanchedalmond;
        float:right;
        width:20%;
        padding:10px 15px;
        margin-top: 13%;
        height: 40%;
        margin-right: 25%;
        border-radius:10px;
        transform: translate(-200px);
        background: rgb(46 36 36 / 70%);
        box-shadow: 0px 15px 25px #00000020;
    }
    #loginBox .el-button {
        color: #ffebcd;
        margin-top:20px;
    }
    #loginBox .el-input{
        color: blanchedalmond;
        margin-top:20px;
        --el-input-focus-border-color: #ffebcd;
        --el-input-text-color: #ffebcd;
        --el-input-placeholder-color: #ffebcd;
    }
    #loginBox .el-input__wrapper{
        background-color: #0000007e;
    }
    .el-loading-mask{
        border-radius:10px;
        background: rgb(46 36 36 / 70%);
    }
    #loginBox .loginbutton{
    background: rgb(46 36 36 / 70%);
    color: blanchedalmond;
    border-color: rgb(255, 255, 255);
  }
  .loginbutton:hover{
    background: rgba(0, 0, 0, 0.7)  !important;
    color: white !important;
    border-color: blanchedalmond !important;
  }
  /*按钮点击*/
#loginbox .el-button:focus {
    background: rgba(0, 0, 0, 0.7) !important;
    color: blanchedalmond !important;
    border-color: blanchedalmond !important;
  }
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import router from '../router/index'
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import axios from 'axios';
import { GetStatusCode,isPassedVerifictionInt } from '../../modules/StatusCodeParser.js';
import { SetCookie } from '../../modules/CookieHelper.js';
const userName = ref('')
const passWord = ref('')
const isLoading = ref(false);
const RegButtonClicked = () => {
    router.push('/register')
}
const ForgetPasswordButttonClicked = () => {
    router.push('/forgetpwd')
}
const LoginButtonClicked = () => {

    if (userName.value == '' && passWord.value ==''){
        ElMessage.error('用户名或密码不可为空噢！🙅‍♂️')
    }else{
        const loginContainerInstance = document.getElementById("loginBox");
        const loadingInstance = ElLoading.service({target: loginContainerInstance, text: "少女祈祷中...",  background: 'rgba(0, 0, 0, 0.7)',});
        axios.get(`/api?type=login&loginType=email&account=${userName.value}&password=${passWord.value}`)
        .then(function(Response){
            loadingInstance.close();
            const ResponseCode = GetStatusCode(Response)
            if (isPassedVerifictionInt(ResponseCode,200) == true){
                SetCookie('token',Response['data']['token'])
                ElMessage.success("欢迎回家 ，博士🥰")
                router.push('/')
            }else{
                if (ResponseCode == 423){
                    ElMessage.error("⚡您请求的太快啦！请一分钟后再试噢 ！⚡")
                }else{
                    ElMessage.error("唔，你的账号密码是不是错了捏🤔")
                }
            }
        })
        .catch(function(){
            ElNotification.error({title: "错误", message: "唔，API 貌似无法访问呢！😶‍🌫️"})
        })
    }
}
</script>