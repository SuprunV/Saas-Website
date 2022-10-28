import DateBody from 'ant-design-vue/lib/vc-picker/panels/DatePanel/DateBody';
import { gsap, Power1 } from 'gsap';
import { ref } from 'vue';

export default {
    name: 'createModal',
    mounted(
        el: any,
        binding: {
            value: {
                show: boolean;
            };
        },
    ) {
        document.body.classList.add('modal-parent');
        el.classList.add('modal-window-hidden');
        el.classList.remove('modal-window');
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
            el.classList.add('modal-window');
            // console.log('updated is true');
            // const modal = document.querySelector('body')!;
            // modal.classList.add('modal-window');
            // el.style.animationDelay = `500ms`;
            // el.classList.add('animated');
            // el.classList.add('fadeInUp');
        } else {
            el.classList.add('modal-window-hidden');
            el.classList.remove('modal-window');

            // modal.classList.add('modal-window-hidden');
            // el.style.animationDelay = `500ms`;
            // el.classList.remove('animated');
            // el.classList.remove('fadeInUp');
            // el.classList.add('animated');
            // el.classList.add('fadeInDown');
        }
    },
};
