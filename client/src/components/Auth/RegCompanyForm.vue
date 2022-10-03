<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { validWord } from '@/services/validWord';
import { RolesEnum } from '@/models/IUser';

interface FormState {
    companyName: string;
    usernamePart: string;
    emailPart: string;
    password: string;
    role: RolesEnum;
}
export default defineComponent({
    props: {
        alias: {
            required: true,
            type: String,
        },
    },
    setup() {
        const formState = reactive<FormState>({
            companyName: '',
            usernamePart: '',
            emailPart: '@',
            password: '',
            role: RolesEnum.CLIENT,
        });

        const onFinish = (values: any) => {
            console.log(values);
        };
        return {
            formState,
            onFinish,
        };
    },
    mounted() {
        this.formState.emailPart = `@${this.alias}.com`;
    },
    computed: {
        okayFormState() {
            this.formState.usernamePart = this.formState.usernamePart
                .replace(' ', '_')
                .substring(0);
            return this.formState;
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
        <a-form-item label="Register as: ">
            <a-radio-group v-model:value="formState.role">
                <a-radio value="CLIENT">Client</a-radio>
                <a-radio value="MASTER">Master</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-form-item
            label="Email"
            name="usernamePart"
            :rules="[{ required: true, message: 'Please input your email!' }]"
        >
            <a-row>
                <a-col :span="14">
                    <a-input v-model:value="okayFormState.usernamePart" />
                </a-col>
                <a-col :span="10" class="sub-elem">
                    <span>{{ okayFormState.emailPart }}</span>
                </a-col>
            </a-row>
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
