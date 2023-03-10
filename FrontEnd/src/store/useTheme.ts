import { defineStore, storeToRefs } from 'pinia';
import { useCompanyStore } from './useCompany';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isPageLoading: false,
        showModal: true,
    }),
    getters: {
        isTotalLoading() {
            const { isLoadingCompany } = storeToRefs(useCompanyStore());
            return isLoadingCompany;
        },
    },
});
