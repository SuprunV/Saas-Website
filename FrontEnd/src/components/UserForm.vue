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
                <response-alert :message="AddUserMessage" :isLoading="isAddingUserLoading" />
            <response-alert :message="UpdateUserMessage" :isLoading="isUpdateUserLoading" />
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
                           v-if="( changedUserId == undefined)" :rules="[ {  required: true }]"
                            name="login"
                            label="Login"
                        >
                            <a-input v-model:value="formState.login" />
                        </a-form-item>
                        
                        <a-form-item
                            v-if="( changedUserId != undefined)" :rules="[ {  required: false }]"
                            name="login"
                            label="Login">
                            <a >{{
                                formState.login
                            }}</a>
                        </a-form-item>

                        <a-form-item
                            v-if="( changedUserId == undefined)" :rules="[ {  required: true }]"
                            name="password"
                            label="Password"
                        > 
                            <a-input v-model:value="formState.password" />
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
import { IMaster } from '@/models/IMaster';

export default defineComponent({
    props: {
        show: Boolean,
        changedUserId: Object as PropType<number | undefined>,
    },
    setup(props) {

        const selectedDate = ref<Dayjs>(dayjs(new Date()));
        const auth = useAuthStore();
        const {authUser} = storeToRefs(auth);
        const changeUser = ref<IUser>({ } as IUser);

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
      
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

         const {
            fetchData: updateUser,
            isLoading: isUpdateUserLoading,
            message: UpdateUserMessage,
        } = useFetching(async () => {
            console.log('update user', formState);
            const user =  await UserAPI.updateUser(formState.value.id, formState.value);
            return user;
        });

        const{ 
            fetchData: addMaster,
            isLoading: isAddingUserLoading,
            message: AddUserMessage,
             response: newMaster} 
        = useFetching(async () => {
            console.log('add master', formState);
            const newMaster:  IUser={
                id: 0, 
                name: formState.value.name,
                surname: formState.value.surname,
                gender: formState.value.gender,
                login: formState.value.login,
                password: formState.value.password,
                role: formState.value.role,
                doB: formState.value.doB,
                companyId: formState.value.companyId
            };
            await UserAPI.registerMaster(newMaster);
          
            console.log('return newService', newMaster);
            return newMaster;
        });

        const{ 
            fetchData: getUser, 
            response: selectedUser,
        } = useFetching(async () => {
            changeUser.value = JSON.parse(JSON.stringify(selectedUser));
            changeUser.value.doB = dayjs(changeUser.value.doB ? new Date(selectedUser.doB) : new Date());
        
           return  await CompanyAPI.getCompanyMasters(authUser.value.companyId);
         });


        const formState = ref<IUser>({
                id: 0,
                img: '',
                login:   '' ,
                password: '',
                name: '',
                surname: '',
                role: RolesEnum.MASTER,
                doB:  '',
                gender: GenderEnum.Male,
                companyId: authUser.value.companyId,
        });

       
        return {
            formState: formState,
            layout,
            updateUser,
            validateMessages,
            isUpdateUserLoading,
            UpdateUserMessage,
            isAddingUserLoading,
            authUser,
            selectedDate, 
            getUser, 
            selectedUser,
            changeUser,
            addMaster,
            newMaster,
            AddUserMessage

        };
    },
    watch: {
        async changedUserId(){
            console.log('data changed', this.changedUserId);
            if(this.changedUserId != undefined ){
            const userObject = await UserAPI.getUser(this.changedUserId);
            console.log('data userObject', userObject);
            
            this.formState = userObject;
            console.log('data formState', this.formState);
            }
        },
        
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            console.log('close in form', this.show);
        },
        async submitForm() {
            console.log('changedUserId', this.changedUserId);

            if(this.changedUserId != undefined){
                await this.updateUser();
            }
            else{
                await this.addMaster();
            }
          
            console.log('response', this.changedUserId, this.UpdateUserMessage);
            if (this.UpdateUserMessage.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(async () => {
                    this.$emit('update:show', false);
                    this.$emit('finalAction');
                }, 1500);
            }
            else if(this.AddUserMessage.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(async () => {
                    this.$emit('update:show', false);
                    this.$emit('finalAction');
                }, 1500);
            }
        },
    },
  
});
</script>
