import { createStore } from 'vuex';
import { IUser } from '@/models/IUser';
export default createStore({
    state: () => ({
        isAuth: false,
        authUser: {} as IUser,
    }),
    getters: {},
    mutations: {
        setIsAuth(state, isAuth: boolean) {
            state.isAuth = isAuth;
        },
        setAuthUser(state, authUser: IUser) {
            state.authUser = authUser;
        },
    },
    actions: {
        logoutAction({ commit }) {
            commit('setIsAuth', false);
        },
        loginAction({ commit }) {
            commit('setIsAuth', true);
        },
    },
});
