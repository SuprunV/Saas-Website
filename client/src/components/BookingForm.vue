<template>
    <div class="">
        <div v-createModal="{ show: show, width: 100 }">
            <div class="main-cart">
                <a-form
                    :model="formState"
                    v-bind="layout"
                    name="nest-messages"
                    :validate-messages="validateMessages"
                    @finish="submitForm"
                >
                    <div class="ant-modal-body">
                        <a-form-item
                            :name="['master', 'masterName']"
                            label="Master name"
                            :rules="[{ required: true }]"
                        >
                        <a-select
                                v-model:value="formState.booking.masterName"
                                placeholder="Please select master"
                            >
                                <a-select-option value="Master1"
                                    >Master1</a-select-option
                                >
                                <a-select-option value="Master2"
                                    >Master2</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            :name="['date', 'date']"
                            label="Date"
                            :rules="[{ required: true }]"
                        >
                            <a-date-picker v-model:value="value1" />
                        </a-form-item>
                    </div>
                    <div class="ant-modal-footer">
                        <button
                            class="ant-btn ant-btn-danger"
                            type="button"
                            @click="close"
                        >
                            <span>Cancel</span></button
                        ><a-button
                            class="ant-btn btn-success"
                            html-type="submit"
                        >
                            <span>OK</span>
                        </a-button>
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { Dayjs } from 'dayjs';

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
            booking: {
                masterName: '',
                date: '',
                time: ''
            },
        });

        return {
            value1: ref<Dayjs>(),
            formState,
            layout,
            validateMessages,
        };
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            console.log('close in form', this.show);
        },
        submitForm() {
            console.log('submit started', this.formState);
        },
    },
});
</script>
