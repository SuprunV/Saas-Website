<template>
    <div class="">
        <div v-createModal="{ show: show, width: 30 }">
            <div class="main-cart" role="document">
                <a-form ref="formRef" name="dynamic_form_nest_item">
                    <response-alert :message="message" :isLoading="isLoading" />
                    <a-form-item label="Working days:">
                        <div
                            v-for="weekday in makeEnum(Weekday)"
                            :key="weekday"
                            :class="`ant-avatar weekday-circle ${
                                isSelected(weekday)
                                    ? 'weekday-circle-active'
                                    : ''
                            }`"
                            @click="addWeekday(weekday)"
                        >
                            {{ weekday }}
                        </div>
                    </a-form-item>
                    <a-form-item label="From-to working time:">
                        <a-time-range-picker
                            format="HH:mm"
                            :minute-step="15"
                            v-model:value="selectedTimeRange"
                        />
                    </a-form-item>
                    <a-form-item>
                        <button
                            class="ant-btn ant-btn-danger"
                            type="button"
                            @click="close"
                        >
                            <span>Cancel</span>
                        </button>
                        <a-button
                            type="primary"
                            html-type="submit"
                            @click="submitForm"
                            >Submit</a-button
                        >
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { PropType } from 'vue-types/dist/types';
import { IUser } from '@/models/IUser';
import { MinusCircleOutlined } from '@ant-design/icons-vue/lib/icons';
import { ITimetable, Weekday } from '@/models/ITimetable';
import { makeEnum } from '@/services/makeEnum';
import { Dayjs } from 'dayjs';
import { useFetching } from '@/hooks/useFetching';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/useAuth';
import { TimetableAPI } from '@/api/TimetableAPI';

export default defineComponent({
    props: {
        show: Boolean,
        serviceId: Object as PropType<number | undefined>,
    },
    components: { MinusCircleOutlined },
    setup(props) {
        const { authUser } = storeToRefs(useAuthStore());
        const timetables = ref<ITimetable[]>([
            {
                companyId: 0,
                endTime: '',
                id: 0,
                startTime: '',
                weekday: Weekday.Sat,
            },
        ]);
        const selectedTimeRange = ref<Dayjs[]>([]);

        const {
            fetchData: updateTimetable,
            isLoading,
            message,
        } = useFetching(async () => {
            const companyId = authUser.value.companyId;
            const startTime = `${selectedTimeRange.value[0].hour()}:${selectedTimeRange.value[0].minute()}`;
            const endTime = `${selectedTimeRange.value[1].hour()}:${selectedTimeRange.value[1].minute()}`;
            timetables.value = timetables.value.map((t) => ({
                ...t,
                id: 0,
                companyId,
                endTime,
                startTime,
            }));
            return await TimetableAPI.addTimetable(companyId, timetables.value);
        });

        return {
            makeEnum,
            selectedTimeRange,
            timetables,
            isLoading,
            message,
            updateTimetable,
            Weekday,
        };
    },
    watch: {
        async serviceId() {
            console.log('data changed', this.serviceId);
            // this.fetchServiceMasters();
        },
    },
    methods: {
        close() {
            this.timetables = [];
            this.$emit('update:serviceId', undefined);
            this.$emit('update:show', false);
        },
        isSelected(weekday: Weekday): boolean {
            var findedTime = this.timetables.find((t) => t.weekday == weekday);
            return !!findedTime;
        },
        addWeekday(weekday: Weekday) {
            var findedTime = this.timetables.findIndex(
                (t) => t.weekday == weekday,
            );
            if (findedTime >= 0) {
                this.timetables.splice(findedTime, 1);
            } else {
                this.timetables.push({
                    companyId: 0,
                    endTime: '',
                    id: 0,
                    startTime: '',
                    weekday: weekday,
                });
            }
        },
        removeMaster(masterId: number | undefined) {
            // this.timetables, = this.timetables,.filter(
            //     (m) => m.masterId != masterId,
            // );
        },
        addMaster(master: IUser) {
            if (this.serviceId) {
                // this.timetables,.push({
                //     Id: 0,
                //     masterId: undefined,
                //     serviceId: this.serviceId,
                // });
            }
        },
        async submitForm() {
            console.log('selectedTimeRange', this.selectedTimeRange);
            console.log('was', this.timetables);
            if (
                this.selectedTimeRange.length == 2 ||
                (this.selectedTimeRange.length == 0 &&
                    this.timetables.length == 0)
            ) {
                await this.updateTimetable();
                close();
            }
            // this.formStateService = this.formStateService.filter(
            //     (item) => item.masterId,
            // );
            // this.formStateService = uniqByKeepFirst<IServiceMaster>(
            //     this.formStateService,
            //     (item) => item.masterId,
            // );
            // console.log('now', this.formStateService);
            // await this.updateServiceMasters();
            // if (
            //     this.messageUpdatingServiceMasters.type ==
            //     ResponseTypeEnum.SUCCESS
            // ) {
            //     setTimeout(async () => {
            //         //  await this.getServices();
            //         this.close();
            //         this.$emit('finalAction');
            //     }, 1500);
            // }
        },
    },
    async mounted() {
        // await this.fetchMasters();
        // this.masters = this.fetchedMasters;
    },
});
</script>
