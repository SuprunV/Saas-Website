<script lang="ts">
import { RolesEnum } from '@/models/IUser';
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
    data: () => ({
        RolesEnum,
    }),
    setup: () => {
        console.log('settings for master drawn');
        const auth = useAuthStore();
        auth.hasAccess();
        const { authUser } = storeToRefs(auth);
        return { authUser };
    },
});
</script>

<template>
    <div></div>
</template>

<style scoped></style>
