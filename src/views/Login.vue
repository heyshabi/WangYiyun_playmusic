<template>
  <div class="login">
    <span @click="$router.go(-1)">返回首页</span>
    <p class="loginTop">欢迎登录</p>
    <div class="loginContent">
      <input type="text" placeholder="请输入手机号" v-model="phone">
      <input type="password" placeholder="请输入密码" v-model="password">
      <div class="btn">
      <button @click="Login">登录</button>
      <button>注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      phone:'',
      password:''
    }
  },
  methods:{
    async Login() {
      let res=await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
      if(res.data.code===200) {
        this.$store.commit('updateIslogin',true);
        this.$store.commit('updateToken',res.data.token)
        this.$router.push('/userinfo')
      }else{
        alert('手机或密码错误');
        this.password=''
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  height: 15rem;
  width: 100%;
  background-color: rgb(241, 99, 99);
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    color:#fff
  }
  .loginTop {
    font-size: 1rem;
    color: #fff;
    margin-top: 1rem;
  }
  .loginContent {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    input {
      width: 5rem;
      height: 1rem;
      padding: 0.2rem;
      border: 0.02rem solid #999;
    }
    .btn {
      button {
      margin: 0 .4rem;
      width: 2rem;
      height: 0.8rem;
    }
    } 
  }
}
</style>