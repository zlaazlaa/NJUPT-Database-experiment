<template>
    <div class="container">
      <h1 class="title">票务管理系统登录——B20090611马青宇</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">账号</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "admin",
        password: "admin",
      };
    },
    methods: {
      login() {
        // 假设正确的账号密码是admin和123456
        if (this.username === "admin" && this.password === "admin") {
          alert("登录成功");
          // 跳转到票务管理页面
          this.$router.push("/manage");
        } else {
          alert("账号或密码错误");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  label {
    width: 80px;
  }
  
  input {
    width: 200px;
    padding: 5px;
    margin-left: 10px;
  }
  
  button {
    padding: 10px 15px;
    font-size: 18px;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
    background-color: #42b3f5;
    color: #fff;
    cursor: pointer;
  }
  </style>
  