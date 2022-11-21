import { createStore } from 'vuex';
import { IUserToken, RolesEnum } from '@/models/IUser';
import { defineStore } from 'pinia';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';
import jwt_decode from 'jwt-decode';
import {
    clientRoutes,
    companyRoutes,
    IRoute,
    masterRoutes,
    publicRoutes,
} from '@/router/router';
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

export interface IAuth {
    token: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        authUser: {} as IUserToken,
        accessRoutes: [] as IRoute[],
        redirectRoute: {} as IRoute,
        menuRoutes: [] as IRoute[],
    }),
    getters: {},
    actions: {
        logoutActionStore() {
            this.authUser = {} as IUserToken;
            this.isAuth = false;
        },
        loginActionStore(auth: IAuth) {
            const user = jwt_decode<IUserToken>(auth.token);
            this.authUser = user;
            // console.log('authUser', this.authUser);
            this.isAuth = true;
        },
        async checkLoginStore() {
            // In future here must be create async request to BE to check, if this user is correct.
            const token = localStorage.getItem(LocalStorageItemEnum.token);
            if (token) {
                this.authUser = jwt_decode<IUserToken>(token);
                this.isAuth = true;
            }
        },
        async setRoutes(path: string) {
            var routesToSet = [];
            switch (this.authUser.role) {
                case RolesEnum.COMPANY:
                    routesToSet = companyRoutes;
                    break;
                case RolesEnum.CLIENT:
                    routesToSet = clientRoutes;
                    break;
                case RolesEnum.MASTER:
                    routesToSet = masterRoutes;
                    break;
                default:
                    routesToSet = publicRoutes;
                    break;
            }
            for (let i = 0; i < routesToSet.length; i++) {
                var newPath: string = routesToSet[i].path;
                newPath = newPath.replace(':companyAlias', path);
                routesToSet[i].path = newPath;
            }
            this.redirectRoute = routesToSet[0];
            this.accessRoutes = routesToSet;
            console.log('accessRoutes for ', path, 'is', this.accessRoutes);
            this.menuRoutes = this.accessRoutes.filter((r) => r.label);
        },
        async hasAccess(path: string, router: any) {
            const pathExists = this.accessRoutes.filter((route) => {
                const okayPath = route.path === path;
                var isAuth = false;
                if (!this.authUser.companyAlias) {
                    isAuth = !!path?.includes('auth');
                }
                return okayPath || isAuth;
            });

            if (!pathExists.length && this.redirectRoute.path) {
                // console.log(
                //     'FROM ',
                //     path,
                //     ' REDIRECT TO ',
                //     this.redirectRoute.path,
                // );
                router.push(this.redirectRoute.path);
            }
        },
    },
});
