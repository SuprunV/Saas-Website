import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from '@/App.vue';
import 'ant-design-vue/dist/antd.css';
import '@/styles/theme.scss';
const app = createApp(App);

app.use(Antd);

app.mount('#app');
