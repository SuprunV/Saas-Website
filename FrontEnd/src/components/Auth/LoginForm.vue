<script lang="ts">
import { UserAPI } from '@/api/UserAPI';
import { useFetching } from '@/hooks/useFetching';
import { IUserToken, RolesEnum } from '@/models/IUser';
import { AppRoutes } from '@/router/router';
import { useAuthStore } from '@/store/useAuth';
import { useCompanyStore } from '@/store/useCompany';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive } from 'vue';

interface FormState {
    companyId: number;
    login: string;
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
        const auth = useAuthStore();
        const { authUser } = storeToRefs(auth);

        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const formState = reactive<FormState>({
            companyId: company.value.id,
            login: '',
            password: '',
        });

        const {
            isLoading,
            fetchData: loginAsync,
            message,
            response: userToken,
        } = useFetching(async () => {
            const user = await UserAPI.login(formState);
            return user;
        });

        return {
            formState,
            loginAsync,
            message,
            isLoading,
            userToken,
            authUser,
            loginActionStore: auth.loginActionStore,
        };
    },
    methods: {
        async login(values: any) {
            await this.loginAsync();
            if (this.message.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(() => {
                    this.loginActionStore(this.userToken);
                    console.log('authUser after store login', this.authUser);
                    this.$router.push(`/${this.authUser.companyAlias}`);
                }, 3000);
            }
        },
        putDemoData() {
            this.formState.login = 'BeautySalon@gmail.com';
            this.formState.password = '123';
        },
        putDemoClient() {
            this.formState.login = 'eren-yeager@gmail.com';
            this.formState.password = '123';
        },
        putDemoMaster() {
            this.formState.login = 'levi-ackerman@gmail.com';
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
            name="login"
            :rules="[
                {
                    required: true,
                    message: 'Please input your email!',
                },
            ]"
        >
            <a-input v-model:value="formState.login" />
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
