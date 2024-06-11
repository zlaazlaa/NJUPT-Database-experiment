<template>
    <div class="container">
        <div class="home" @click="() => $router.push('/userinfo')">
            <h4>用户信息</h4>
        </div>

        <h1>图书管理——B21090117朱梓烨</h1>

        <div class="search-bar">
            <input type="text" v-model="queryStr" placeholder="关键词">
            <button @click="queryBooks">查询</button>
            <button v-if="isAdmin()" @click="addBooks">添加</button>
        </div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="编号" :width="100" :resizable="false" align="center">
            </el-table-column>
            <el-table-column prop="name" label="书名" align="center">
            </el-table-column>
            <el-table-column prop="author" label="作者" align="center">
            </el-table-column>
            <el-table-column prop="publisher" label="出版社" align="center">
            </el-table-column>
            <el-table-column prop="status" label="借阅状态" :width="80" align="center">
            </el-table-column>
            <el-table-column prop="category" label="类型" align="center">
            </el-table-column>
            <el-table-column prop="sum" label="图书总量" align="center" :width="100">
            </el-table-column>
            <el-table-column prop="available_sum" label="可借数量" align="center" :width="100">
            </el-table-column>
            <el-table-column v-if="!isAdmin()" fixed="right" label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="borrowBooks(tableData[scope.$index])" type="text" size="small">
                        借阅
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column v-else fixed="right" label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="modifyBooks(tableData[scope.$index])" type="text" size="small">
                        修改
                    </el-button>
                    <el-button @click.native.prevent="deleteBooks(tableData[scope.$index])" type="text" size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="changePage" layout="prev, pager, next" :total="allData.length" :page-size="pageSize" :pager-count="11">
        </el-pagination>

        <el-dialog :title="isAddMode ? '添加' : '编辑'" :visible.sync="dialogVisible" width="30%">
            <el-form label-width="80px">
                <el-form-item label="书名">
                    <el-input v-model="choseItem.name"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="choseItem.author"></el-input>
                </el-form-item>
                <el-form-item label="出版社">
                    <el-input v-model="choseItem.publisher"></el-input>
                </el-form-item>
                <el-form-item label="借阅状态">
                    <el-input v-model="choseItem.status"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="choseItem.category"></el-input>
                </el-form-item>
                <el-form-item label="图书总量">
                    <el-input v-model="choseItem.sum"></el-input>
                </el-form-item>
                <el-form-item label="可借数量">
                    <el-input v-model="choseItem.available_sum"></el-input>
                </el-form-item>
                <el-button type="primary" @click="confirmModify">确认{{ isAddMode ? "添加" : "修改" }}</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
let gotStr = ""
function propcessTemp(tempStr) {
    console.log("processing: ", tempStr.length);
    gotStr += tempStr
    const items = gotStr.split('\n')
    return items.map(item => {
        const values = item.split('\t')
        if (values.length < 8) {
            gotStr = item
            return
        }
        return {
            'id': values[0],
            'name': values[1],
            'author': values[2],
            'publisher': values[3],
            'status': values[4],
            'category': values[5],
            'sum': values[6],
            'available_sum': values[7],
        }
    })
}
function splitStr(str, len = 1000) {
    const result = []
    let temp = ''
    for (let i = 0; i < str.length; i++) {
        temp += str[i]
        if (temp.length >= len) {
            result.push(temp)
            temp = ''
        }
    }
    if (temp.length > 0) {
        result.push(temp)
    }
    return result
}

export default {
    data() {
        return {
            tableData: [],
            tickets: [],
            queryFlightNumber: '',
            queryStr: '',
            dialogVisible: false,
            isEditMode: false,
            isAddMode: false,
            choseItem: {},
            allData: [],
            pageSize: 20,
        };
    },
    mounted() {
        this.showBooks();
    },
    computed: {
        pageNums: () => {
            return Math.ceil(this.allData.length / 10);
        }
    },
    methods: {
        isAdmin() {
            return localStorage.getItem('role') === 'admin';
        },
        changePage(page) {
            this.tableData = this.allData.slice((page - 1) * 20, page * 20);
        },
        async showBooks() {
            const resp = await fetch('https://database-experiment-flask.azurewebsites.net/books')
            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                } else {
                    console.log("reading: ", value.length);
                }
                const tempStr = decoder.decode(value, { stream: true });
                const splited = splitStr(tempStr);
                for (const str of splited) {
                    const items = propcessTemp(str)
                    items.forEach(item => {
                        if (item) {
                            this.allData.push(item);
                        }
                    })
                }
                if(this.tableData.length <= this.pageSize) {
                    this.changePage(1)
                }
            }
            // fetch('https://database-experiment-flask.azurewebsites.net/books')
            //     .then(response => response.json())
            //     .then(data => {
            //         if (data.code === 200) {
            //             this.tableData = data.data;
            //         } else {
            //             alert('获取图书失败');
            //         }
            //     });
        },
        borrowBooks(choseItem) {
            fetch(`https://database-experiment-flask.azurewebsites.net/books_borrow/${choseItem.id}`, {
                method: 'POST',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        alert('借阅成功');
                        choseItem.available_sum -= 1;
                    } else {
                        alert(data.message)
                    }
                });
        },
        queryBooks() {
            console.log(this.queryStr);
            // alert(this.queryStr)
            // book_query
            // search string
            fetch(`https://database-experiment-flask.azurewebsites.net/books_query?search=${this.queryStr}`)
                .then(response => response.json())
                .then(data => {
                    this.tableData = data.data;
                });
        },
        modifyBooks(choseItem) {
            this.isAddMode = false;
            this.choseItem = choseItem;
            this.dialogVisible = true;
        },
        confirmModify() {
            this.choseItem.status = parseInt(this.choseItem.status);
            console.log(this.choseItem);
            if (this.isAddMode) {
                fetch(`https://database-experiment-flask.azurewebsites.net/books`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.choseItem),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 200) {
                            alert('add成功');
                            this.dialogVisible = false;
                        } else {
                            alert('add失败');
                        }
                    });
            } else {
                fetch(`https://database-experiment-flask.azurewebsites.net/books/${this.choseItem.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.choseItem),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 200) {
                            alert('修改成功');
                            this.dialogVisible = false;
                        } else {
                            alert('修改失败');
                        }
                    });
            }
        },
        deleteBooks(choseItem) {
            fetch(`https://database-experiment-flask.azurewebsites.net/books/${choseItem.id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.code === 200) {
                        alert('删除成功');
                        this.showBooks();
                    } else {
                        alert('删除失败');
                    }
                });
        },
        addBooks() {
            this.choseItem = {
                'name': '',
                'author': '',
                'publisher': '',
                'status': 0,
                'category': '',
                'sum': 0,
                'available_sum': 0,
            };
            this.isAddMode = true;
            this.dialogVisible = true;
        },
    }
};
</script>

<style scoped>
.container {
    margin: 20px;
}

.home {
    position: absolute;
    width: 100px;
    height: 50px;
    border-radius: 50%;
    right: 10px;
    top: 10px;
    background-color: cyan;
    align-content: center;
    text-align: center;
    box-shadow: 8px 10px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    user-select: none;
}

/* 取消文字复制、选中 */
.home h4 {
    margin: 0;
    user-select: none;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.search-bar {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.search-bar input {
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 50%;
    margin-right: 10px;
}

.search-bar button {
    padding: 10px 20px;
    margin: 0px 10px 0px 10px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
