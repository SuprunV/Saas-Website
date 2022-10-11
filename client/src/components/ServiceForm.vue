<template>
    <app-form-modal
        :show="show"
        :formState="formStateService"
        :validateMessages="validateMessages"
        :layout="layout"
        @submit="submitForm"
        @close="() => $emit('update:show', false)"
    >
        <a-form-item
            :name="['service', 'name']"
            label="Name"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formStateService.service.name" />
        </a-form-item>
        <a-form-item
            :name="['service', 'description']"
            label="Description"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formStateService.service.description" />
        </a-form-item>
        <a-form-item
            :name="['service', 'price']"
            label="Price"
            :rules="[{ type: 'number', min: 0, max: 1000 }]"
        >
            <a-input-number v-model:value="formStateService.service.price" />
        </a-form-item>
        <a-form-item
            :name="['service', 'duration']"
            label="Duration (in minutes)"
            :rules="[{ type: 'number', min: 0, max: 1000 }]"
        >
            <a-input-number v-model:value="formStateService.service.duration" />
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
            required: '${label} is required!',
            types: {
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const formStateService = reactive({
            service: {
                name: '',
                price: 0,
                description:'',
                duration: 0,
            },
        });

        return {
            formStateService: formStateService,
            layout,
            validateMessages,
        };
    },
    methods: {
        submitForm() {
            console.log('submit started', this.formStateService);
        },
    },
});
</script>