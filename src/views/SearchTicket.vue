<template>
  <div id="app">
    <h1>机票查询——B20090611马青宇</h1>

    <div class="search-bar">
      <input type="text" v-model="queryFlightNumber" placeholder="航班号">
      <input type="date" v-model="queryDate" placeholder="日期">
      <button class="btn btn-search" @click="queryTickets">查询</button>
    </div>

    <table class="centered-table">
      <thead>
        <tr>
          <th>航班号</th>
          <th>出发地</th>
          <th>目的地</th>
          <th>日期</th>
          <th>出发时刻</th>
          <th>到达时刻</th>
          <th>剩余座位数</th>
          <th>票价</th>
          <th>折扣票价</th>
          <th>折扣率</th>
          <th>航空公司</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.flightNumber }}</td>
          <td>{{ ticket.departure }}</td>
          <td>{{ ticket.destination }}</td>
          <td>{{ ticket.date }}</td>
          <td>{{ ticket.departureTime }}</td>
          <td>{{ ticket.arrivalTime }}</td>
          <td>{{ ticket.availableSeats }}</td>
          <td>{{ ticket.price }}</td>
          <td>{{ ticket.discountPrice }}</td>
          <td>{{ ticket.discountRate }}</td>
          <td>{{ ticket.airline }}</td>
        </tr>
      </tbody>
    </table>

    <div class="modal" v-if="isModalVisible">
      <div class="modal-content">
        <h2>{{ isEditMode ? '编辑机票' : '添加机票' }}</h2>
        <form @submit.prevent="isEditMode ? updateTicket() : addTicket()">
          <label for="flightNumber">航班号:</label>
          <input type="text" id="flightNumber" v-model="form.flightNumber" required>

          <label for="departure">出发地:</label>
          <input type="text" id="departure" v-model="form.departure" required>

          <label for="destination">目的地:</label>
          <input type="text" id="destination" v-model="form.destination" required>

          <label for="date">日期:</label>
          <input type="date" id="date" v-model="form.date" required>

          <label for="departureTime">出发时刻:</label>
          <input type="text" id="departureTime" v-model="form.departureTime" required>

          <label for="arrivalTime">到达时刻:</label>
          <input type="text" id="arrivalTime" v-model="form.arrivalTime" required>

          <label for="availableSeats">剩余座位数:</label>
          <input type="number" id="availableSeats" v-model="form.availableSeats" required>

          <label for="price">票价:</label>
          <input type="number" id="price" v-model="form.price" required>

          <label for="discountPrice">折扣票价:</label>
          <input type="number" id="discountPrice" v-model="form.discountPrice" required>

          <label for="discountRate">折扣率:</label>
          <input type="number" id="discountRate" v-model="form.discountRate" required>

          <label for="airline">航空公司:</label>
          <input type="text" id="airline" v-model="form.airline" required>

          <div class="modal-buttons">
            <button class="btn btn-submit">{{ isEditMode ? '保存' : '添加' }}</button>
            <button class="btn btn-cancel" @click="closeModal">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [],
      queryFlightNumber: '',
      queryDate: '',
      isModalVisible: false,
      isEditMode: false,
      form: {
        id: '',
        flightNumber: '',
        departure: '',
        destination: '',
        date: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: '',
        price: '',
        discountPrice: '',
        discountRate: '',
        airline: ''
      }
    };
  },
  mounted() {
    this.showTickets();
  },
  methods: {
    showTickets() {
      fetch('https://database-experiment-flask.azurewebsites.net/tickets')
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            this.tickets = data.data;
          } else {
            alert('获取机票失败');
          }
        });
    },
    queryTickets() {
      const query = {};
      if (this.queryFlightNumber) {
        query.flightNumber = this.queryFlightNumber;
      }
      if (this.queryDate) {
        query.date = this.queryDate;
      }
      fetch(`https://database-experiment-flask.azurewebsites.net/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            this.tickets = data.data;
          } else {
            alert('查询机票失败');
          }
        });
    },
    showModal() {
      this.isModalVisible = true;
      this.isEditMode = false;
      this.form = {
        id: '',
        flightNumber: '',
        departure: '',
        destination: '',
        date: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: '',
        price: '',
        discountPrice: '',
        discountRate: '',
        airline: ''
      };
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style scoped>
/* 表格样式 */
.centered-table {
  margin: 0 auto;
  border-collapse: collapse;
  /* 合并边框 */
  width: 100%;
}

.centered-table th,
.centered-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.centered-table th {
  background-color: #f2f2f2;
}

.centered-table tr:hover {
  background-color: #f5f5f5;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  margin-right: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-search {
  background-color: #42b3f5;
  color: #fff;
  margin-right: 5px;
}

.btn-edit {
  background-color: #f5b942;
  color: #fff;
  margin-right: 5px;
}

.btn-delete {
  background-color: #f55f5f;
  color: #fff;
}

.btn-add {
  background-color: #42b3f5;
  color: #fff;
  margin-bottom: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.modal h2 {
  text-align: center;
  margin-bottom: 20px;
}

.modal label {
  display: block;
  margin-bottom: 5px;
}

.modal input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-submit {
  background-color: #42b3f5;
  color: #fff;
  margin-right: 5px;
}

.btn-cancel {
  background-color: #ccc;
  color: #000;
}

.centered-table {
  margin: 0 auto;
  /* 将表格水平居中 */
}
</style>
