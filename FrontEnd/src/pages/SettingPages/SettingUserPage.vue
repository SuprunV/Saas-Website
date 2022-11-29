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

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';


function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}


export default defineComponent({
    data: () => ({
        RolesEnum,
    }),
    setup: () => {

        const fileList = ref([]);
    const loadingPhoto = ref<boolean>(false);
    const imageUrl = ref<string>('');

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        loadingPhoto.value = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
          loadingPhoto.value = false;
        });
      }
      if (info.file.status === 'error') {
        loadingPhoto.value = false;
        message.value.message = ('upload error');
      }
    };

    const beforeUpload = (file: UploadProps['fileList'][number]) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.value.message = 'You can only upload JPG file!';
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.value.message = ('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };



 






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
    components: { LikeOutlined, UserSettingForm, LoadingOutlined,PlusOutlined, },
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
                                <a-upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loadingPhoto"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
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
