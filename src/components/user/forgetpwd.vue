<template>
<div class="background" v-loading="isLoading">
  <div id="pwdBox" v-loading="isLoading">
      <h2 style="font-size:var(--el-font-size-extra-large)">忘记密码</h2>
      <el-input ref="v1" v-model="eMail" placeholder="邮箱" />
      <el-input ref="v2" type="password" v-model="passWord" placeholder="新密码" />
      <el-input class="verification" ref="v1" v-model="verification" placeholder="验证码" />      <el-button class="getcode" :disabled="isSended" :loading="isSending" @click="getCode" >{{ButtonData}}</el-button>
      <el-button @click="pwdButtonClicked" type="primary" size="large"  color="rgb(46 36 36 / 70%)" style="margin-left:1px;width:100px;" class="pwdbutton">重置密码</el-button>
      <el-button type="text" @click="BackRegister">我还没有账号</el-button>
      <el-button type="text" @click="BackLogin">返回登录</el-button>
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
  #pwdBox{
    color: blanchedalmond;
        float:right;
        width:20%;
        padding:10px 15px;
        margin-top: 11%;
        height: 50%;
        margin-right: 25%;
        border-radius:10px;
        transform: translate(-200px);
        background: rgb(46 36 36 / 70%);
        box-shadow: 0px 15px 25px #00000020;
  }
  #pwdBox .el-input,#pwdBox .el-button{
      margin-top:20px;
  }
  #pwdBox .getcode{
    background: rgb(46 36 36 / 70%);
    color: blanchedalmond;
    border-color: rgb(255, 255, 255);
    width: 111px;
  }
  .pwdbutton{
    background-color: #0000007e;
    color: blanchedalmond;
    border-color: rgb(255, 255, 255);
    width: 111px;
  }
/*鼠标按下，没有抬起*/
.buttonDiv:active {
    background: #f05800;
    color: white;
}
.getcode:hover{
    background: rgba(0, 0, 0, 0.7)  !important;
    color: white !important;
    border-color: blanchedalmond !important;
  }
  .pwdbutton:hover{
    background: rgba(0, 0, 0, 0.7)  !important;
    color: white !important;
    border-color: blanchedalmond !important;
  }
  /*按钮点击*/
#pwdbox .el-button:focus {
    background: rgba(0, 0, 0, 0.7) !important;
    color: blanchedalmond !important;
    border-color: blanchedalmond !important;
  }
  .verification{
      width: 157px;
  }
  .pwdbutton{
    margin-left: 1px;
  }
  #pwdBox .el-button {
        color: #ffebcd;
        margin-top:20px;
    }
    #pwdBox .el-input{
        color: blanchedalmond;
        margin-top:20px;
        --el-input-focus-border-color: #ffebcd;
        --el-input-text-color: #ffebcd;
        --el-input-placeholder-color: #ffebcd;
    }
    #pwdBox .el-input__wrapper{
        background-color: #0000007e;
    }
    .el-loading-mask{
        border-radius:10px;
        background: rgb(46 36 36 / 70%);
    }
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import router from '../router/index'
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import axios from 'axios';
import { GetStatusCode,isPassedVerifictionInt } from '../../modules/StatusCodeParser.js';
import { SetCookie } from '../../modules/CookieHelper.js';
const eMail = ref('')
const verification = ref('')
const passWord = ref('')
const isLoading = ref(false)
let isSended = ref(false)
let isSending = ref(false)
let ButtonData = ref('获取验证码')
const getCode = () => {
    let time = 60;
    const loginContainerInstance = document.getElementById("pwdBox");
    const loadingInstance = ElLoading.service({target: loginContainerInstance, text: "少女祈祷中..", background: 'rgba(0, 0, 0, 0.7)',});
    axios.get(`/api?type=verification&email=${eMail.value}&key=forgetPassword`)
      .then(function(Response){
          loadingInstance.close();
          const ResponseCode = GetStatusCode(Response)
          if (isPassedVerifictionInt(ResponseCode,200) == true){
              SetCookie('token',Response['data']['token'])
              ElMessage.success("发送成功")
              let timer = setInterval(() => {
        time--;
        ButtonData.value = time + '秒后重试';
            isSended.value = true;
            isSending.value = true;
        if (time <= 0) {
            clearInterval(timer);
            isSended.value = false;
            isSending.value = false;
            ButtonData.value = '获取验证码';
        }
    }, 1000);
          }else{
              if (ResponseCode == 423){
                  ElMessage.error("IP黑名单，请稍后再试")
                  isSended.value = false;
                  isSending.value = false;
                  ButtonData = ref('发送验证码')
              }else{
                  ElMessage.error(`获取验证码失败：${Response.data['message']}`)
                  isSended.value = false;
                  isSending.value = false;
                  ButtonData = ref('发送验证码')
                }
          }
      })
}
const BackLogin = () => {
        router.push('/login')
}
const BackRegister = () => {
        router.push('/register')
}
const pwdButtonClicked = () => {
  if (eMail.value == '' && passWord.value =='' && verification.value ==''){
      ElMessage.error('邮箱，密码和验证码不可为空')
  }else{
      const loginContainerInstance = document.getElementById("pwdBox");
      const loadingInstance = ElLoading.service({target: loginContainerInstance, text: "少女祈祷中..", background: 'rgba(0, 0, 0, 0.7)'});
      axios.get(`/api?type=forgetPassword&email=${eMail.value}&code=${verification.value}&password=${passWord.value}`)
      .then(function(Response){
          loadingInstance.close();
          const ResponseCode = GetStatusCode(Response)
          if (isPassedVerifictionInt(ResponseCode,200) == true){
              SetCookie('token',Response['data']['token'])
              ElMessage.success("重置密码成功")
              router.push('/login')
          }else{
              if (ResponseCode == 423){
                  ElMessage.error("IP黑名单，请稍后再试")
              }else if (ResponseCode == 404){
                  ElMessage.error("请检查你的验证码！")
              }else{
                ElMessage.error(`创建失败：${Response.data['message']}`)
          }
        }
      })
      .catch(function(){
          ElNotification.error({title: "错误", message: "无法连接到后端服务，请联系墨守"})
      })
  }
}
</script>