<script lang="ts">
import UserAPI from '@/api/UserAPI';
import { useFetching } from '@/hooks/useFetching';
import { IUser } from '@/models/IUser';
import { AppRoutes } from '@/router/router';
import { useAuthStore } from '@/store/useAuth';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { defineComponent, reactive } from 'vue';

interface FormState {
    email: string;
    password: string;
}

export default defineComponent({
    watch: {},
    setup() {
        const { loginActionStore } = useAuthStore();

        const {
            isLoading,
            fetchData: loginAsync,
            message,
            response,
        } = useFetching(async (email: string, password: string) => {
            await UserAPI.login(email, password);
        });

        const formState = reactive<FormState>({
            email: '',
            password: '',
        });

        return {
            formState,
            loginAsync,
            message,
            isLoading,
            loginActionStore,
        };
    },
    methods: {
        async login(values: any) {
            const authUser = (await this.loginAsync(
                values.email,
                values.password,
            )) as IUser;
            if (this.message.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(() => {
                    this.loginActionStore(authUser);
                    this.$router.push(AppRoutes.MAIN);
                }, 3000);
            }
        },
        putDemoData() {
            this.formState.email = 'admin@myFirCom.com';
            this.formState.password = '123';
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
        @finish="login"
    >
        <response-alert :message="message" :isLoading="isLoading" />
        <a-button type="warning" @click="putDemoData">Put demo data</a-button>
        <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Please input your email!' }]"
        >
            <a-input v-model:value="formState.email" />
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

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>

<style scoped></style>
