<script lang="ts">
import { defineComponent, reactive, ref, onMounted, h } from 'vue';
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
import { ScheduleOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useCompanyStore } from '@/store/useCompany';

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
        const { company } = storeToRefs(useCompanyStore());
        const masterList = ref<MasterListItem[]>([]);
        const listOfTime = ref<TimeListItem[]>();
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const freeAppointments = ref<IAppointment[]>([]);
        const step = ref<number>(0);
        const steps = [0, 1];

        const next = () => {
            step.value++;
        };
        const prev = () => {
            step.value--;
        };
        const selectedAppointment = ref<IBookingAppointment>({
            date: new Date(2022, 10, 27),
            masterId: '',
            time: '',
        });
        const validateMessages = {
            required: '${label} is required!',
        };

        const openNotification = (appointment: IAppointment) => {
            notification.open({
                message: 'Booking confirmation was sent to your e-mail.',
                description: `Your booking for "${
                    props.service?.name
                }" on ${new Date(appointment.date).toLocaleDateString(
                    'ru-RU',
                )} at
                ${new Date(appointment.date).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })} was successfully confirmed.`,
                duration: 15,
                icon: () => h(ScheduleOutlined, { style: 'color: #52c41a' }),
            });
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
                company.value.id,
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
            const newEvent: IAppointment = {
                Id: 0,
                clientId: authUser.value.id,
                masterId: +selectedAppointment.value.masterId,
                date: selectedAppointment.value.time,
                serviceId: props.service?.id ?? -1,
            };
            if (newEvent.clientId >= 0) {
                const response = await AppointmentAPI.addEvent(newEvent);
                selectedAppointment.value.masterId = '';
                selectedAppointment.value.time = '';
                await uploadFreeAppointment();
                setTimeout(() => {
                    emit('update:show', false);
                    openNotification(newEvent);
                }, 3000);
            } else {
                throw Error('You have to stay your personal data OR authorize');
            }
        });

        return {
            value: ref<Dayjs>(),
            prev,
            next,
            updateTimes,
            isDateChange,
            uploadFreeAppointment,
            listOfTime,
            validateMessages,
            selectedAppointment,
            step,
            masterList,
            submitForm,
            authUser,
            isLoading,
            message,
            limit,
            page,
            steps,
            company,
            openNotification,
        };
    },
    watch: {
        service() {
            this.uploadFreeAppointment();
        },
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            console.log('close in form', this.show);
        },
        isValidDay(currentDate: Dayjs) {
            const today = new Date();
            today.setDate(new Date().getDate() - 1);
            return currentDate.toDate() < today;
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
                        <a-steps :current="step" class="mb-4">
                            <a-step v-for="item in steps" :key="item" />
                        </a-steps>
                        <div class="steps-content">
                            <div
                                v-if="step == 0"
                                id="step-1"
                                v-appearAnimation="{ timeout: 100 }"
                            >
                                <a-form-item
                                    :name="['date']"
                                    label="Step 1: Date"
                                >
                                    <div class="calendar">
                                        <a-calendar
                                            v-model="selectedAppointment.date"
                                            :fullscreen="false"
                                            @change="isDateChange"
                                            :disabledDate="isValidDay"
                                        >
                                        </a-calendar>
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
                                        v-model:value="
                                            selectedAppointment.masterId
                                        "
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
                                            v-model:value="
                                                selectedAppointment.time
                                            "
                                        >
                                            <a-select-option
                                                v-for="time in listOfTime"
                                                :key="time.value"
                                                :value="time.value"
                                                >{{
                                                    time.name
                                                }}</a-select-option
                                            >
                                        </a-select>
                                    </div>
                                </a-form-item>
                            </div>
                            <div
                                v-if="step == 1"
                                id="step-2"
                                v-appearAnimation="{ timeout: 100 }"
                            >
                                <a-form-item
                                    label="Email"
                                    name="email"
                                    :rules="[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]"
                                >
                                    <a-input />
                                </a-form-item>

                                <a-form-item
                                    label="Password"
                                    name="password"
                                    :rules="[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]"
                                >
                                    <a-input-password />
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="ant-modal-footer">
                        <a-row type="flex" justify="space-between">
                            <div class="">
                                <button
                                    class="ant-btn ant-btn-danger"
                                    type="button"
                                    @click="close"
                                >
                                    <span>Cancel</span>
                                </button>
                            </div>
                            <div class="">
                                <a-button
                                    v-if="step > 0"
                                    style="margin-left: 8px"
                                    @click="prev"
                                    >Previous</a-button
                                >
                                <a-button
                                    v-if="step < steps.length - 1"
                                    type="primary"
                                    @click="next"
                                    >Next</a-button
                                >
                                <a-button
                                    v-if="step == steps.length - 1"
                                    class="ant-btn btn-success"
                                    html-type="submit"
                                >
                                    <span>Book</span>
                                </a-button>
                            </div>
                        </a-row>
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>
