<script lang="ts">
import { RolesEnum } from '@/models/IUser';
import SettingClientPage from '@/pages/SettingPages/SettingClientPage.vue';
import SettingMasterPage from '@/pages/SettingPages/SettingMasterPage.vue';
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
        auth.hasAccess();

        const { authUser } = storeToRefs(auth);

        return { authUser };
    },
    components: { SettingClientPage, SettingMasterPage, SettingCompanyPage },
});
</script>
<template>
    <div>
        <SettingClientPage v-if="authUser.role === RolesEnum.CLIENT" />
        <SettingMasterPage v-else-if="authUser.role === RolesEnum.MASTER" />
        <SettingCompanyPage v-else-if="authUser.role === RolesEnum.COMPANY" />
    </div>
</template>

<style scoped></style>
