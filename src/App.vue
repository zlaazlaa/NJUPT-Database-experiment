<template>
  <div id='app'>
    <img class="logoImg" src='./assets/logo.png'>
    <img class="bkgImg" src="@/assets/library.jpeg">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // 定义一个方法，用于导航至/ticket路由 
    goToTicket() { this.$router.push('/ticket'); },
    // 定义一个方法，用于导航至/search路由 
    goToSearch() { this.$router.push('/search'); }
  },
  mounted() {
    this.$router.push("/login");
  }
} </script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.button {
  background-color: #3273dc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.button:hover {
  background-color: #276cda;
}

.button:focus {
  outline: none;
}

.logoImg {
  height: 80px;
  pointer-events: none;
  -webkit-user-drag: none;
}

.bkgImg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.2;
  pointer-events: none;
  -webkit-user-drag: none;
}
</style>