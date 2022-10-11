<script lang="ts">
import { RolesEnum } from '@/models/IUser';
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        RolesEnum
    })
});
</script>

<template>
    <div>
        <h1 class="text-center">Calendar page for client</h1>
        <main-calendar :role="RolesEnum.CLIENT" />
    </div>
</template>

<style scoped></style>
