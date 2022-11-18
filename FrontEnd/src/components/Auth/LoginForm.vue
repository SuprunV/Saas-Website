<script lang="ts">
import { UserAPI } from '@/api/UserAPI';
import { useFetching } from '@/hooks/useFetching';
import { IUser, RolesEnum } from '@/models/IUser';
import { AppRoutes } from '@/router/router';
import { useAuthStore } from '@/store/useAuth';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { defineComponent, reactive } from 'vue';

interface FormState {
    email: string;
    password: string;
}

export default defineComponent({
    props: {
        alias: {
            required: false,
            type: String,
        },
    },
    watch: {},
    setup() {
        const { loginActionStore } = useAuthStore();

        const {
            isLoading,
            fetchData: loginAsync,
            message,
            response,
        } = useFetching(async (email: string, password: string) => {
            const user = await UserAPI.login(email, password);
            return user;
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
            authUser: response,
            loginActionStore,
        };
    },
    methods: {
        async login(values: any) {
            await this.loginAsync(values.email, values.password);
            if (this.message.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(() => {
                    this.loginActionStore(this.authUser);
                    this.$router.push(`/${this.authUser.companyAlias}`);
                }, 3000);
            }
        },
        putDemoData() {
            this.formState.email = 'BeautySalonAdmin';
            this.formState.password = '123';
        },
        putDemoClient() {
            this.formState.email = 'RonaldK';
            this.formState.password = '123';
        },
        putDemoMaster() {
            this.formState.email = 'KristinaK';
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
        <a-row type="flex" justify="space-around" class="mb-4">
            <a-button v-if="!alias" type="primary" @click="putDemoData"
                >Put demo data</a-button
            >
            <a-button v-if="alias" type="primary" @click="putDemoMaster"
                >Put demo MASTER</a-button
            >
            <a-button v-if="alias" type="primary" @click="putDemoClient"
                >Put demo CLIENT</a-button
            >
        </a-row>
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

        <a-row type="flex" justify="end">
            <a-form-item>
                <a-button
                    size="large"
                    type="primary"
                    html-type="submit"
                    :loading="isLoading"
                    >Submit</a-button
                >
            </a-form-item>
        </a-row>
    </a-form>
</template>

<style scoped></style>
