<template>
  <div id="page">
    <div class="container">
      <div :class="{ box: true, 'sign-up': isSignUp }">
        <h1>校园智慧助手</h1>
        <h1>校园智慧助手</h1>
        <a href="#" class="reg" @click="reg">还未注册？点击注册 </a>
        <a href="#" class="log" @click="log">已有账户？点击登录 </a>
        <img class="bloom" src="../assets/blooming.svg" alt="" />
        <img class="street" src="../assets/street.svg" alt="" />
        <div class="my-login-box" id="register-box">
          <img class="everyday" src="../assets/everyday.svg" alt="" />
          <h2>REGISTER</h2>
          <form>
            <div class="user-box">
              <input v-model="username" type="text" />
              <label>用户名</label>
              <div class="red" v-show="!hasUsername">请输入用户名</div>
            </div>
            <div class="user-box">
              <input v-model="psw" type="password" />
              <label>密码</label>
              <div class="red" v-show="!hasPsw">请输入密码</div>
            </div>
            <a href="#" class="login" @click="register">
              <span></span>
              <span></span>
              <span></span>
              <span></span> 注册
            </a>
          </form>
        </div>
        <div class="my-login-box" id="login-box">
          <img class="cat" src="../assets/cat.svg" alt="" />
          <h2>LOGIN</h2>
          <form>
            <div class="user-box">
              <input v-model="username" type="text" />
              <label>用户名</label>
              <div class="red" v-show="!hasUsername">请输入用户名</div>
            </div>
            <div class="user-box">
              <input v-model="psw" type="password" />
              <label>密码</label>
              <div class="red" v-show="!hasPsw">请输入密码</div>
            </div>
            <a href="#" class="login" @click="login">
              <span></span>
              <span></span>
              <span></span>
              <span></span> 登录
            </a>
          </form>
        </div>
      </div>
    </div>
    <a-alert
      type="error"
      message="用户名或密码错误，请重新输入！"
      banner
      v-if="validate"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { loginAPI } from "../api/login.js";
import { addStudent2API } from "../api/query.js";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const isSignUp = ref(false);

const { proxy } = getCurrentInstance();

//用户信息
const username = ref("");
const psw = ref("");
//表单校验
let hasUsername = ref(true);
let hasPsw = ref(true);

const reg = () => {
  isSignUp.value = true;
};
const log = () => {
  isSignUp.value = false;
};
const validate = ref(false);

function login() {
  if (username.value === "") hasUsername.value = false;
  else hasUsername.value = true;
  if (psw.value === "") hasPsw.value = false;
  else hasPsw.value = true;
  if (hasUsername.value && hasPsw.value) {
    if (username.value === "admin" && psw.value == 123456) {
      router.push({
        path: "/AI", //目标路由地址
      });
    } else {
      validate.value = true;
      setTimeout(() => {
        validate.value = false;
      }, 1000);
    }

    loginAPI(username.value, psw.value)
      .then((res) => {
        console.log("loginApi-res", res);
        sessionStorage.setItem("userMsg", JSON.stringify(res.data.data));
        if (res.data.code >= 200 && res.data.code < 300) {
          router.push({
            path: "/AI", //目标路由地址
          });
        } else {
          validate.value = true;
          setTimeout(() => {
            validate.value = false;
          }, 1000);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
function register() {
  if (username.value === "") hasUsername.value = false;
  else hasUsername.value = true;
  if (psw.value === "") hasPsw.value = false;
  else hasPsw.value = true;
  if (hasUsername.value && hasPsw.value) {
    addStudent2API(0, username.value, 0, "", "", psw.value, "")
      .then((res) => {
        console.log("addStudent2API-res", res);
      })
      .then(() => {
        message.success("注册成功");
      })
      .catch(() => {
        message.error("注册失败");
      });
  }
}
</script>
<style lang="less" scoped>
#page {
  width: 100%;
  height: 100%;
}
.street {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 200px;
}
.box {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70vw;
  height: 60vh;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  .bloom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 22%;
  }
  h1:nth-child(1) {
    position: absolute;
    top: 10vh;
    left: 4vw;
    color: rgb(137, 197, 183);
    font-size: 3vw;
    letter-spacing: 0.5rem;
  }
  h1:nth-child(2) {
    position: absolute;
    top: 10vh;
    right: 4vw;
    color: rgb(137, 197, 183);
    font-size: 3vw;
    letter-spacing: 0.5rem;
  }
}
.my-login-box {
  position: absolute;
  top: -5.5vh;
  width: 32vw;
  height: 70vh;
  padding: 80px;
  box-sizing: border-box;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.5s;
  .cat {
    position: absolute;
    left: 200px;
    width: 55%;
    bottom: 0;
  }
  .everyday {
    position: absolute;
    left: 250px;
    width: 200px;
    bottom: 0;
  }
}
.my-login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: rgb(137, 197, 183);
  text-align: center;
  font-size: 2rem;
}
.my-login-box .user-box {
  position: relative;
  margin-top: 3%;
}
.my-login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(137, 197, 183);
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgb(137, 197, 183);
  outline: none;
  background: transparent;
}
.my-login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(137, 197, 183);
  pointer-events: none;
  transition: 0.5s;
}
.my-login-box .user-box input:focus ~ label,
.my-login-box .user-box input:valid ~ label {
  top: -30px;
  left: 0;
  color: rgb(137, 197, 183);
  font-size: 12px;
}
.my-login-box form .login {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: rgb(137, 197, 183);
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 1.6vh;
  letter-spacing: 4px;
}
.reg {
  position: absolute;
  top: 32%;
  left: 15%;
  padding: 10px 20px;
  color: rgb(137, 197, 183);
  text-decoration: none;
  font-size: 1.2vw;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  z-index: -1;
}
.log {
  position: absolute;
  top: 32%;
  right: 10%;
  display: inline-block;
  padding: 10px 20px;
  color: rgb(137, 197, 183);
  font-size: 1.2vw;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  z-index: -1;
}
.reg:hover,
.log:hover {
  border-bottom: 1px solid rgb(137, 197, 183);
}
.my-login-box .login:hover {
  background: rgb(137, 197, 183);
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgb(137, 197, 183), 0 0 10px rgb(137, 197, 183),
    0 0 10px rgb(137, 197, 183), 0 0 10px rgb(137, 197, 183);
}
.my-login-box .login span {
  position: absolute;
  display: block;
}
.my-login-box .login span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgb(137, 197, 183));
  animation: btn-anim1 1s linear infinite;
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
.my-login-box .login span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgb(137, 197, 183));
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}
@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
.my-login-box .login span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, rgb(137, 197, 183));
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
.my-login-box .login span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, rgb(137, 197, 183));
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
.box #register-box {
  opacity: 0;
  transform: translateX(550px);
}
.box #login-box {
  opacity: 1;
  right: 0;
}
.box.sign-up #login-box {
  opacity: 0;
  transform: translateX(-550px);
}
.box.sign-up #register-box {
  opacity: 1;
  transform: translateX(0px);
  z-index: 1;
}
.red {
  position: absolute;
  color: red;
  transform: translateY(-1.8rem);
  font-size: xx-small;
}
</style>
