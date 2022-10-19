import { gsap, Power1 } from 'gsap';
import { ref } from 'vue';

export default {
    name: 'appearAnimation',
    mounted(
        el: any,
        binding: {
            value: { timeout: number };
        },
    ) {
        el.style.animationDelay = `${binding.value.timeout}ms`;
        el.classList.add('animated');
        el.classList.add('fadeInUp');
    },
};
