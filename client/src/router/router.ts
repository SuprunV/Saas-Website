import { DefineComponent } from 'vue';
import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import CompanyPublicPage from '@/pages/CompanyPublicPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

export enum AppRoutes {
    MAIN = '/',
    AUTH = '/auth',
    COMPANY_PAGE = '/:companyUrl',
    COMPANY_PAGE_AUTH = '/:companyUrl/auth',
}

const routes: { path: AppRoutes; component: any }[] = [
    { path: AppRoutes.MAIN, component: MainPage },
    { path: AppRoutes.AUTH, component: AuthPage },
    { path: AppRoutes.COMPANY_PAGE, component: CompanyPublicPage },
    { path: AppRoutes.COMPANY_PAGE_AUTH, component: AuthPage },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
