<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { UserAPI } from '@/api/UserAPI';
import { RolesEnum, IUser } from '@/models/IUser';
import { defineComponent, reactive, ref } from 'vue';

import { LikeOutlined } from '@ant-design/icons-vue';
import { useFetching } from '@/hooks/useFetching';
import UserSettingForm from '@/components/UserSettingForm.vue';
import dayjs from 'dayjs';




export default defineComponent({
    data: () => ({
        RolesEnum,
    }),
    setup: () => {
        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);

        const authStore = useAuthStore();
        const { authUser } = storeToRefs(authStore);
        const changeUser = ref<IUser>({
        } as IUser);
        const {
            fetchData: getUsersInfo,
            response: selectedUser,
            isLoading,
            message,
        } = useFetching(async () => {
            var user = await UserAPI.getUser(authUser.value.id);
            changeUser.value = JSON.parse(JSON.stringify(user));
            changeUser.value.doB = dayjs(changeUser.value.doB ? new Date(user.doB) : new Date());
            
            return user;
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

        return {
            changeRef,
            isChangeModal,
            getUsersInfo,
            layout,
            validateMessages,
            changeUser,
            authUser,
            selectedUser,
            isLoading,
            message,
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
        updateFinalAction() {
            this.getUsersInfo();
        }
    },
    components: { LikeOutlined, UserSettingForm },
});
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
<template>
    <div>
        <h1 class="text-center">Settings page</h1>
        <div>
            <response-alert :message="message" :isLoading="isLoading" />
            <a-space size="middle">
                <a-space direction="vertical" size="middle">
                    <div class="space-align-container">
                        <div class="space-align-block">
                            <a-space align="start">
                                <img class="settingImage" :width="200" :src="selectedUser?.img" />
                                <div class="personInfo">
                                <a-descriptions
                                    title="Master Info"
                                    bordered="true"
                                >
                                    <a-descriptions-item label="Name" :span="3"
                                        >{{
                                            selectedUser?.name
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Surname"
                                        :span="3"
                                        >{{
                                            selectedUser?.surname
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Gender"
                                        :span="3"
                                        >{{
                                            selectedUser?.gender
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item label="Date of birth" :span="3"
                                        >{{
                                            selectedUser?.doB ? new Date(selectedUser?.doB).toLocaleDateString("ru-RU") : ""
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Company"
                                        :span="3"
                                        >{{
                                            selectedUser?.company?.companyName
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Email"
                                        :span="3"
                                        >{{
                                            selectedUser?.login
                                        }}</a-descriptions-item
                                    >
                                </a-descriptions>
                                </div>
                            </a-space>
                        </div>
                    </div>
                    <a-row v-if="authUser.role === RolesEnum.MASTER">
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
    <UserSettingForm
        v-model:show="isChangeModal"
        @finalAction="updateFinalAction"
        :editUser="changeUser"
        
        v-createModal="{ show: isChangeModal }"
    />
</template>
<style scoped></style>
