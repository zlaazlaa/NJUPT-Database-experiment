<template>
    <div class="container">
        <el-form label-width="80px">
            <el-form-item label="学号">
                <el-input v-model="student_id"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="classroom"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="age"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="gender"></el-input>
            </el-form-item>
            <el-button type="primary" round @click="changePwd">确认修改</el-button>
            <el-button round @click="returnPage">返回</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            "student_id": "",
            "name": "",
            "classroom": "",
            "age": 0,
            "gender": "",
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const that = this
            fetch('https://database-experiment-flask.azurewebsites.net/users/' + localStorage.getItem('student_id'), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    that.student_id = data.data.student_id;
                    that.name = data.data.name;
                    that.classroom = data.data.class;
                    that.age = data.data.age;
                    that.gender = data.data.gender;
                })
        },
        changePwd() {
            fetch('https://database-experiment-flask.azurewebsites.net/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": "28",
                    "student_id": this.student_id,
                    "name": this.name,
                    "class": this.classroom,
                    "age": 20,
                    "gender": this.gender,
                    "password": this.password
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        alert("修改成功");
                    } else {
                        throw new Error("修改失败");
                    }
                }).catch(err => {
                    alert("修改失败");
                });
        },
        returnPage() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.container {
    width: 50%;
    margin: 0 auto;
    padding-top: 50px;
}
</style>