<script lang="ts">
import { defineComponent } from 'vue';
import { IconsEnum } from '@/types/Theme';
import {
    HomeOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    SettingOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'icon-by-name',
    data: () => ({
        IconsEnum,
    }),
    props: {
        icon: {
            required: false,
            type: Object as () => IconsEnum,
        },
    },
    components: {
        HomeOutlined,
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        SettingOutlined,
        FieldTimeOutlined,
    },
});
</script>

<template>
    <home-outlined v-if="icon === IconsEnum.HomeOutlined" />
    <setting-outlined v-else-if="icon === IconsEnum.SettingOutlined" />
    <field-time-outlined v-else-if="icon === IconsEnum.FieldTimeOutlined" />
</template>

<style scoped></style>
