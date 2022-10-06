

<template>
  
    <a-calendar v-model:value="value" >
      <template #dateCellRender="{ current }" fullscreen = false>
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current }">
        <div v-if="getMonthData(current)" class="notes-month">
          <section>{{ getMonthData(current) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar> 
    <aside :class="`${is_expanded && 'is_expanded'}`">
    <div class="menu-toggle-wrap"> 
        <button class="menu-toggle" @click="ToggleMenu">
            <span class="material-icons">keyboard_double_arrow_right </span>
        </button>
    </div>
   </aside>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Dayjs } from 'dayjs';

 
  export default defineComponent({
    name: 'main-calendar',
    setup() {
        const is_expanded  = ref(false);
  const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
  }
      const value = ref<Dayjs>();
  
      const getListData = (value: Dayjs) => {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ];
            break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ];
            break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ];
            break;
          default:
        }
        return listData || [];
      };
      const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
          return 1394;
        }
      };
  
      return {
        
        value,
        getListData,
        getMonthData,
        is_expanded,
        ToggleMenu
      };
    },
  });
  </script>

  <style Lang="scss" scoped>
  aside{
        /* display: flex;
        flex-direction: row;
        width: var(--sidebar-width);
        position: absolute;
        right: 0;

        background-color: var(--dark);
        color: var(--light); */
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    width: calc(2rem + 32px);
    min-height: 50vh;
    right: 0;
    position: absolute;
    text-align: center;
    overflow: hidden;
    padding: 1rem;
   

    background-color: var(--dark);
     color: var(--light);
    
    transition: 0.2s ease-out;


    @media (max-width: 768px){
        position: fixed;
        z-index: 99;
    }


    }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 50%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
 
  </style>

<!-- <template> 
   <div>
        Hei
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'main-calendar'
    })
</script> -->