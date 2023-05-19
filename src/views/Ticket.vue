# Ticket.vue

<template>
  <div class="ticket">
    <div class="search">
      <el-input placeholder="请输入航班号" v-model="searchForm.flightNumber"></el-input>
      <el-button type="primary" @click="searchTicket">查询</el-button>
      <el-button type="success" @click="showAddDialog">新增</el-button>
      <el-button type="danger" @click="batchDeleteTicket">批量删除</el-button>
    </div>
    <div class="table">
      <el-table :data="ticketList" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="flightNumber" label="航班号" width="120"></el-table-column>
        <el-table-column prop="departure" label="起点" width="120"></el-table-column>
        <el-table-column prop="destination" label="终点" width="120"></el-table-column>
        <el-table-column prop="departureTime" label="起飞时刻" width="180"></el-table-column>
        <el-table-column prop="arrivalTime" label="到达时刻" width="180"></el-table-column>
        <el-table-column prop="availableSeats" label="剩余座位数" width="120"></el-table-column>
        <el-table-column prop="price" label="票价" width="120"></el-table-column>
        <el-table-column prop="discountPrice" label="折扣票价" width="120"></el-table-column>
        <el-table-column prop="discountRate" label="折扣率" width="120"></el-table-column>
        <el-table-column prop="airline" label="航班所属航空公司" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="showUpdateDialog(row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteTicket(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增或修改弹窗 -->
    <div class="dialog">
      <el-dialog title= "新增或修改票务信息"
                 :visible.sync= "dialogVisible"
                 :before-close= "handleClose"
                 width= "50%">
        <!-- 表单 -->
        <div class = "form">
          <el-form :model= "form"
                   :rules= "rules"
                   ref= "form"
                   label-width= "100px">
            <!-- 航班号 -->
            <el-form-item label = "航班号"
                           prop = "flightNumber">
              <el-input v-model = "form.flightNumber"
                         placeholder = "请输入航班号"
                         clearable >
              </el-input >
            </el-form-item >
            <!-- 起点 -->
            <el-form-item label = "起点"
                           prop = "departure">
              <el-input v-model = "form.departure"
                         placeholder = "请输入起点"
                         clearable >
              </el-input >
            </el-form-item >
            <!-- 终点 -->
            <el-form-item label = "终点"
                           prop = "destination">
              <el-input v-model = "form.destination"
                         placeholder = "请输入终点"
                         clearable >
              </el-input >
            </el-form-item >
            <!-- 起飞时刻 -->
            <el-form-item label = "起飞时刻"
                           prop = "departureTime">
              <el-date-picker v-model = "form.departureTime"
                               type = "datetime"
                               value-format = "yyyy-MM-dd HH:mm:ss"
                               placeholder = "选择起飞时刻">
              </el-date-picker >
            </el-form-item >
            <!-- 到达时刻 -->
            <el-form-item label = "到达时刻"
                           prop = "arrivalTime">
              <el-date-picker v-model = "form.arrivalTime"
                               type = "datetime"
                               value-format = "yyyy-MM-dd HH:mm:ss"
                               placeholder = "选择到达时刻">
              </el-date-picker >
            </el-form-item >
            <!-- 剩余座位数 -->
            <el-form-item label = "剩余座位数"
                           prop = "availableSeats">
              <el-input-number v-model = "form.availableSeats"
                                :min= 0
                                :max= 200
                                controls-position= right
                                placeholder= 0 >
              </el-input-number >
            </el-form-item >
            <!-- 票价 -->
            <el-form-item label = "票价"
                           prop = "price">
              <el-input-number v-model = "form.price"
                                :min= 0
                                :max= 10000
                                controls-position= right
                                placeholder= 0 >
              </el-input-number >
            </el-form-item >
            <!-- 折扣票价 -->
            <el-form-item label = "折扣票价"
                           prop = "discountPrice">
              <el-input-number v-model = "form.discountPrice"
                                :min= 0
                                :max= 10000
                                controls-position= right
                                placeholder= 0 >
              </el-input-number >
            </el-form-item >
            <!-- 折扣率 -->
            <el-form-item label = "折扣率"
                           prop = "discountRate">
              <el-input-number v-model = "form.discountRate"
                                :min= 0
                                :max= 1
                                :step= 0.01
                                controls-position= right
                                placeholder= 0 >
              </el-input-number >
            </el-form-item >
            <!-- 航班所属航空公司 -->
            <el-form-item label = "航班所属航空公司"
                           prop = "airline">
              <el-select v-model = "form.airline"
                          placeholder = "请选择航班所属航空公司" >
                <el-option label = "中国国际航空"
                            value = "中国国际航空" >
                </el-option >
                <el-option label = "中国南方航空"
                            value = "中国南方航空" >
                </el-option >
                <el-option label = "中国东方航空"
                            value = "中国东方航空" >
                </el-option >
                <el-option label = "海南航空"
                            value = "海南航空" >
                </el-option >
              </el-select >
            </el-form-item >
          </el-form >
        </div >

        <!-- 按钮 -->
        <div slot = "footer"
              class = "dialog-footer" >
          <el-button @click = "dialogVisible = false" > 取 消 </el-button>
          <el-button type = "primary"
                      @click = "submitForm ( 'form' )" > 确 定 </el-button>
        </div >
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 引入Axios库和ElementUI组件
import axios from 'axios'
import { Button, Table, TableColumn, Input, Dialog, Form, FormItem, DatePicker, InputNumber, Select, Option } from 'element-ui'

export default {
  // 注册ElementUI组件
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [DatePicker.name]: DatePicker,
    [InputNumber.name]: InputNumber,
    [Select.name]: Select,
    [Option.name]: Option
  },
  // 定义数据
  data () {
    return {
      // 搜索表单数据
      searchForm: {
        flightNumber: ''
      },
      // 票务信息列表数据
      ticketList: [],
      // 弹窗显示与隐藏
      dialogVisible: false,
      // 表单数据
      form: {
        id: '',
        flightNumber: '',
        departure: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: '',
        price: '',
        discountPrice: '',
        discountRate: '',
        airline: ''
      },
      // 表单验证规则
      rules: {
        flightNumber: [
          { required: true, message: '请输入航班号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        departure: [
          { required: true, message: '请输入起点', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        destination: [
          { required: true, message: '请输入终点', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        departureTime: [
          { type:'date', required:true,message:'请选择起飞时刻',trigger:'change'}
        ],
        arrivalTime:[
          { type:'date', required:true,message:'请选择到达时刻',trigger:'change'}
        ],
        availableSeats:[
          { type:'number', required:true,message:'请输入剩余座位数',trigger:'blur'}
        ],
        price:[
          { type:'number', required:true,message:'请输入票价',trigger:'blur'}
        ],
        discountPrice:[
          { type:'number', required:true,message:'请输入折扣票价',trigger:'blur'}
        ],
        discountRate:[
          { type:'number', required:true,message:'请输入折扣率',trigger:'blur'}
        ],
        airline:[
          { required:true,message:'请选择航班所属航空公司',trigger:'change'}
        ]
      },
      // 是否为新增操作
      isAdd:true,
      // 多选的数组
      multipleSelection:[]
    }
  },
  // 定义方法
  methods:{
    // 获取票务信息列表
    getTicketList(){
      axios.get('https://database-experiment-flask.azurewebsites.net/query')
           .then(res=>{
             if(res.data.code===200){
               this.ticketList=res.data.data
             }else{
               this.$message.error('获取数据失败')
             }
           })
           .catch(err=>{
             console.log(err)
             this.$message.error('获取数据失败')
           })
    },
    // 搜索票务信息
    searchTicket(){
      axios.get('https://database-experiment-flask.azurewebsites.net/query',{
              params:{
                flightNumber:this.searchForm.flightNumber
              }
            })
           .then(res=>{
             if(res.data.code===200){
               this.ticketList=res.data.data
             }else{
               this.$message.error('搜索数据失败')
             }
           })
           .catch(err=>{
             console.log(err)
             this.$message.error('搜索数据失败')
           })
    },
    // 显示新增弹窗
    showAddDialog(){
      this.dialogVisible=true
      this.isAdd=true
      this.form={
        id:'',
        flightNumber:'',
        departure:'',
        destination:'',
        departureTime:'',
        arrivalTime:'',
        availableSeats:'',
        price:'',
        discountPrice:'',
        discountRate:'',
        airline:''
      }
    },
    // 显示修改弹窗
    showUpdateDialog(row){
      this.dialogVisible=true
      this.isAdd=false
      this.form={
        id:row.id,
        flightNumber:row.flightNumber,
        departure:row.departure,
        destination:row.destination,
        departureTime:row.departureTime,
        arrivalTime:row.arrivalTime,
        availableSeats:row.availableSeats,
        price:row.price,
        discountPrice:row.discountPrice,
        discountRate:row.discountRate,
        airline:row.airline
      }
    },
    // 提交表单
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          if(this.isAdd){
            // 新增操作
            axios.post('https://database-experiment-flask.azurewebsites.net/insert',this.form)
                 .then(res=>{
                   if(res.data.code===200){
                     this.$message.success('添加成功')
                     this.dialogVisible=false
                     this.getTicketList()
                   }else{
                     this.$message.error('添加失败')
                   }
                 })
                 .catch(err=>{
                   console.log(err)
                   this.$message.error('添加失败')
                 })
          }else{
            // 修改操作
            axios.put('https://database-experiment-flask.azurewebsites.net/update',this.form)
                 .then(res=>{
                   if(res.data.code===200){
                     this.$message.success('修改成功')
                     this.dialogVisible=false
                     this.getTicketList()
                   }else{
                     this.$message.error('修改失败')
                   }
                 })
                 .catch(err=>{
                   console.log(err)
                   this.$message.error('修改失败')
                 })
          }
        }else{
          this.$message.warning('请完善表单信息')
          return false
        }
      })
    },
    // 删除票务信息
    deleteTicket(id){
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(`https://database-experiment-flask.azurewebsites.net/delete?id=${id}`)
               .then(res=>{
                 if(res.data.code===200){
                   this.$message.success('删除成功')
                   this.getTicketList()
                 }else{
                   this.$message.error('删除失败')
                 }
               })
               .catch(err=>{
                 console.log(err)
                 this.$message.error('删除失败')
               })
          
        }).catch(() => {
          this.$message.info('已取消删除')
        });
    },
    // 批量删除票务信息
    batchDeleteTicket(){
      if(this.multipleSelection.length===0){3
        this.$message.warning('请至少选择一条数据')
      }else{
        let ids=this.multipleSelection.map(item=>item.id).join(',')
        this.$confirm(`此操作将永久删除这${this.multipleSelection.length}条数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(`https://database-experiment-flask.azurewebsites.net/delete?id=${ids}`)
               .then(res=>{
                console.log(res)
                 if(res.data.code===200){
                   this.$message.success('批量删除成功')
                   this.getTicketList()
                 }else{
                   this.$message.error('批量删除失败')
                 }
               })
               .catch(err=>{
                 console.log(err)
                 this.$message.error('批量删除失败')
               })
          
        }).catch(() => {
          this.$message.info('已取消批量删除')
        });
      }
    },
    // 处理多选变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 处理弹窗关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.form={
            id:'',
            flightNumber:'',
            departure:'',
            destination:'',
            departureTime:'',
            arrivalTime:'',
            availableSeats:'',
            price:'',
            discountPrice:'',
            discountRate:'',
            airline:''
          }
          this.$refs['form'].resetFields()
          
        })
        .catch(_ => {});
    }
  },
  // 挂载后获取数据列表
  mounted(){
    this.getTicketList()
  }
}
</script>

<style scoped>
.ticket{
  width: 1200px;
  margin: 0 auto;
}
.search{
  margin-bottom: 20px;
}
</style>
