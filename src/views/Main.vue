<template>
    <div class="container">
        <h1 class="title">欢迎使用票务管理系统——B20090611马青宇</h1>
        <div class="buttons"> <button @click="goToLogin">票务管理</button> <button @click="goToSearch">票务查询</button> </div>
    </div>
</template>

<script>
export default { methods: { goToLogin() { this.$router.push("/login"); }, goToSearch() { this.$router.push("/search"); }, }, }; </script>

<style scoped> .container {
     display: flex;
     flex-direction: column;
     align-items: center;
 }

 .title {
     font-size: 36px;
     margin: 20px;
 }

 .buttons {
     display: flex;
     gap: 10px;
 }

 button {
     padding: 10px;
     font-size: 18px;
 }</style>