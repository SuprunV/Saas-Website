import { createStore } from 'vuex';
import { IUser } from '@/models/IUser';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        authUser: {} as IUser,
    }),
    getters: {},
    actions: {
        logoutAction() {
            this.isAuth = false;
        },
        loginAction() {
            this.isAuth = true;
        },
    },
});
