<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import type { Dayjs } from 'dayjs';
import { IUser, RolesEnum } from '@/models/IUser';
import { UserAPI } from '@/api/UserAPI';
import { CompanyAPI } from '@/api/CompanyAPI';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/useAuth';
import { IMaster } from '@/models/IMaster';
import { IAppointment } from '@/models/IAppointment';
import { IService } from '@/models/IService';
import { AppointmentAPI } from '@/api/AppointmentAPI';

export default defineComponent({
    props: {
        show: Boolean,
        service: Object as () => IService,
    },
    data: () => ({
        masters: [] as IMaster[],
        appointment: {} as IAppointment,
    }),
    setup() {
        const { authUser } = storeToRefs(useAuthStore());
        const masterList = ref<IMaster[]>([]);
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const selectedAppointment = ref<{
            date: Date;
            masterId: number;
            time: string;
        }>({
            date: new Date(),
            masterId: -1,
            time: '',
        });

        const clientAppointment = ref<IAppointment>({
            Id: 0,
            clientId: authUser.value.id,
            clientName: authUser.value.name,
            date: new Date(),
            master: {
                name: '',
            } as IMaster,
            serviceId: -1, // is taken from find service page, when click
            serviceName: '', // is taken from find service page, when click
        });

        const validateMessages = {
            required: '${label} is required!',
        };

        onMounted(async () => {
            const masters = await CompanyAPI.getCompanyMasters(
                authUser.value.companyId,
            );
            masterList.value = masters;
        });

        // Step 1. Select Date. When date is selected or updated, doing:
        //  1. remove selected time
        //  2. remove selected master
        //  3. Update free masters on this day AND near master name is shown count of free places.
        const isDateChange = (value: Dayjs, mode: string) => {
            selectedAppointment.value.date = value.toDate();
            selectedAppointment.value.masterId = -1;
            selectedAppointment.value.time = '';
            uploadFreeAppointment();
        };

        const uploadFreeAppointment = async () => {
            const appointments = await AppointmentAPI.getFreeEvents(
                selectedAppointment.value.date,
                authUser.value.companyId,
            );  
        };

        // Step 2. Select Master. When master is selected or updated, doing:
        // 1. remove selected time
        // 2. update free time, when selected master is free.
        const sortMasters = async () => {};

        // Step 3. Time is Selected:
        // 1. is able to add book

        const formState = reactive({
            booking: {
                masterName: '',
                date: '',
                time: '',
            },
        });

        return {
            value: ref<Dayjs>(),
            isDateChange,
            uploadFreeAppointment,
            onMounted,
            formState,
            validateMessages,
            selectedAppointment,
            clientAppointment,
            masterList,
            limit,
            page,
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
                    v-bind="{
                        labelCol: { span: 8 },
                        wrapperCol: { span: 16 },
                    }"
                    name="nest-messages"
                    :validate-messages="validateMessages"
                    @finish="submitForm"
                >
                    <div class="ant-modal-body">
                        <a-form-item
                            :name="['date', 'date']"
                            label="Step 1: Date"
                            :rules="[{ required: true }]"
                        >
                            <div class="calendar">
                                <a-calendar
                                    v-model="selectedAppointment.date"
                                    :fullscreen="false"
                                    @change="isDateChange"
                                />
                            </div>
                        </a-form-item>
                        <a-form-item
                            :name="['master', 'masterName']"
                            label="Step 2: Master name"
                            :rules="[{ required: true }]"
                        >
                            <a-select
                                placeholder="Please select master"
                                v-model="selectedAppointment.masterId"
                            >
                                <a-select-option
                                    v-for="master in masterList"
                                    :key="master.Id"
                                    >{{ master.name }}</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            :name="['time', 'time']"
                            label="Step 3: Available time:"
                            :rules="[{ required: true }]"
                        >
                            <div>
                                <a-radio-group
                                    v-model:value="selectedAppointment.time"
                                >
                                    <a-radio-button value="a"
                                        >14:00</a-radio-button
                                    >
                                    <a-radio-button value="b"
                                        >15:00</a-radio-button
                                    >
                                    <a-radio-button value="c"
                                        >16:00</a-radio-button
                                    >
                                    <a-radio-button value="d"
                                        >17:00</a-radio-button
                                    >
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
