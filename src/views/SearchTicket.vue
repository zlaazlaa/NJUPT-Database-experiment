<template>
  <div>
    <h1>根据航班号和日期查询</h1>
    <form @submit.prevent="queryData">
      <label for="flightNumber">航班号:</label>
      <input type="number" id="flightNumber" v-model="flightNumber" />
      <label for="date">日期:</label>
      <input type="number" id="date" v-model="date" />
      <button type="submit">查询</button>
    </form>
    <table v-if="tickets.length > 0">
      <thead>
        <tr>
          <th>自动递增id</th>
          <th>航班号</th>
          <th>起点</th>
          <th>终点</th>
          <th>日期</th>
          <th>起飞时刻</th>
          <th>到达时刻</th>
          <th>剩余座位数</th>
          <th>票价</th>
          <th>折扣票价</th>
          <th>折扣率</th>
          <th>航班所属航空公司</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
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
    <p v-else>没有找到数据。</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      flightNumber: '',
      date: '',
      tickets: [],
      errorMessage: ''
    };
  },
  methods: {
    async queryData() {
      try {
        // 创建一个FormData对象，用于存储表单数据
        let formData = new FormData();
        // 将表单数据添加到FormData对象中
        formData.append('flightNumber', this.flightNumber);
        formData.append('date', this.date);
        // 发送POST请求，将FormData对象作为请求体
        const response = await axios.post('https://database-experiment-flask.azurewebsites.net/queryby', formData);
        this.tickets = response.data.data;
        this.errorMessage = '';
      } catch (error) {
        this.tickets = [];
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      }
    }
  }
};
</script>

<style scoped>

table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

</style>

