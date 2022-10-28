<template>
    <div>
        <div class="main-cart" role="document">
            <a-form
                :model="formState"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="submitForm"
            >
                <div class="ant-modal-body">
                    <a-form-item
                        :name="['user', 'companyName']"
                        label="Company name"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formState.company.companyName"
                        />
                    </a-form-item>
                    <a-form-item
                        :name="['user', 'address']"
                        label="Address"
                        :rules="[{ required: true }]"
                    >
                        <a-input v-model:value="formState.company.address" />
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
        };

        const formState = reactive({
            company: {
                companyName: '',
                address: '',
            },
        });

        return {
            formState,
            layout,
            validateMessages,
        };
    },
    methods: {
        close() {
            console.log('hi');
            this.$emit('update:show', false);
        },
        submitForm() {
            console.log('submit started', this.formState);
        },
    },
});
</script>
