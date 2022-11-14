<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { LikeOutlined } from '@ant-design/icons-vue';
import CompanySettingForm from '@/components/CompanySettingForm.vue';

export default defineComponent({
    setup: () => {
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);

        const validateMessages = {
            required: '${label} is required!',
        };
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const formState = reactive({
            company: {
                companyName: '',
                address: '',
            },
        });
        return {
            company,
            changeRef,
            isChangeModal,
            formState,
            layout,
            validateMessages,
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
    },
    components: {
        LikeOutlined,
        CompanySettingForm,
    },
});
</script>

<template>
    <div>
        <h1 class="text-center">Settings for Company</h1>
        <a-space size="middle">
            <a-space direction="vertical" size="middle">
                <div class="space-align-container">
                    <div class="space-align-block">
                        <a-space align="start">
                            <img class="settingImage" :width="155" :src="company.img" />
                            <div class="personInfo">
                            <a-descriptions
                                title="Company Info"
                                bordered="true"
                            >
                                <a-descriptions-item
                                    label="Company name"
                                    :span="3"
                                    >{{ company.name }}</a-descriptions-item
                                >
                                <a-descriptions-item label="Address" :span="3"
                                    >Liivalaia 7</a-descriptions-item
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
        <CompanySettingForm v-model:show="isChangeModal" />
    </div>
</template>

<style scoped></style>
