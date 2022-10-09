<template>
    <a-row>
        <a-col :span="17">
            <a-calendar v-model:value="selectedDay">
                <template #dateCellRender="{ current }">
                    <div class="events">
                        <div class="number-circle">
                            {{getListData(current).length}}
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
                {{eventSidebar}}
                <br><br>
                {{ selectedDay.toDate().toLocaleString("it-IT", {timeZone: "Europe/Tallinn"})}}
                <br><br>
                <div class="content"> 
                </div>  
               <div class="text-center bg-gray-50">
               <div class="events-table">
                <a-table :dataSource="selectedDayEvents" :columns="columns">
                    <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'date'">
                    {{ record.date.toLocaleTimeString("it-IT", {hour:"2-digit",minute: "2-digit"}) }}
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
import { defineComponent, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import {ICalendarEvents} from '@/models/ICalendarEvents';
import {CalendarEventsAPI} from '@/api/CalendarEventsAPI';

export default defineComponent({
    name: 'main-calendar',
    setup() {
        const selectedDay = ref<Dayjs>(dayjs(new Date(new Date())));
        const selectedMonth = ref<number>(selectedDay.value.month());
        const selectedDayEvents = ref<ICalendarEvents[]>([]);
        const currentMonthEvents = ref<ICalendarEvents[]>([]);
        const eventSidebar = "Events for today: "
      
        const GetEventsToSelectedDay = async() => {
            const response = await CalendarEventsAPI.getEvents(selectedDay.value.toDate());
            selectedDayEvents.value = response;
        }   
        GetEventsToSelectedDay();

        const updateMonthEvents = async() => {
            const date = selectedDay.value.toDate();
            const response = await CalendarEventsAPI.getEventsByMonthAndYear(date.getMonth(), date.getFullYear());
            currentMonthEvents.value = response;
        }   
        updateMonthEvents();
        const getListData = (value: Dayjs) => {
            let listData = currentMonthEvents.value.filter(e => {
                return e.date.getDate() == value.date();
            });
            return listData || [];
        };
        const getMonthData = (value: Dayjs) => {

            if (value.month() === 8) {
                return 0;
            }
        };
        const columns = [
          {
            title: 'Time',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Client name',
            dataIndex: 'clientName',
            key: 'clientName',
          },
          {
            title: 'Service',
            dataIndex: 'serviceName',
            key: 'serviceName',
          },
        ]

        return {
            selectedDay,
            getListData,
            getMonthData,
            selectedDayEvents,
            GetEventsToSelectedDay,
            selectedMonth,
            eventSidebar, 
            updateMonthEvents,
            columns
            
        };
    },
    watch: {
        selectedDay() {
            if(this.selectedMonth != this.selectedDay.month()) {
                this.updateMonthEvents();
            }
            this.GetEventsToSelectedDay();
            this.selectedMonth = this.selectedDay.month();
        },
    },

   
});
</script>

<style lang="scss">

.content{
    flex-direction: row;
}
.calendar-sideblock {
    
    font-size: 20px;
    font-family: Arial ;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    min-height: 100%;
    text-align: center;
    text-overflow: auto;
    overflow: auto;
    padding: 1rem;
    margin-left: 20px;

    background-color:lavender;
    color: var(--dark);
}

.events {
    list-style: none;
    margin: 0 auto;
    text-align:center;
    border-radius: 50%;
   // display: inline-block;
    background-color:rgb(58, 156, 123);
    padding: 5px;
    color: white;
    width: 35px;
    height: 35px;
    font-size: 15px;
}
.events1 {
    font-family: Georgia, 'Times New Roman', Times, serif;
    list-style: none;
    margin: 0;
    padding: 1rem;
    font-weight: bold;
    font-size: 20px;
    text-align: center;

}
.events .ant-badge-status {
   overflow: hidden;
    white-space: nowrap;
    width: 50%;
    text-overflow: auto;
    font-size: 20px;
}
.notes-month {
    text-align: center;
    font-size: 28px;
}
.notes-month section {
    font-size: 28px;
}

.events-table {
    .ant-table-thead > tr > th {
        background:darkslateblue;
        text-align: center;
        font-family: Georgia, 'Times New Roman', Times, serif;
        color: var(--light);
    }
}
</style> 

