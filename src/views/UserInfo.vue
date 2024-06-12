<template>
    <div class="container">
        <el-table v-if="isAdmin()" :data="tableData">
            <el-table-column prop="student_id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="class" label="班级"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
        </el-table>
        <el-form v-else label-width="80px">
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
        </el-form>
        <div class="return">
            <el-button type="primary" round @click="changePwd">确认修改</el-button>
            <el-button round @click="returnPage">返回</el-button>
        </div>
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
            tableData: []
        }
    },
    mounted() {
        if(this.isAdmin()) {
            this.getAllUserInfo();
        } else {
            this.getUserInfo();
        }
    },
    methods: {
        isAdmin() {
            return localStorage.getItem('role') === 'admin';
        },
        async getUserInfo() {
            const that = this
            fetch('https://service-eq5qyvbi-1314518256.gz.tencentapigw.com.cn/release/users/' + localStorage.getItem('student_id'), {
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
        async getAllUserInfo() {
            fetch('https://service-eq5qyvbi-1314518256.gz.tencentapigw.com.cn/release/users')
                .then(response => response.json())
                .then(data => {
                    this.tableData = data.data;
                })
        },
        changePwd() {
            fetch('https://service-eq5qyvbi-1314518256.gz.tencentapigw.com.cn/release/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": 27,
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
                        throw new Error(data.message);
                    }
                }).catch(err => {
                    alert(err);
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

.return {
    margin-top: 20px;
}
</style>