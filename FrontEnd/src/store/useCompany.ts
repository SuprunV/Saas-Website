import { CompanyAPI } from '@/api/CompanyAPI';
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
        async setCompanyPage(alias: string = '') {
            const route = useRoute();
            alias = alias ? alias : (route.params['companyAlias'] as string);
            console.log(
                'companyAlias in store',
                this.company.companyAlias,
                alias,
            );

            if (this.company.companyAlias !== alias) {
                const router = useRouter();
                this.isLoadingCompany = true;

                try {
                    if (!alias) throw new Error('Incorrect company url!');
                    this.company = await CompanyAPI.getCompanyByAlias(alias);
                    this.message = {
                        message: 'Success!',
                        type: ResponseTypeEnum.SUCCESS,
                    };
                } catch (e: any) {
                    console.log('MESSAGE', e.message, alias);
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
            }
        },

        removeCompanyPage() {
            this.company = {} as ICompany;
            this.message = {
                message: '',
                type: ResponseTypeEnum.FAIL,
            };
        },
    },
});
