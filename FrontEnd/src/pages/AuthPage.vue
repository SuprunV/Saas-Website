<script lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegCompanyForm from '@/components/Auth/RegCompanyForm.vue';
import RegClientForm from '@/components/Auth/RegClientForm.vue';
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
    components: { LoginForm, RegCompanyForm, RegClientForm },
});
</script>

<template>
    <a-row justify="center" class="y-centered">
        <a-col :span="16">
            <div class="main-cart" v-appearAnimation="{ timeout: 100 }">
                <a-row justify="end">
                    <a-switch
                        v-model:checked="isRegistration"
                        checked-children="Registration"
                        un-checked-children="Authorization"
                    />
                </a-row>
                <div v-if="company.id">
                    <div class="company-image company-image-sm">
                        <img :src="company.img" alt="avatar" />
                    </div>
                </div>
                <div
                    v-if="!isRegistration"
                    v-appearAnimation="{ timeout: 200 }"
                >
                    <h4 class="text-center mb-4">
                        <span v-if="company.id">
                            Authorization to {{ company.companyName }}
                        </span>
                        <span v-else> Authorization to system! </span>
                    </h4>
                    <LoginForm :alias="company.companyAlias" />
                </div>
                <div v-else v-appearAnimation="{ timeout: 200 }">
                    <h4 class="text-center mb-4">
                        <span v-if="company.id">
                            Register account in {{ company.companyName }}
                        </span>
                        <span v-else> Registration for your company</span>
                    </h4>
                    <div v-if="company.companyAlias">
                        <RegClientForm :alias="company.companyAlias" />
                    </div>
                    <div v-else>
                        <div v-if="company.companyAlias">
                            <RegCompanyForm :alias="company.companyAlias" />
                        </div>
                        <div v-else>
                            <RegCompanyForm />
                        </div>
                    </div>
                </div>
            </div>
        </a-col>
    </a-row>
</template>

<style scoped></style>
