<template>
  <div class="login-container">
    <span class="text">欢迎登录</span>
    <input
      type="text"
      class="number"
      v-model="state.phone"
      placeholder="请输入手机号"
    />
    <input
      type="text"
      class="number"
      v-model="state.cap"
      placeholder="请输入验证码"
    />
    <div class="time-container number" v-show="state.isTimeUp">
      <input type="text" class="time-up" v-model="state.time" disabled />
      <input
        type="text"
        class="time-hold"
        placeholder="秒后可重新获取"
        disabled
      />
    </div>

    <input
      type="button"
      class="number"
      value="点击获取验证码"
      v-show="!state.isTimeUp"
      @click="setTime()"
    />
    <input
      type="button"
      value="点击登录"
      @click.stop="getLogin()"
      class="login"
    />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { getCapRes } from "@/request/api/login";
import { useRouter } from "vue-router";
export default {
  setup() {
    const state = reactive({
      phone: "",
      cap: "",
      time: 60,
      isTimeUp: false,
    });

    const store = useStore();
    const { isLogin } = toRefs(store.state);
    const {
      login: [login],
    } = store._actions;
    //登录
    const getLogin = async () => {
      let res = await login({ phone: state.phone, cap: state.cap });
      console.log("接收的res");
      console.log(res);
      if (isLogin.value == true) {
        useRouter().push("/user");
      }
    };
    const setTime = async () => {
      state.isTimeUp = true;
      let timer = setInterval(() => {
        if (state.time > 0) {
          state.time--;
        } else {
          clearInterval(timer);
          timer = null;
          state.isTimeUp = false;
          state.time = 60;
        }
      }, 1000);
      await getCap();
    };
    const getCap = async () => {
      let res = await getCapRes(state.phone);
      console.log(res);
      if (res.data.code != 200) {
        console.log(res.data.message);
      } else {
        return res;
      }
    };

    return {
      state,
      getLogin,
      setTime,
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
  .time-container {
    display: flex;
    justify-content: space-around;
    background-color: #ccc;
    input {
      background-color: #ccc;
      height: 100%;
      border: none;
      text-align: center;
    }
    .time-up {
      width: 20%;
    }
    .time-hold {
      width: 60%;
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