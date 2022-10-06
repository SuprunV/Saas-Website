<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import ClientSettingForm from '@/components/ClientSettingForm.vue';

export default defineComponent({
    setup: () => {},
    data: () => ({
        changeSetingModal: false
    }),
    methods: {
        showChangeModal() {
            this.changeSetingModal = true;
        },
        submitChangeForm() {
            // this.changeSetingModal = false;
        }
    },
    components: { ClientSettingForm },
});
</script>

<template>
    <div>
        <h1 class="text-center">Settings for Client</h1>
        <div>
            <ul>
                <li>Есть фото профиля</li>
                <li>Может менять личные данные</li>
                <li>Имя,Фамилия, возраст, Пол, почту</li>
                <li>Будет блок со статистикой:</li>
                <li>Посмотреть историю посещений</li>
                <li>На скольких услугах побывал</li>
            </ul>
            <a-button type="primary" @click="showChangeModal">Change data</a-button>
            <a-modal v-model:visible="changeSetingModal" title="Basic Modal" @ok="submitChangeForm">
        <div class="dialog__content">
            <ClientSettingForm/>
        </div>
    </a-modal>
            
        </div>
    </div>
</template>

<style scoped></style>
