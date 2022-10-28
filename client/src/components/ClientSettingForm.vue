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
                        :name="['user', 'name']"
                        label="Name"
                        :rules="[{ required: true }]"
                    >
                        <a-input v-model:value="formState.user.name" />
                    </a-form-item>
                    <a-form-item
                        :name="['user', 'surname']"
                        label="Surname"
                        :rules="[{ required: true }]"
                    >
                        <a-input v-model:value="formState.user.surname" />
                    </a-form-item>
                    <a-form-item
                        name="gender"
                        label="Gender"
                        has-feedback
                        :rules="[{ required: false, message: 'Gender' }]"
                    >
                        <a-select
                            v-model:value="formState.user.gender"
                            placeholder="Please select gender"
                        >
                            <a-select-option value="Male">Male</a-select-option>
                            <a-select-option value="Female"
                                >Female</a-select-option
                            >
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        :name="['user', 'age']"
                        label="Age"
                        :rules="[{ type: 'number', min: 0, max: 99 }]"
                    >
                        <a-input-number v-model:value="formState.user.age" />
                    </a-form-item>
                    <a-form-item
                        :name="['user', 'email']"
                        label="Email"
                        :rules="[{ type: 'email' }]"
                    >
                        <a-input v-model:value="formState.user.email" />
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
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const formState = reactive({
            user: {
                name: '',
                surname: '',
                age: undefined,
                email: '',
                gender: '',
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
