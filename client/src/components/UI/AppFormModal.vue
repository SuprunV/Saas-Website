<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'app-form-modal',
    props: {
        show: Boolean,
        formState: Object,
        validateMessages: Object,
        layout: Object,
    },
    data: () => ({
        isVisiable: false,
    }),
    watch: {
        show() {
            this.isVisiable = this.$props.show;
        },
    },
    methods: {
        submitForm() {
            this.$emit('submit');
        },
        close(e: any) {
            e.stopPropagation();
            this.$emit('close');
        },
    },
});
</script>

<template>
    <div v-if="show">
        <div class="ant-modal-mask" @click="close" style=""></div>
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
                            <slot />
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
    </div>
</template>

<style scoped></style>
