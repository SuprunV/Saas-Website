<template>
    <a-row>
        <a-col :span="17">
            <a-calendar v-model:value="selectedDay">
                <template #dateCellRender="{ current }">
                    <br />
                    <div v-if="getListData(current).length != 0">
                        <div class="events">
                            <div class="number-circle">
                                {{ getListData(current).length }}
                            </div>
                        </div>
                    </div>
                </template>
                <template #monthCellRender="{ current }">
                    <div v-if="getMonthData(current)" class="notes-month">
                        <section>{{ getMonthData(current) }}</section>
                    </div>
                </template>
            </a-calendar>
        </a-col>
        <a-col :span="6">
            <div class="calendar-sideblock">
                {{ eventSidebar }}
                <br /><br />
                {{
                    selectedDay
                        .toDate()
                        .toLocaleDateString('it-IT', { timeZone: 'Europe/Tallinn' })
                }}
                <br /><br />
                <div class="content"></div>
                <div class="text-center bg-gray-50">
                    <div class="events-table">
                        <a-table
                            :dataSource="selectedDayEvents"
                            :columns="columns"
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'date'">
                                    {{
                                        new Date(
                                            record.date,
                                        ).toLocaleTimeString('it-IT', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })
                                    }}
                                </template>
                            </template>
                        </a-table>
                    </div>
                </div>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { IAppointment } from '@/models/IAppointment';
import { AppointmentAPI } from '@/api/AppointmentAPI';
import { RolesEnum } from '@/models/IUser';
import { title } from 'process';

export default defineComponent({
    name: 'main-calendar',
    props: {
        role: {
            required: true,
            type: Object as () => RolesEnum,
        },
    },
    setup(props) {
        const selectedDay = ref<Dayjs>(dayjs(new Date(new Date())));
        const selectedMonth = ref<number>(selectedDay.value.month());
        const selectedDayEvents = ref<IAppointment[]>([]);
        const currentMonthEvents = ref<IAppointment[]>([]);
        const eventSidebar = 'Events for today: ';

        console.log(props);

        const GetEventsToSelectedDay = async () => {
            const response = await AppointmentAPI.getEvents(
                selectedDay.value.toDate(),
            );
            selectedDayEvents.value = response;
        };
        GetEventsToSelectedDay();

        const updateMonthEvents = async () => {
            const date = selectedDay.value.toDate();
            const response = await AppointmentAPI.getEventsByMonthAndYear(
                date.getMonth(),
                date.getFullYear(),
            );
            currentMonthEvents.value = response;
        };
        updateMonthEvents();
        const getListData = (value: Dayjs) => {
            let listData = currentMonthEvents.value.filter((e) => {
                return e.date == value.date().toLocaleString();
            });
            return listData || [];
        };
        const getMonthData = (value: Dayjs) => {
            if (value.month() === 8) {
                return 0;
            }
        };

        var dataIndex1 = '';
        var title1 = '';
        if (props.role == 'MASTER') {
            title1 = 'Client name';
            dataIndex1 = 'client.name';
        } else if (props.role == 'CLIENT') {
            title1 = 'Master name';
            dataIndex1 = 'master.name';
        }

        const columns = [
            {
                title: 'Time',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: title1,
                dataIndex: dataIndex1,
                key: dataIndex1,
            },
            {
                title: 'Service',
                dataIndex: 'service.name',
                key: 'service.name',
            },
        ];

        return {
            selectedDay,
            getListData,
            getMonthData,
            GetEventsToSelectedDay,
            selectedDayEvents,
            selectedMonth,
            eventSidebar,
            updateMonthEvents,
            columns,
        };
    },
    watch: {
        selectedDay() {
            if (this.selectedMonth != this.selectedDay.month()) {
                this.updateMonthEvents();
            }
            this.GetEventsToSelectedDay();
            this.selectedMonth = this.selectedDay.month();
        },
    },
});
</script>

<style lang="scss"></style>
