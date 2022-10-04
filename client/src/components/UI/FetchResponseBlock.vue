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
            defaultValue: false
        },
        isLoading: {
            required: true,
            type: Boolean,
        },
    },
    data: () => ({
        ResponseTypeEnum,
    }),     
    mounted() {},
});
</script>

<template>
    <div>
        <a-row justify="center" align="center" class="mt-4 mb-4">
            <a-spin v-if="isLoading" />
            <div v-if="!loadingOnly">
                <a-alert
                    v-if="message.type == ResponseTypeEnum.SUCCESS"
                    :message="message.message"
                    type="success"
                />
                <a-alert
                    v-else-if="message.type == ResponseTypeEnum.WARNING"
                    :message="message.message"
                    type="warning"
                />
                <a-alert
                    v-else-if="message.type == ResponseTypeEnum.FAIL"
                    :message="message.message"
                    type="error"
                />
            </div>
        </a-row>
    </div>
</template>

<style scoped></style>
