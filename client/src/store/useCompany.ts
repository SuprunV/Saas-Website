import { companyAPI } from '@/api/companyAPI';
import { useFetching } from '@/hooks/useFetching';
import { ICompany } from '@/models/ICompany';
import { AppRoutes } from '@/router/router';
import { IFetchResponse, ResponseTypeEnum } from '@/types/FetchResponse';
import { defineStore, storeToRefs } from 'pinia';
import { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useThemeStore } from './useTheme';

// store for one company, on what page user is.
export const useCompanyStore = defineStore('company', {
    state: () => ({
        company: {} as ICompany,
        isLoadingCompany: false as Boolean,
        message: {} as IFetchResponse,
    }),
    actions: {
        async setCompanyPage(alias: string) {
            const { isPageLoading } = storeToRefs(useThemeStore());
            try {
                isPageLoading.value = true;
                this.isLoadingCompany = true;
                this.company = await companyAPI.getCompanyByAlias(alias);
                this.message = {
                    message: 'Success!',
                    type: ResponseTypeEnum.SUCCESS,
                };
            } catch (e: any) {
                this.company = {} as ICompany;
                this.message = {
                    message: e.message,
                    type: ResponseTypeEnum.FAIL,
                };
            } finally {
                this.isLoadingCompany = false;
                isPageLoading.value = false;
                setTimeout(() => {
                    this.message = {
                        message: '',
                        type: ResponseTypeEnum.NONE,
                    };
                }, 3000);
            }
        },
    },
});
