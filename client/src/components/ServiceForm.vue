<template>
    <div v-createModal="{ show: show, width: 50 }">
        <div class="main-cart" role="document">
            <a-form
                :model="formStateService"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="submitForm"
            >
                <div class="ant-modal-body">
                    <a-form-item
                        :name="['service', 'name']"
                        label="Name"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formStateService.service.name"
                        />
                    </a-form-item>
                    <a-form-item
                        :name="['service', 'description']"
                        label="Description"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formStateService.service.description"
                        />
                    </a-form-item>
                    <a-form-item
                        :name="['service', 'price']"
                        label="Price"
                        :rules="[{ type: 'number', min: 0, max: 1000 }]"
                    >
                        <a-input-number
                            v-model:value="formStateService.service.price"
                        />
                    </a-form-item>
                    <a-form-item
                        :name="['service', 'duration']"
                        label="Duration (in minutes)"
                        :rules="[{ type: 'number', min: 0, max: 1000 }]"
                    >
                        <a-input-number
                            v-model:value="formStateService.service.duration"
                        />
                    </a-form-item>
                </div>
                <div class="ant-modal-footer">
                    <button
                        class="ant-btn ant-btn-danger"
                        type="button"
                        @click="close"
                    >
                        <span>Cancel</span></button
                    ><a-button class="ant-btn btn-success" html-type="submit">
                        <span>OK</span>
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>
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
                description: '',
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
        close() {
            this.$emit('update:show', false);
        },
        submitForm() {
            console.log('submit started', this.formStateService);
        },
    },
});
</script>
