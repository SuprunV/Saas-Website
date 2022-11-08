<script lang="ts">
import { defineComponent } from 'vue';
import { IFetchResponse, ResponseTypeEnum } from '@/types/FetchResponse';

export default defineComponent({
    name: 'response-alert',
    props: {
        message: {
            required: true,
            type: Object as () => IFetchResponse,
        },
        loadingOnly: {
            required: false,
            type: Boolean,
            defaultValue: false,
        },
        isLoading: {
            required: true,
            type: Boolean,
        },
    },
    data: () => ({
        ResponseTypeEnum,
    }),
    // setup(props) {
    //     const message: IFetchResponse = {
    //         message: 'asdasdasd',
    //         type: ResponseTypeEnum.SUCCESS,
    //     };

    //     return { message };
    // },
});
</script>

<template>
    <div class="loader">
        <a-row justify="center" align="center" class="mt-4 mb-4">
            <div v-if="isLoading" class="loader-circle">
                <a-spin v-if="isLoading" />
            </div>
            <div v-if="!loadingOnly">
                <a-alert
                    v-if="message.type == ResponseTypeEnum.SUCCESS"
                    :message="message.message"
                    show-icon
                    type="success"
                />
                <a-alert
                    v-else-if="message.type == ResponseTypeEnum.WARNING"
                    :message="message.message"
                    show-icon
                    type="warning"
                />
                <a-alert
                    v-else-if="message.type == ResponseTypeEnum.FAIL"
                    :message="message.message"
                    show-icon
                    type="error"
                />
            </div>
        </a-row>
    </div>
</template>

<style scoped></style>
