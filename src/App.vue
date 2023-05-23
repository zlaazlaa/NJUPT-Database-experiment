<template>
  <div id='app'> <img src='./assets/logo.png'> <router-view />
    <!-- <div class='buttons'> <button class='button' @click='goToTicket'>查询所有机票</button> <button class='button'
        @click='goToSearch'>根据航班号和日期查询机票</button> </div> -->
  </div>
</template>

<script>
export default {
  name: 'App', methods: {
    // 定义一个方法，用于导航至/ticket路由 
    goToTicket() { this.$router.push('/ticket'); },
    // 定义一个方法，用于导航至/search路由 
    goToSearch() { this.$router.push('/search'); }
  }
} </script>

<style> #app {
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

 img {
   height: 80px;
 }
</style>