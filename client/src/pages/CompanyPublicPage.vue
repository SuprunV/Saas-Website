<script lang="ts">
import { companyAPI } from '@/api/companyAPI';
import { useFetching } from '@/hooks/useFetching';
import { ICompany } from '@/models/ICompany';
import { AppRoutes } from '@/router/router';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    data: () => ({
        company: {} as ICompany,
    }),
    setup: () => {
        const route = useRoute();
        const router = useRouter();
        const alias = route.fullPath;
        const {
            fetchData,
            isLoading,
            message,
            response: company,
        } = useFetching(async () => {
            return await companyAPI.getCompanyByAlias(alias);
        });

        const getCompany = async () => {
            await fetchData();
            if (message.value.type == ResponseTypeEnum.FAIL) {
                router.push(AppRoutes.MAIN);
                return;
            }
        };
        getCompany();

        return { isLoading, message, company };
    },
});
</script>

<template>
    <div>
        <response-alert :message="message" :isLoading="isLoading" />
        <div v-if="!isLoading">
            <a-row justify="center">
                <div class="user-image">
                    <img :src="company.img" alt="avatar" />
                </div>
            </a-row>
        </div>
    </div>
</template>

<style scoped></style>
