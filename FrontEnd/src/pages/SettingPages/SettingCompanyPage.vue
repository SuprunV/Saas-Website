<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { LikeOutlined } from '@ant-design/icons-vue';
import CompanySettingForm from '@/components/CompanySettingForm.vue';
import { useFetching } from '@/hooks/useFetching';
import { CompanyAPI } from '@/api/CompanyAPI';
import { useAuthStore } from '@/store/useAuth';

export default defineComponent({
    setup: () => {
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);
        const auth = useAuthStore();
        const {authUser} = storeToRefs(auth);


        const {
            fetchData: getCompanyInfo,
            response: selectedCompany,
            isLoading,
            message,
        } = useFetching(async () => {
            return await CompanyAPI.getCompany(authUser.value.companyId);
        });
        getCompanyInfo();

        const validateMessages = {
            required: '${label} is required!',
        };
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return {
            company,
            changeRef,
            isChangeModal,
            layout,
            getCompanyInfo,
            validateMessages,
            selectedCompany,
            isLoading,
            message,
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
        updateFinalAction() {
            this.getCompanyInfo();
        }
    },
    components: {
        LikeOutlined,
        CompanySettingForm,
    },
});
</script>

<template>
    <div>
        <response-alert :message="message" :isLoading="isLoading" />
        <h1 class="text-center">Settings for Company</h1>
        <a-space size="middle">
            <a-space direction="vertical" size="middle">
                <div class="space-align-container">
                    <div class="space-align-block">
                        <a-space align="start">
                            <img class="settingImage" :width="155" :src="selectedCompany?.img" />
                            <div class="personInfo">
                            <a-descriptions
                                title="Company Info"
                                bordered="true"
                            >
                                <a-descriptions-item
                                    label="Company name"
                                    :span="3"
                                    >{{ selectedCompany?.companyName }}</a-descriptions-item
                                >
                                <a-descriptions-item label="Address" :span="3"
                                    >{{ selectedCompany?.address }}</a-descriptions-item
                                >
                            </a-descriptions>
                            </div>
                        </a-space>
                    </div>
                </div>
                <a-row>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                              <a-statistic title="Masters" :value="100" />
                        </div>
                    </a-col>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                        <a-statistic title="Services" :value="70" />
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                        <a-statistic
                            title="Income (EUR)"
                            :precision="2"
                            :value="200000"
                        />
                        </div>
                    </a-col>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                        <a-statistic
                            title="Feedback"
                            :value="556"
                        >
                            <template #suffix>
                                <like-outlined />
                            </template>
                        </a-statistic>
                        </div>
                    </a-col>
                </a-row>
                <a-button type="primary" @click="showChangeModal"
                    >Change data</a-button
                >
            </a-space>
        </a-space>
        <CompanySettingForm 
        v-model:show="isChangeModal" 
        @final="updateFinalAction"
        :editCompany="selectedCompany"/>
    </div>
</template>

<style scoped></style>
