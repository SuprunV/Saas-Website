import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from '@/App.vue';
import 'ant-design-vue/dist/antd.css';
import '@/styles/theme.scss';
import store from '@/store';
import router from '@/router/router';
import directives from './directives';

const app = createApp(App);

directives.forEach((direcitve: any) => {
    console.log(direcitve);
    app.directive(direcitve.name, direcitve);
});

app.use(Antd);

app.use(store);
app.use(router);

app.mount('#app');
