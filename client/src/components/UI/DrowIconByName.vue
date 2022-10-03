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
    props: {
        icon: {
            required: true,
            type: IconsEnum,
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
    <div></div>
</template>

<style scoped></style>
