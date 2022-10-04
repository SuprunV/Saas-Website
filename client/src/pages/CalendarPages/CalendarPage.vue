<script lang="ts">
import { RolesEnum } from '@/models/IUser';
import CalendarClientPage from '@/pages/CalendarPages/CalendarClientPage.vue';
import CalendarMasterPage from '@/pages/CalendarPages/CalendarMasterPage.vue';
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        RolesEnum,
    }),
    setup: () => {
        const auth = useAuthStore();

        const { authUser } = storeToRefs(auth);

        return { authUser };
    },
    components: { CalendarClientPage, CalendarMasterPage },
});
</script>
<template>
    <div>
        <CalendarClientPage v-if="authUser.role === RolesEnum.CLIENT" />
        <CalendarMasterPage v-else-if="authUser.role === RolesEnum.MASTER" />
    </div>
</template>

<style scoped></style>
