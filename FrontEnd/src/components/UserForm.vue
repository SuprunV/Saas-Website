<template>
    <div class="">
        <div v-createModal="{ show: show }">
            <div class="main-cart">
                <a-form
                    :model="formState"
                    v-bind="layout"
                    name="nest-messages"
                    :validate-messages="validateMessages"
                    @finish="submitForm"
                >
                <response-alert :message="message" :isLoading="isLoading" />
                    <div class="ant-modal-body">
                        <a-form-item
                            name="name"
                            label="Name"
                            :rules="[{ required: true }]"
                        >
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item
                            name="surname"
                            label="Surname"
                            :rules="[{ required: true }]"
                        >
                            <a-input v-model:value="formState.surname" />
                        </a-form-item>
                        <a-form-item
                            name="gender"
                            label="Gender"
                            has-feedback
                            :rules="[{ required: false, message: 'Gender' }]"
                        >
                            <a-select
                                v-model:value="formState.gender"
                                placeholder="Please select gender"
                            >
                                <a-select-option value="Male"
                                    >Male</a-select-option
                                >
                                <a-select-option value="Female"
                                    >Female</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            name="doB"
                            label="Date of birth"
                            :rules="[{ required: false }]"
                        >
                            <a-date-picker v-model:value="formState.doB" />
                        </a-form-item>
                        <a-form-item
                            name="email"
                            label="Email"
                            :rules="[{ type: 'email' }]"
                        >
                            <a-input v-model:value="formState.login" />
                        </a-form-item>
                    </div>
                    <div class="ant-modal-footer">
                        <button
                            class="ant-btn ant-btn-danger"
                            type="button"
                            @click="close"
                        >
                            <span>Cancel</span></button
                        ><a-button
                            class="ant-btn btn-success"
                            html-type="submit"
                        >
                            <span>OK</span>
                        </a-button>
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserAPI } from '@/api/UserAPI';
import { useFetching } from '@/hooks/useFetching';
import { GenderEnum, IUser, RolesEnum } from '@/models/IUser';
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive, ref } from 'vue';
import { PropType } from 'vue-types/dist/types';
import dayjs, { Dayjs } from 'dayjs';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { CompanyAPI } from '@/api/CompanyAPI';

export default defineComponent({
    props: {
        show: Boolean,
        changedUserId: Object as PropType<number | undefined>
    },
    setup(props) {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const selectedDate = ref<Dayjs>(dayjs(new Date()));

        const auth = useAuthStore();
        const {authUser} = storeToRefs(auth);


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

   

        const formState = ref<IUser>({
                id: authUser.value.id,
                img: "",
                login: "",
                password: "",
                name: "",
                surname: "",
                role: RolesEnum.MASTER,
                doB: "",
                gender: GenderEnum.Male,
                companyId: authUser.value.companyId,
        });

        const {fetchData: updateUser,
            isLoading,
            message
        } = useFetching(async () => {
            console.log('update user', formState);
          
            return await UserAPI.updateUser(formState.value.id, formState.value);
       });

       const{ fetchData: getUser, 
            response: selectedUser,
        } = useFetching(async () => {
            await CompanyAPI.getCompanyMasters(authUser.value.companyId);
            })

        return {
            formState: formState,
            layout,
            updateUser,
            validateMessages,
            isLoading,
            message,
            authUser,
            selectedDate, 
            getUser, 
            selectedUser
        };
    },
    watch: {
        async changedUserId(){
            console.log('data changed', this.changedUserId);
            if(this.changedUserId != undefined){
            const userObject = await UserAPI.getUser(this.changedUserId);
            console.log('data changed', userObject);

            this.formState = userObject;
            }
        },
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            console.log('close in form', this.show);
        },
        async submitForm() {
            await this.updateUser();
            console.log('response', this.changedUserId, this.message);
            if (this.message.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(async () => {
                    this.$emit('update:show', false);
                    this.$emit('finalAction');
                }, 1500);
            }
        },
    },
  
});
</script>
