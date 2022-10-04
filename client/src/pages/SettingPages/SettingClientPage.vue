<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    setup: () => {},
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
        </div>
    </div>
</template>

<style scoped></style>
