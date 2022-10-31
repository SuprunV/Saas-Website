<script lang="ts">
import { companyAPI } from '@/api/companyAPI';
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

        companyStore.setCompanyPage();

        return { company, removeCompanyPage: companyStore.removeCompanyPage };
    },
});
</script>

<template>
    <div v-appearAnimation="{ timeout: 100 }">
        <div class="serviceslist">list of services</div>
        
    </div>
</template>

<style scoped></style>
