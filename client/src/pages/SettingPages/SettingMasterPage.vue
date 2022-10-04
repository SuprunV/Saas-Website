<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { defineComponent } from 'vue';

export default defineComponent({
    setup: () => {},
});
</script>

<template>
    <div>
        <h1 class="text-center">Settings for master</h1>
        <ul>
                <li>Есть фото профиля</li>
                <li>Может менять личные данные</li>
                <li>Имя,Фамилия, возраст, Пол, почта</li>
                <li>Будет написано, к какой фирме принадлежит</li>
                <li>Будет блок со статистикой:</li>
                <li>Сколько сделанных услуг</li>
                <li>Весь оборот его услуг</li>
                <li>Ниже будет перечень услуг, которые он предоставляет, стоимость и продолжительность.</li>
                <li>Мастер может выбрать свой график работы - выбирает дни недели и время (перерывы)</li>
            </ul>
    </div>
</template>

<style scoped></style>
