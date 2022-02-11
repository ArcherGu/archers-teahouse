<template>
    <div class="cup">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CupSize } from '@/types';
import type { PropType } from 'vue';

const props = defineProps({
    size: {
        type: String as PropType<CupSize>,
        default: 'M'
    }
})

const cupSizeObj = computed(() => {
    const obj = {
        width: "150px",
        height: "250px",
        perspective: "15px"
    }
    switch (props.size) {
        case 'S':
            obj.height = "200px";
            break;
        case 'L':
            obj.height = "300px";
            break;
        case 'XL':
            obj.height = "350px";
            obj.width = "250px";
            obj.perspective = "25px"
            break;
        default:
            break;
    }

    return obj;
})

</script>

<style lang="less">
.cup {
    --cup-glass: rgba(254, 254, 254, 0.6);
    --cup-width: v-bind("cupSizeObj.width");
    --cup-height: v-bind("cupSizeObj.height");
    --cup-perspective: v-bind("cupSizeObj.perspective");

    position: relative;
    width: var(--cup-width);
    height: var(--cup-height);
    border: 5px solid var(--cup-glass);
    border-top: none;
    border-radius: 0 0 5px 5px;
    transform: perspective(var(--cup-perspective)) rotateX(-1deg);
    z-index: 1000;
    box-shadow: 10px 10px 25px 15px rgba(0, 0, 0, 0.2);
    &:after {
        content: "";
        width: var(--cup-width);
        height: 30px;
        background: transparent;
        position: absolute;
        left: -5px;
        bottom: 0;
        background: radial-gradient(
            100% 120% at top,
            transparent 50%,
            var(--cup-glass) 66%
        );
        z-index: 1000;
    }
}
</style>