import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios';
import echarts from './utils/echarts';
import Antd from 'ant-design-vue';
import router from "./routes/index";
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts;
app.use(Antd).use(router).mount('#app')
