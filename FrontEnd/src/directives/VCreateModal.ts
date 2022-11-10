import { useThemeStore } from '@/store/useTheme';
import DateBody from 'ant-design-vue/lib/vc-picker/panels/DatePanel/DateBody';
import { gsap, Power1 } from 'gsap';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
    name: 'createModal',
    mounted(
        el: any,
        binding: {
            value: {
                show: boolean;
                width: number;
            };
        },
    ) {
        el.classList.add('modal-window', 'modal-window-hidden');
        if (binding.value.width)
            el.querySelector('div').style.width = `${binding.value.width}%`;
    },
    methods: {},
    updated(
        el: any,
        binding: {
            value: {
                show: boolean;
            };
        },
    ) {
        if (binding.value.show) {
            el.classList.remove('modal-window-hidden');
            document.body.style.overflow = 'hidden';
            // console.log('updated is true');
            // const modal = document.querySelector('body')!;
            // modal.classList.add('modal-window');
            // el.style.animationDelay = `500ms`;
            // el.classList.add('animated');
            // el.classList.add('fadeInUp');
        } else {
            el.classList.add('modal-window', 'modal-window-hidden');

            document.body.style.overflow = 'auto';
            // document
            //     .querySelector('.modal-window')!
            //     .classList.add('modal-window-hidden');
            // modal.classList.add('modal-window-hidden');
            // el.style.animationDelay = `500ms`;
            // el.classList.remove('animated');
            // el.classList.remove('fadeInUp');
            // el.classList.add('animated');
            // el.classList.add('fadeInDown');
        }
    },
};
