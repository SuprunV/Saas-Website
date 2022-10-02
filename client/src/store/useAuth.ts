import { createStore } from 'vuex';
import { IUser } from '@/models/IUser';
import { defineStore } from 'pinia';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        authUser: {} as IUser,
    }),
    getters: {},
    actions: {
        logoutActionStore() {
            this.authUser = {} as IUser;
            this.isAuth = false;
        },
        loginActionStore(user: IUser) {
            this.authUser = user;
            this.isAuth = true;
        },
        checkLoginStore() {
            // In future here must be create async request to BE to check, if this user is correct.
            const json = localStorage.getItem(LocalStorageItemEnum.userJson);
            if (json) {
                const userData = JSON.parse(json);
                this.isAuth = true;
                this.authUser = userData;
            }
        },
    },
});
