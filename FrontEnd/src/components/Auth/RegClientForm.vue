<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { validWord } from '@/services/validWord';
import { RolesEnum } from '@/models/IUser';
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { useFetching } from '@/hooks/useFetching';
import { UserAPI } from '@/api/UserAPI';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import ARow from 'ant-design-vue/lib/grid/Row';
import { useCompanyStore } from '@/store/useCompany';

interface FormState {
    companyId: number;
    login: string;
    password: string;
}
export default defineComponent({
    props: {
        alias: {
            required: true,
            type: String,
        },
    },
    setup() {
        const authStore = useAuthStore();
        const { authUser } = storeToRefs(authStore);
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);
        const formState = reactive<FormState>({
            companyId: company.value.id,
            login: '',
            password: '',
        });
        const {
            isLoading,
            fetchData: regAsync,
            message,
            response: userToken,
        } = useFetching(async () => {
            const user = await UserAPI.registeUser(formState);
            return user;
        });

        return {
            formState,
            regAsync,
            isLoading,
            userToken,
            message,
            authUser,
            loginActionStore: authStore.loginActionStore,
        };
    },
    methods: {
        async onFinish(values: any) {
            await this.regAsync();
            console.log('response', this.authUser, this.message);
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
            label="Email"
            name="login"
            :rules="[
                {
                    required: true,
                    message: 'Please input your email!',
                    type: 'email',
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
                <a-button type="primary" size="large" html-type="submit"
                    >Submit</a-button
                >
            </a-form-item>
        </a-row>
    </a-form>
</template>

<style scoped></style>
