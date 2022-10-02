<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { validWord } from '@/services/validWord';

interface FormState {
    companyName: string;
    usernamePart: string;
    emailPart: string;
    password: string;
}
export default defineComponent({
    setup() {
        const formState = reactive<FormState>({
            companyName: '',
            usernamePart: '',
            emailPart: '@',
            password: '',
        });
        const onFinish = (values: any) => {
            console.log(values);
        };
        return {
            formState,
            onFinish,
        };
    },
    computed: {
        okayFormState() {
            this.formState.emailPart = `@${validWord(
                this.formState.companyName,
                9,
            )}.com`;
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
            label="Username"
            name="usernamePart"
            :rules="[
                { required: true, message: 'Please input your username!' },
            ]"
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
