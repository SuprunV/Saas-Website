<script lang="ts">
// import '@/styles/loadingPage.scss';
export default {
    name: 'page-loading',
    props: {
        isLoadingPage: {
            required: true,
            type: Boolean,
        },
    },
};
</script>

<template>
    <div class="loading-page">
        <div class="loading-page_spinner" v-if="isLoadingPage">
            <a-spin size="large" />
        </div>
    </div>
</template>

<style scoped></style>
