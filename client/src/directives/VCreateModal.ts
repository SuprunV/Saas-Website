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
        const modal = document.querySelector('.modal-window')!;
        const modalCopy = el.cloneNode(true);
        modal.appendChild(modalCopy);
        el.style.display = 'none';
        console.log(binding.value.show);
        if (binding.value.show) {
            modal.classList.remove('modal-window-hidden');

            el.style.animationDelay = `500ms`;
            el.classList.add('animated');
            el.classList.add('fadeInUp');
        }
    },
};
