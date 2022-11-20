<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive, ref } from 'vue';
import { UserAPI } from '@/api/UserAPI';
import { IUser, RolesEnum } from '@/models/IUser';
import ClientSettingForm from '@/components/ClientSettingForm.vue';
import { ContactsOutlined } from '@ant-design/icons-vue';
import { useFetching } from '@/hooks/useFetching';

export default defineComponent({
    setup: () => {
        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);

        const authStore = useAuthStore();
        const { authUser } = storeToRefs(authStore);

        const {
            fetchData: getUsersInfo,
            response: selectedUser,
            isLoading,
            message,
        } = useFetching(async () => {
            return await UserAPI.getUser(authUser.value.id);
        });
        getUsersInfo();
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
            user: {
                name: '',
                surname: '',
                age: undefined,
                email: '',
                gender: '',
            },
        });

        return {
            changeRef,
            isChangeModal,
            formState,
            layout,
            validateMessages,
            message,
            isLoading,
            authUser,
            selectedUser,
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
    },
    components: { ClientSettingForm },
});
</script>

<template>
    <div>
        <h1 class="text-center">Settings for Client</h1>
        <div>
            <response-alert :message="message" :isLoading="isLoading" />
            <a-space size="middle">
                <a-space direction="vertical" size="middle">
                    <div class="space-align-container">
                        <div class="space-align-block">
                            <a-space align="start">
                                <img
                                    class="settingImage"
                                    :width="200"
                                    :src="selectedUser?.img"
                                />
                                <div class="personInfo">
                                    <a-descriptions
                                        title="Client Info"
                                        bordered="true"
                                    >
                                        <a-descriptions-item
                                            label="Name"
                                            :span="3"
                                            >{{
                                                selectedUser?.name
                                            }}</a-descriptions-item
                                        >
                                        <a-descriptions-item
                                            label="Surname"
                                            :span="3"
                                            >Yeager</a-descriptions-item
                                        >
                                        <a-descriptions-item
                                            label="Gender"
                                            :span="3"
                                            >Male</a-descriptions-item
                                        >
                                        <a-descriptions-item
                                            label="Age"
                                            :span="3"
                                            >15</a-descriptions-item
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
                    <a-button type="primary" @click="showChangeModal"
                        >Change data</a-button
                    >
                </a-space>
            </a-space>
            <ClientSettingForm v-model:show="isChangeModal" />
        </div>
    </div>
</template>

<style scoped></style>
