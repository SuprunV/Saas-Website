import { DefineComponent } from 'vue';
import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import CompanyPublicPage from '@/pages/CompanyPublicPage.vue';
import SettingPage from '@/pages/SettingPages/SettingPage.vue';
import CalendarPage from '@/pages/CalendarPages/CalendarPage.vue';
import ManagementPage from '@/pages/ManagementPage.vue';
import ServicesPage from '@/pages/ServicesPage.vue';
import {
    HomeOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons-vue';
import { createRouter, createWebHistory } from 'vue-router';
import { IconsEnum } from '@/types/Theme';

export enum AppRoutes {
    MAIN = '/',
    AUTH = '/auth',
    COMPANY_PAGE = '/:companyAlias',
    COMPANY_PAGE_AUTH = '/:companyAlias/auth',
    COMPANY_PAGE_SETTINGS = '/:companyAlias/settings',
    COMPANY_PAGE_CALENDAR = '/:companyAlias/calendar',
    COMPANY_PAGE_MANAGEMENT = '/:companyAlias/management',
    COMPANY_PAGE_SERVICES = '/:companyAlias/services'
}

export interface IRoute {
    path: AppRoutes | string;
    component: any;
    label?: string;
    icon?: IconsEnum;
}

export const publicRoutes: IRoute[] = [
    { path: AppRoutes.MAIN, component: MainPage, label: 'Main page' },
    { path: AppRoutes.AUTH, component: AuthPage, label: 'Authorization' },
    { path: AppRoutes.COMPANY_PAGE, component: CompanyPublicPage },
    { path: AppRoutes.COMPANY_PAGE_AUTH, component: AuthPage },
];

export const clientRoutes: IRoute[] = [
    {
        path: AppRoutes.COMPANY_PAGE,
        component: CompanyPublicPage,
        label: 'Main page',
        icon: IconsEnum.HomeOutlined,
    },
    {
        path: AppRoutes.COMPANY_PAGE_SETTINGS,
        component: SettingPage,
        label: 'Setting page',
        icon: IconsEnum.SettingOutlined,
    },
    {
        path: AppRoutes.COMPANY_PAGE_CALENDAR,
        component: CalendarPage,
        label: 'Calendar',
        icon: IconsEnum.FieldTimeOutlined,
    },
    {
        path: AppRoutes.COMPANY_PAGE_SERVICES,
        component: ServicesPage,
        label: 'Book service',
        icon: IconsEnum.FieldTimeOutlined,
    }
];

export const masterRoutes: IRoute[] = [
    {
        path: AppRoutes.COMPANY_PAGE,
        component: CompanyPublicPage,
        label: 'Main page',
        icon: IconsEnum.HomeOutlined,
    },
    {
        path: AppRoutes.COMPANY_PAGE_SETTINGS,
        component: SettingPage,
        label: 'Setting page',
        icon: IconsEnum.SettingOutlined,
    },
    {
        path: AppRoutes.COMPANY_PAGE_CALENDAR,
        component: CalendarPage,
        label: 'Calendar',
        icon: IconsEnum.FieldTimeOutlined,
    },
];

export const companyRoutes: IRoute[] = [
    { path: AppRoutes.COMPANY_PAGE, component: CompanyPublicPage },
    {
        path: AppRoutes.COMPANY_PAGE_SETTINGS,
        component: SettingPage,
        label: 'Setting page',
        icon: IconsEnum.SettingOutlined,
    },
    {
        path: AppRoutes.COMPANY_PAGE_MANAGEMENT,
        component: ManagementPage,
        label: 'Management page',
        icon: IconsEnum.SettingOutlined,
    },
];

const routes = [
    ...publicRoutes,
    ...clientRoutes,
    ...masterRoutes,
    ...companyRoutes,
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
