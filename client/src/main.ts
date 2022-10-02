import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from '@/App.vue';
import 'ant-design-vue/dist/antd.css';
import '@/styles/theme.scss';
import router from '@/router/router';
import directives from './directives';
import { createPinia } from 'pinia';
import components from '@/components/UI';

const app = createApp(App);

components.forEach((component) => app.component(component.name, component));

directives.forEach((direcitve: any) => {
    app.directive(direcitve.name, direcitve);
});

app.use(createPinia());

app.use(Antd);
app.use(router);

app.mount('#app');
