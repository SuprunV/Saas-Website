<script lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegForm from '@/components/Auth/RegForm.vue';
import RegCompanyForm from '@/components/Auth/RegCompanyForm.vue';
import { defineComponent } from 'vue';
// import '@/styles/authPage.scss';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/useAuth';

export default defineComponent({
    data: () => ({
        isRegistration: false,
    }),
    setup: () => {
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        companyStore.setCompanyPage();

        return { company, removeCompanyPage: companyStore.removeCompanyPage };
    },
    components: { LoginForm, RegForm, RegCompanyForm },
});
</script>

<template>
    <a-row justify="center">
        <a-col :span="12">
            <div v-if="company.id">
                <div class="company-image company-image-sm">
                    <img :src="company.img" alt="avatar" />
                </div>
            </div>
            <div v-if="!isRegistration">
                <h4 class="text-center mb-4">
                    <span v-if="company.id">
                        Authorization to {{ company.name }}
                    </span>
                    <span v-else> Authorization to system! </span>
                </h4>
                <LoginForm :alias="company.alias" />
            </div>
            <div v-else>
                <h4 class="text-center mb-4">
                    <span v-if="company.id">
                        Register account in {{ company.name }}
                    </span>
                    <span v-else> Registration for your company</span>
                </h4>
                <div v-if="company.alias">
                    <RegCompanyForm :alias="company.alias" />
                </div>
                <div v-else>
                    <div v-if="company.alias">
                        <RegForm :alias="company.alias" />
                    </div>
                    <div v-else>
                        <RegForm />
                    </div>
                </div>
            </div>

            <a-row justify="end">
                <a-switch
                    v-model:checked="isRegistration"
                    checked-children="Registration"
                    un-checked-children="Authorization"
                />
            </a-row>
        </a-col>
    </a-row>
</template>

<style scoped></style>
