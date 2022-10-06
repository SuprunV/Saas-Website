<template>
    <a-row>
        <a-col :span="17">
            <a-calendar v-model:value="selectedDay">
                <template #dateCellRender="{ current }">
                    <ul class="events">
                        <li
                            v-for="item in getListData(current)"
                            :key="item.content"
                        >
                            <a-badge :status="item.type" :text="item.content" />
                        </li>
                    </ul>
                </template>
                <template #monthCellRender="{ current }">
                    <div v-if="getMonthData(current)" class="notes-month">
                        <section>{{ getMonthData(current) }}</section>
                        <span>Backlog number</span>
                    </div>
                </template>
            </a-calendar>
        </a-col>
        <a-col :span="6">
            <div class="calendar-sideblock">
                {{ selectedDay }}
                {{}}
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { valueType } from 'ant-design-vue/lib/statistic/utils';

export default defineComponent({
    name: 'main-calendar',
    setup() {
        const selectedDay = ref<Dayjs>(dayjs(new Date().toString()));
      

        const getListData = (value: Dayjs) => {
            let listData;
            switch (value.date()) {
                case 8:
                    listData = [
                        { type: 'warning', content: 'This is warning event.' },
                        { type: 'success', content: 'This is usual event.' },
                    ];
                    break;
                case 10:
                    listData = [
                        { type: 'warning', content: 'This is warning event.' },
                        { type: 'success', content: 'This is usual event.' },
                        { type: 'error', content: 'This is error event.' },
                    ];
                    break;
                case 15:
                    listData = [
                        { type: 'warning', content: 'This is warning event' },
                        {
                            type: 'success',
                            content: 'This is very long usual event。。....',
                        },
                        { type: 'error', content: 'This is error event 1.' },
                        { type: 'error', content: 'This is error event 2.' },
                        { type: 'error', content: 'This is error event 3.' },
                        { type: 'error', content: 'This is error event 4.' },
                    ];
                    break;
                default:
            }
            return listData || [];
        };
        const getMonthData = (value: Dayjs) => {
            if (value.month() === 8) {
                return 1394;
            }
        };

        return {
            selectedDay,
            getListData,
            getMonthData,
        };
    },
    watch: {
        selectedDay() {
            console.log(this.selectedDay);
        },
    },
});
</script>

<style scoped>
.calendar-sideblock {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    text-align: center;
    overflow: hidden;
    padding: 1rem;
    margin-left: 20px;

    background-color: var(--dark);
    color: var(--light);

    transition: 0.2s ease-out;

    @media (max-width: 768px) {
        position: fixed;
        z-index: 99;
    }
}

.events {
    list-style: none;
    margin: 0;
    padding: 0;
}
.events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 50%;
    text-overflow: ellipsis;
    font-size: 12px;
}
.notes-month {
    text-align: center;
    font-size: 28px;
}
.notes-month section {
    font-size: 28px;
}
</style>

<!-- <template> 
   <div>
        Hei
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'main-calendar'
    })
</script> -->
