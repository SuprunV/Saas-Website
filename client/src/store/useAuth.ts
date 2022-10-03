import { createStore } from 'vuex';
import { IUser, RolesEnum } from '@/models/IUser';
import { defineStore } from 'pinia';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';
import {
    clientRoutes,
    companyRoutes,
    IRoute,
    masterRoutes,
    publicRoutes,
} from '@/router/router';
import { useRouter, useRoute } from 'vue-router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        authUser: {} as IUser,
        accessRoutes: [] as IRoute[],
        redirectRoute: {} as IRoute,
        menuRoutes: [] as IRoute[],
    }),
    getters: {},
    actions: {
        logoutActionStore() {
            this.authUser = {} as IUser;
            this.isAuth = false;
            this.setRoutes();
        },
        loginActionStore(user: IUser) {
            this.authUser = user;
            this.isAuth = true;
            this.setRoutes();
        },
        checkLoginStore() {
            // In future here must be create async request to BE to check, if this user is correct.
            const json = localStorage.getItem(LocalStorageItemEnum.userJson);
            if (json) {
                const userData = JSON.parse(json);
                this.isAuth = true;
                this.authUser = userData;
                this.setRoutes();
            }
        },
        setRoutes() {
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
            if (routesToSet.length && this.authUser.companyAlias) {
                for (let i = 0; i < routesToSet.length; i++) {
                    var newPath: string = routesToSet[i].path;
                    newPath = newPath.replace(
                        ':companyAlias',
                        this.authUser.companyAlias,
                    );
                    routesToSet[i].path = newPath;
                }
            }
            this.redirectRoute = routesToSet[0];
            this.accessRoutes = routesToSet;
            this.menuRoutes = [];
            this.accessRoutes.forEach((r) => {
                if (r.label) this.menuRoutes.push(r);
            });
        },
        hasAccess() {
            const route = useRoute();
            const router = useRouter();
            const path = route.path;

            const pathExists = this.accessRoutes.filter((route) => {
                const okayPath = route.path === path;
                var isAuth = false;
                if (!this.authUser.companyAlias) {
                    isAuth = !!path.includes('auth');
                }
                return okayPath || isAuth;
            });

            if (!pathExists.length) {
                router.push(this.redirectRoute.path);
            }
        },
    },
});
