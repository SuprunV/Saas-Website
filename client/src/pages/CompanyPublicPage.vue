<script lang="ts">
import { companyAPI } from '@/api/companyAPI';
import { useFetching } from '@/hooks/useFetching';
import { ICompany } from '@/models/ICompany';
import { AppRoutes } from '@/router/router';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@/styles/companyPage.scss';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';

export default defineComponent({
    setup: () => {
        const companyStore = useCompanyStore();
        const {
            isLoadingCompany: isLoading,
            company,
            message,
        } = storeToRefs(companyStore);

        return { isLoading, message, company };
    },
});
</script>

<template>
    <div>
        <response-alert
            :message="message"
            :loadingOnly="true"
            :isLoading="isLoading"
        />
        <div v-if="company.id">
            <div class="company-image">
                <img :src="company.img" alt="avatar" />
            </div>
            <h1 class="text-center mt-4">{{ company.name }}</h1>
            <div class="">
                <em class="text-center">HERE MUST BE DATA OF THIS COMPANY</em>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
