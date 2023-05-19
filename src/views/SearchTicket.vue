<template>
    <div id="app">
      <h1>航班查询</h1>
      <form @submit.prevent="queryByFlightNumberAndTime">
        <label for="flight_number">航班号:</label>
        <input id="flight_number" v-model="flight_number" type="text" required>
        <label for="time">时间:</label>
        <input id="time" v-model="time" type="text" required>
        <button type="submit">查询</button>
      </form>
      <div v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-else-if="tickets.length > 0">
        <table>
          <thead>
            <tr>
              <th>航班号</th>
              <th>起点</th>
              <th>终点</th>
              <th>起飞时刻</th>
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
      </div>
    </div>
  </template>
  
  <script>
  
  import axios from 'axios';
  
  export default {
    name: 'App',
    data() {
      return {
        flight_number: '',
        time: '',
        tickets: [],
        errorMessage: ''
      }
    },
    methods: {
      async queryByFlightNumberAndTime() {
        // GET request using axios with async/await
        try {
          const response = await axios.get('https://database-experiment-flask.azurewebsites.net/query-by-flight-number-and-time?flight_number=${this.flight_number}&time=${this.time}');
          this.tickets = response.data.data;
          this.errorMessage = '';
        } catch (error) {
          this.tickets = [];
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        }
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  
  