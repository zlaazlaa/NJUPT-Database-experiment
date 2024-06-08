<template>
    <div class="container">
        <h1 class="title">欢迎使用票务管理系统</h1>
        <h1>B21090117朱梓烨</h1>
        <div class="buttons">
            <button @click="goToLogin">图书管理</button>
            <!-- <button @click="goToSearch">图书查询</button> -->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToLogin() { this.$router.push("/login"); },
        goToSearch() { this.$router.push("/manage"); },
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
    margin: 20px;
}

.buttons {
    display: flex;
    gap: 10px;
}

button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 5px;
}
</style>