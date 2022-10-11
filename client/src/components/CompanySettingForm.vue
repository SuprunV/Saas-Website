<template>
    <app-form-modal
        :show="show"
        :formState="formState"
        :validateMessages="validateMessages"
        :layout="layout"
        @submit="submitForm"
        @close="() => $emit('update:show', false)"
    >
        <a-form-item
            :name="['user', 'companyName']"
            label="Company name"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formState.company.companyName" />
        </a-form-item>
        <a-form-item
            :name="['user', 'address']"
            label="Address"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formState.company.address" />
        </a-form-item>
    </app-form-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    props: {
        show: Boolean,
    },
    setup(props) {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        const validateMessages = {
            required: '${label} is required!'
        };

        const formState = reactive({
            company: {
                companyName: '',
                address: ''
            },
        });

        return {
            formState,
            layout,
            validateMessages,
        };
    },
    methods: {
        submitForm() {
            console.log('submit started', this.formState);
        },
    },
});
</script>
