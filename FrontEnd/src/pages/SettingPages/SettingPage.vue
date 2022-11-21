<script lang="ts">
import { RolesEnum } from '@/models/IUser';
import SettingUserPage from '@/pages/SettingPages/SettingUserPage.vue';
import SettingCompanyPage from '@/pages/SettingPages/SettingCompanyPage.vue';
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

        const { authUser } = storeToRefs(auth);


        return { authUser };
    },
    components: { SettingUserPage, SettingCompanyPage },
});
</script>
<template>
    <div v-appearAnimation="{ timeout: 100 }">
        <SettingUserPage v-if="authUser.role === RolesEnum.CLIENT || authUser.role === RolesEnum.MASTER" />
        <SettingCompanyPage v-else-if="authUser.role === RolesEnum.COMPANY" />
    </div>
</template>

<style scoped></style>
