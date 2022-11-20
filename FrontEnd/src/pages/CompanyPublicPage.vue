<script lang="ts">
import { CompanyAPI } from '@/api/CompanyAPI';
import { useFetching } from '@/hooks/useFetching';
import { ICompany } from '@/models/ICompany';
import { AppRoutes } from '@/router/router';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import '@/styles/companyPage.scss';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';

export default defineComponent({
    setup: () => {
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const route = useRoute();

        companyStore.setCompanyPage();

        return { company, removeCompanyPage: companyStore.removeCompanyPage };
    },
});
</script>

<template>
    <div v-appearAnimation="{ timeout: 100 }">
        <div v-if="company.id">
            <div class="company-image" v-appearAnimation="{ timeout: 200 }">
                <img :src="company.img" alt="avatar" />
            </div>
            <h1 class="text-center mt-4" v-appearAnimation="{ timeout: 300 }">
                {{ company.name }}
            </h1>
            <div class="">
                <em class="text-center">HERE MUST BE DATA OF THIS COMPANY</em>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
