<template>
    <app-form-modal
        :show="show"
        :formState="formState"
        :validateMessages="validateMessages"
        :layout="layout"
        @submit="submitForm"
        @close="() => $emit('update:show', false)"
    >
        <div class="modal-window" @click="close" style=""></div>
        <div
            tabindex="-1"
            class="ant-modal-wrap"
            role="dialog"
            aria-labelledby="vcDialogTitle8"
        >
            <div
                class="ant-modal"
                role="document"
                style="width: 520px; transform-origin: -328.667px 444px"
            >
                <div tabindex="0" aria-hidden="true"></div>
                <div class="ant-modal-content">
                    <button
                        type="button"
                        aria-label="Close"
                        class="ant-modal-close"
                        @click="close"
                    >
                        <span class="ant-modal-close-x"
                            ><span
                                role="img"
                                aria-label="close"
                                @click="close"
                                class="anticon anticon-close ant-modal-close-icon"
                                ><svg
                                    focusable="false"
                                    class=""
                                    data-icon="close"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    viewBox="64 64 896 896"
                                >
                                    <path
                                        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                                    ></path></svg></span
                        ></span>
                    </button>
                    <div class="ant-modal-header">
                        <div class="ant-modal-title" id="vcDialogTitle8">
                            Basic Modal
                        </div>
                    </div>
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
                                    v-model:value="
                                        formState.company.companyName
                                    "
                                />
                            </a-form-item>
                            <a-form-item
                                :name="['user', 'address']"
                                label="Address"
                                :rules="[{ required: true }]"
                            >
                                <a-input
                                    v-model:value="formState.company.address"
                                />
                            </a-form-item>
                        </div>
                        <div class="ant-modal-footer">
                            <button
                                class="ant-btn"
                                type="button"
                                @click="close"
                            >
                                <!----><span>Cancel</span></button
                            ><a-button
                                class="ant-btn ant-btn-primary"
                                html-type="submit"
                            >
                                <!----><span>OK</span>
                            </a-button>
                        </div>
                    </a-form>
                </div>
                <div
                    tabindex="0"
                    aria-hidden="true"
                    style="
                        width: 0px;
                        height: 0px;
                        overflow: hidden;
                        outline: none;
                    "
                ></div>
            </div>
        </div>
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
        submitForm() {
            console.log('submit started', this.formState);
        },
    },
});
</script>
