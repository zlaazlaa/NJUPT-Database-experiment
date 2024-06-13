<template>
  <div class="container">
    <h1 class="title">欢迎使用图书管理系统</h1>
    <h1>B21090117朱梓烨</h1>
    <div class="loginfo">
      <div class="input-group">
        <label for="username">账号</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="input-group">
        <label for="password">密码</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div style="display: flex; justify-content: space-evenly;">
        <button type="button" @click="login">登录</button>
        <button type="button" @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: "admin",
      password: "password123",
    };
  },
  methods: {
    login() {
      fetch("https://service-eq5qyvbi-1314518256.gz.tencentapigw.com.cn/release/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "student_id": this.username,
          "password": this.password
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("login: ", data);
          if (data.code === 200) {
            alert("登录成功");
            this.$router.push("/manage");
            localStorage.setItem('id', data.id)
            localStorage.setItem("role", data.role === "admin" ? "admin" : "user")
            localStorage.setItem("student_id", data.user_id)
          } else {
            throw data.message
          }
        })
        .catch((msg) => {
          alert(msg);
        });
      // if (this.username === "admin" && this.password === "admin") {
      //   alert("登录成功");
      //   this.$router.push("/manage");
      //   localStorage.setItem("role", "admin")
      // } else if (this.username === "user" && this.password === "user") {
      //   alert("登录成功");
      //   this.$router.push("/manage");
      //   localStorage.setItem("role", "user")
      // } else {
      //   alert("账号或密码错误");
      // }
    },
    register() {
      fetch("https://service-eq5qyvbi-1314518256.gz.tencentapigw.com.cn/release/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "student_id": this.username,
          "name": "暂无",
          "class": "暂无",
          "age": 18,
          "gender": "暂无",
          "password": this.password
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            alert("注册成功");
          } else {
            throw data.message
          }
        }).catch((msg) => {
          alert(msg);
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  flex: 1;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.loginfo {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 300px;
  text-align: center;
}
</style>