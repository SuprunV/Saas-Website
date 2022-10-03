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
        async setCompanyPage() {
            this.isLoadingCompany = true;
            const route = useRoute();
            const router = useRouter();
            const alias = route.params['companyUrl'] as string;
            try {
                if (!alias) throw new Error('Incorrect company url!');
                this.company = await companyAPI.getCompanyByAlias(alias);
                this.message = {
                    message: 'Success!',
                    type: ResponseTypeEnum.SUCCESS,
                };
            } catch (e: any) {
                console.log(e.message, alias);
                this.company = {} as ICompany;
                this.message = {
                    message: e.message,
                    type: ResponseTypeEnum.FAIL,
                };
                router.push(AppRoutes.MAIN);
            } finally {
                this.isLoadingCompany = false;
                setTimeout(() => {
                    this.message = {
                        message: '',
                        type: ResponseTypeEnum.NONE,
                    };
                }, 3000);
            }
        },
        removeCompanyPage() {
            console.log('set removed');
            this.company = {} as ICompany;
            this.message = {
                message: '',
                type: ResponseTypeEnum.FAIL,
            };
        },
    },
});
