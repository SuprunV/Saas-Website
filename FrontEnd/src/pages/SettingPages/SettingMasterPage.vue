<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { UserAPI } from '@/api/UserAPI';
import { defineComponent, reactive, ref } from 'vue';
import MasterSettingForm from '@/components/MasterSettingForm.vue';
import { LikeOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    setup: () => {
        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);

        const authStore = useAuthStore();
        const { authUser } = storeToRefs(authStore);

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const formState = reactive({
            master: {
                name: '',
                surname: '',
                age: undefined,
                email: '',
                gender: '',
                companyName: '',
            },
        });

        return {
            changeRef,
            isChangeModal,
            formState,
            layout,
            validateMessages,
            authUser,
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
    },
    components: { LikeOutlined, MasterSettingForm },
});
</script>

<template>
    <div>
        <h1 class="text-center">Settings for master</h1>
        <div>
            <a-space size="middle">
                <a-space direction="vertical" size="middle">
                    <div class="space-align-container">
                        <div class="space-align-block">
                            <a-space align="start">
                                <img class="settingImage" :width="200" :src="authUser.img" />
                                <div class="personInfo">
                                <a-descriptions
                                    title="Master Info"
                                    bordered="true"
                                >
                                    <a-descriptions-item label="Name" :span="3"
                                        >Levi</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Surname"
                                        :span="3"
                                        >Ackerman</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Gender"
                                        :span="3"
                                        >Male</a-descriptions-item
                                    >
                                    <a-descriptions-item label="Age" :span="3"
                                        >16</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Company"
                                        :span="3"
                                        >{{
                                            authUser.companyName
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Email"
                                        :span="3"
                                        >{{
                                            authUser.email
                                        }}</a-descriptions-item
                                    >
                                </a-descriptions>
                                </div>
                            </a-space>
                        </div>
                    </div>
                    <a-row>
                        <a-col :span="5">
                            <div class="settingPageStatistic"> <a-statistic title="Done work" :value="2000" /></div>
                        </a-col>
                        <a-col :span="6">
                         <div class="settingPageStatistic"> 
                            <a-statistic
                                title="Feedback"
                                :value="650">
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
        </div>
    </div>
    <MasterSettingForm
        v-model:show="isChangeModal"
        v-createModal="{ show: isChangeModal }"
    />
</template>

<style scoped></style>
