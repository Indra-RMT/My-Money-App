import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mymoney-a7d06.firebaseio.com/transactions.json'
});

export default instance;