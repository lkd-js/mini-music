<template>
  <div class="login-container">
    <span class="text">欢迎登录</span>
    <input
      type="text"
      class="number"
      v-model="state.phone"
      placeholder="请输入手机号"
    />
    <div class="yzm">
      <input type="text" v-model="state.password" placeholder="请输入验证码" />
      <button @click.stop="getYZM()" v-show="!state.isSend">获取验证码</button>
      <button v-show="state.isSend">再次获取</button>
    </div>
    <button @click.stop="getLogin()" class="login">点击登录</button>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { getLoginYZM, getLoginRes } from "@/request/api/login";
export default {
  setup() {
    const state = reactive({
      phone: "",
      password: "",
      isSend: false,
      time: 60,
    });
    // 设置定时装置
    const setTime = () => {
      console.log("ksby");
    };
    const getYZM = async () => {
      const res = await getLoginYZM(state.phone);
      if (res.data.code == 200) {
        state.isSend = true;
        setTime();
      } else {
        alert(res.data.message);
      }
    };
    const getLogin = async () => {
      const res = await getLoginRes(state.phone, state.password);
      console.log(res);
    };

    return {
      state,
      getLogin,
      getYZM,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: -webkit-linear-gradient(
    35deg,
    rgb(25, 0, 255),
    rgb(217, 0, 255)
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    color: #fff;
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }
  .number {
    width: 60%;
    height: 1rem;
    margin-bottom: 0.2rem;
    outline: none;
    border: none;
    text-indent: 0.2rem;
  }
  .yzm {
    width: 60%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      width: 60%;
      height: 100%;
      outline: none;
      border: none;
      text-indent: 0.2rem;
    }
    button {
      height: 100%;
      width: 2rem;
      border: none;
      background-color: #ccc;
      color: #000;
    }
  }
  .login {
    margin-top: 0.4rem;
    width: 2rem;
    height: 0.8rem;
    border: none;
    border-radius: 0.2rem;
    background-color: rgba(0, 0, 0, 0.19);
    color: #fff;
  }
}
</style>