<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import type { Dayjs } from 'dayjs';
import { IUser, RolesEnum } from '@/models/IUser';
import { UserAPI } from '@/api/UserAPI';
import { CompanyAPI } from '@/api/СompanyAPI';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/useAuth';
import { IMaster } from '@/models/IMaster';
import { IAppointment } from '@/models/IAppointment';
import { IService } from '@/models/IService';
import { AppointmentAPI } from '@/api/AppointmentAPI';
import { useFetching } from '@/hooks/useFetching';

export interface MasterListItem {
    name: string;
    freeCount: number;
    id: number;
}
export interface IBookingAppointment {
    date: Date;
    masterId: string;
    time: string;
}

export interface TimeListItem {
    name: string;
    value: string;
}

export default defineComponent({
    props: {
        show: Boolean,
        service: Object as () => IService,
    },
    data: () => ({
        appointment: {} as IAppointment,
    }),
    setup(props, { emit }) {
        const { authUser } = storeToRefs(useAuthStore());
        const masterList = ref<MasterListItem[]>([]);
        const listOfTime = ref<TimeListItem[]>();
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const freeAppointments = ref<IAppointment[]>([]);
        const selectedAppointment = ref<IBookingAppointment>({
            date: new Date(2022, 10, 27),
            masterId: '',
            time: '',
        });
        const validateMessages = {
            required: '${label} is required!',
        };

        const isDateChange = (value: Dayjs, mode: string) => {
            selectedAppointment.value.date = value.toDate();
            selectedAppointment.value.masterId = '';
            selectedAppointment.value.time = '';
            uploadFreeAppointment();
        };

        const uploadFreeAppointment = async () => {
            const appointments = await AppointmentAPI.getFreeEvents(
                selectedAppointment.value.date,
                authUser.value.companyId,
                props.service?.id ?? -1,
            );
            // get masters and count of their free appointments
            var allMasters = appointments
                .map((a) => a.master)
                .filter(
                    (value, index, self) =>
                        self.map((m) => m?.name).indexOf(value?.name) === index,
                )
                .map(
                    (m) =>
                        ({
                            freeCount: 0,
                            name: m?.name,
                            id: m?.id,
                        } as MasterListItem),
                );

            freeAppointments.value = appointments;
            allMasters = allMasters.map((m) => {
                var newM = m;
                newM.freeCount = appointments.filter(
                    (a) => a.master?.id == m.id,
                ).length;
                return newM;
            });
            masterList.value = allMasters;
            updateTimes();
        };

        const updateTimes = async () => {
            const masterTimes = freeAppointments.value.filter(
                (a) =>
                    String(a.master?.id) == selectedAppointment.value.masterId,
            );
            listOfTime.value = masterTimes.map((t): TimeListItem => {
                const name = new Date(t.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });
                const value = new Date(t.date).toISOString();
                return {
                    name,
                    value,
                };
            });
        };

        const {
            isLoading,
            message,
            fetchData: submitForm,
        } = useFetching(async () => {
            const response = await AppointmentAPI.addEvent({
                Id: 0,
                clientId: authUser.value.id,
                masterId: +selectedAppointment.value.masterId,
                date: selectedAppointment.value.time,
                serviceId: props.service?.id ?? -1,
            });
            selectedAppointment.value.masterId = '';
            selectedAppointment.value.time = '';
            uploadFreeAppointment();
            setTimeout(() => {
                emit('update:show', false);
            }, 3000);
        });

        return {
            value: ref<Dayjs>(),
            updateTimes,
            isDateChange,
            uploadFreeAppointment,
            onMounted,
            listOfTime,
            validateMessages,
            selectedAppointment,
            masterList,
            submitForm,
            authUser,
            isLoading,
            message,
            limit,
            page,
        };
    },
    watch: {
        service() {
            console.log('service is changed');
            this.uploadFreeAppointment();
        },
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            console.log('close in form', this.show);
        },
    },
});
</script>
<template>
    <div class="">
        <div v-createModal="{ show: show, width: 50 }">
            <div class="main-cart">
                <response-alert :message="message" :isLoading="isLoading" />
                <a-form
                    :model="selectedAppointment"
                    v-bind="{
                        labelCol: { span: 8 },
                        wrapperCol: { span: 16 },
                    }"
                    name="nest-messages"
                    :validate-messages="validateMessages"
                    @finish="submitForm"
                >
                    <div class="ant-modal-body">
                        <a-form-item :name="['date']" label="Step 1: Date">
                            <div class="calendar">
                                <a-calendar
                                    v-model="selectedAppointment.date"
                                    :fullscreen="false"
                                    @change="isDateChange"
                                />
                            </div>
                        </a-form-item>
                        <a-form-item
                            :name="['masterId']"
                            label="Step 2: Master name"
                            :rules="[{ required: true }]"
                        >
                            <em v-if="!masterList.length"
                                >No Masters at this day!</em
                            >
                            <a-select
                                placeholder="Please select master"
                                v-model:value="selectedAppointment.masterId"
                                @change="() => updateTimes()"
                            >
                                <a-select-option
                                    v-for="master in masterList"
                                    :key="master.id"
                                    :value="master.id"
                                    >{{ master.name }} ({{
                                        master.freeCount
                                    }})</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            :name="['time']"
                            label="Step 3: Available time:"
                            :rules="[{ required: true }]"
                        >
                            <div>
                                <em v-if="!selectedAppointment.masterId"
                                    >Please, select master.</em
                                >
                                <em v-else-if="!listOfTime?.length"
                                    >No Free times at this day!</em
                                >
                                <a-select
                                    v-model:value="selectedAppointment.time"
                                >
                                    <a-select-option
                                        v-for="time in listOfTime"
                                        :key="time.value"
                                        :value="time.value"
                                        >{{ time.name }}</a-select-option
                                    >
                                </a-select>
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
