import { gsap, Power1 } from 'gsap';
import { ref } from 'vue';

export default {
    name: 'countAnimation',
    mounted(
        el: any,
        binding: {
            value: { duration: number; timeout: number; to: number };
        },
    ) {
        setTimeout(() => {
            gsap.to(el, {
                innerText: binding.value.to,
                duration: binding.value.duration,
                ease: Power1.easeIn,
                snap: 'innerText',
            });
        }, binding.value.timeout);
    },
};
