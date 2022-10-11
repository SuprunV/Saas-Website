import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from '@/App.vue';
import 'ant-design-vue/dist/antd.css';
import '@/styles/theme.scss';
import router from '@/router/router';
import directives from './directives';
import { createPinia } from 'pinia';
import components from '@/components/UI';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const app = createApp(App);

components.forEach((component) => app.component(component.name, component));

directives.forEach((direcitve: any) => {
    app.directive(direcitve.name, direcitve);
});

app.use(createPinia());

app.use(Antd);
app.use(router);

app.component('DataTable', DataTable);
app.component('Column', Column);

app.mount('#app');
