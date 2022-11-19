<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { validWord } from '@/services/validWord';
import { useFetching } from '@/hooks/useFetching';
import axios from 'axios';
import { UserAPI } from '@/api/UserAPI';
import { useAuthStore } from '@/store/useAuth';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { storeToRefs } from 'pinia';
import { IRegCompanyForm } from '@/models/ICompany';

export default defineComponent({
    setup() {
        const auth = useAuthStore();
        const { authUser } = storeToRefs(auth);

        const {
            isLoading,
            fetchData: regAsync,
            message,
            response: userToken,
        } = useFetching(async (formState) => {
            const user = await UserAPI.registeCompany(formState);
            return user;
        });

        const formState = reactive<IRegCompanyForm>({
            companyName: '',
            companyAlias: '',
            username: '',
            password: '',
        });

        return {
            formState,
            regAsync,
            message,
            isLoading,
            authUser,
            userToken,
            loginActionStore: auth.loginActionStore,
        };
    },
    methods: {
        async onFinish(values: any) {
            await this.regAsync(this.formState);
            console.log('response', this.userToken, this.message);
            if (this.message.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(() => {
                    this.loginActionStore(this.userToken);
                    this.$router.push(`/${this.authUser.companyAlias}`);
                }, 3000);
            }
        },
    },
});
</script>

<template>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
    >
        <response-alert :message="message" :isLoading="isLoading" />
        <a-form-item
            label="Company Name"
            name="companyName"
            :rules="[
                {
                    required: true,
                    message: 'Please input name of your company!',
                },
            ]"
        >
            <a-input v-model:value="formState.companyName" />
        </a-form-item>
        <a-form-item
            label="Company Alias (url)"
            name="companyAlias"
            :rules="[
                {
                    required: true,
                    message: 'Please input name of your company!',
                },
            ]"
        >
            <a-input v-model:value="formState.companyAlias" />
        </a-form-item>

        <a-form-item
            label="Username"
            name="username"
            :rules="[
                { required: true, message: 'Please input your username!' },
            ]"
        >
            <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
            label="Password"
            name="password"
            :rules="[
                { required: true, message: 'Please input your password!' },
            ]"
        >
            <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-row type="flex" justify="end">
            <a-form-item>
                <a-button type="primary" size="large" html-type="submit"
                    >Submit</a-button
                >
            </a-form-item>
        </a-row>
    </a-form>
</template>

<style scoped></style>
