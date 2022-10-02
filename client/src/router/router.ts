import { DefineComponent } from 'vue';
import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

export enum AppRoutes {
    MAIN = '/',
    AUTH = '/auth',
}

const routes: { path: AppRoutes; component: any }[] = [
    { path: AppRoutes.MAIN, component: MainPage },  
    { path: AppRoutes.AUTH, component: AuthPage },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
