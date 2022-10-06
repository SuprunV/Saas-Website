<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive, ref } from 'vue';
import ClientSettingForm from '@/components/ClientSettingForm.vue';

export default defineComponent({
    setup: () => {
        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const formState = reactive({
            user: {
                name: '',
                surname: '',
                age: undefined,
                email: '',
                gender: '',
            },
        });

        return {
            changeRef,
            isChangeModal,
            formState,
            layout,
            validateMessages,
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
    },
    components: { ClientSettingForm },
});
</script>

<template>
    <div>
        <h1 class="text-center">Settings for Client</h1>
        <div>
            <a-descriptions title="Client Info" bordered="true">
            <a-descriptions-item label="Name" :span="3">Eren</a-descriptions-item>
            <a-descriptions-item label="Surname" :span="3">Yeager</a-descriptions-item>
            <a-descriptions-item label="Gender" :span="3">Male</a-descriptions-item>
            <a-descriptions-item label="Age" :span="3">15</a-descriptions-item>
            <a-descriptions-item label="Email" :span="3">eren.yeager@gmail.com</a-descriptions-item>
            </a-descriptions>
            <a-button type="primary" @click="showChangeModal"
                >Change data</a-button
            >
            <ClientSettingForm v-model:show="isChangeModal" />
        </div>
    </div>
</template>

<style scoped></style>
