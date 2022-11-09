<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import type { Dayjs } from 'dayjs';
import { IUser, RolesEnum } from '@/models/IUser';
import { UserAPI } from '@/api/UserAPI';

export default defineComponent({
    props: {
        show: Boolean,
    },
    data: () => ({
        masters: [] as IUser[],
    }),
    setup() {
        const masterList = ref<IUser[]>([]);
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const value1 = ref<string>('a');
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
            },});

        onMounted(async () => {
            const masters = await UserAPI.getPublicUsers(
                limit.value,
                page.value,
                RolesEnum.MASTER,
            );
            masterList.value = masters;
        });
        return {
            value: ref<Dayjs>(),
            onPanelChange: (value: Dayjs, mode: string) => {
                console.log(value, mode);},
            formState,
            layout,
            validateMessages,
            masterList,
            limit,
            page,
            value1
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
<template>
    <div class="">
        <div v-createModal="{ show: show, width: 50 }">
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
                                <a-select-option v-for="master,index in masterList" v-bind:value="index">{{master.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            :name="['date', 'date']"
                            label="Date"
                            :rules="[{ required: true }]"
                        >
                        <div class="calendar">
                            <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
                        </div>
                        </a-form-item>
                        <a-form-item
                            :name="['time', 'time']"
                            label="Available time:"
                            :rules="[{ required: true }]"
                        >
                        <div >
                            <a-radio-group v-model:value="value1">
                                <a-radio-button value="a">14:00</a-radio-button>
                                <a-radio-button value="b">15:00</a-radio-button>
                                <a-radio-button value="c">16:00</a-radio-button>
                                <a-radio-button value="d">17:00</a-radio-button>
                            </a-radio-group>
                        </div>
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
                            <span>Book</span>
                        </a-button>
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>