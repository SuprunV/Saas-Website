<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface FormState {
    username: string;
    password: string;
}
export default defineComponent({
    setup() {
        const formState = reactive<FormState>({
            username: '',
            password: '',
        });
        const onFinish = (values: any) => {
            console.log('Success:', values);
        };
        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        return {
            formState,
            onFinish,
            onFinishFailed,
        };
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
        @finishFailed="onFinishFailed"
    >
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

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>

<style scoped></style>
