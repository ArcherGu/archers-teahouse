<template>
    <div class="cup">
        <slot></slot>

        <div class="cup-border cup-border-l"></div>
        <div class="cup-border cup-border-r"></div>
        <div class="cup-border-t"></div>
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
        width: "135px",
        height: "250px"
    }
    switch (props.size) {
        case 'S':
            obj.height = "240px";
            break;
        case 'L':
            obj.height = "320px";
            break;
        default:
            obj.height = "280px";
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
    position: relative;
    width: var(--cup-width);
    height: var(--cup-height);
    border-bottom: 5px solid var(--cup-glass);
    border-radius: 0 0 5px 5px;

    .cup-border {
        position: absolute;

        height: var(--cup-height);
        width: 5px;
        z-index: 200;

        bottom: 0px;
    }

    .cup-border-l {
        border-left: 5px solid var(--cup-glass);
        transform: rotateZ(-5deg) translateX(-13px);
    }

    .cup-border-r {
        border-right: 5px solid var(--cup-glass);
        right: 1px;
        transform: rotateZ(5deg) translateX(13px);
    }

    .cup-border-t {
        position: absolute;
        border-top: 0.2px solid rgba(255, 255, 255, 0.4);
        top: -3px;
        left: -20px;
        height: 2px;
        width: 170px;
    }

    z-index: 10;
    &:after {
        content: "";
        width: var(--cup-width);
        height: 30px;
        background: transparent;
        position: absolute;
        left: 0px;
        bottom: 0;
        background: radial-gradient(
            100% 120% at top,
            transparent 50%,
            var(--cup-glass) 66%
        );
        z-index: 200;
    }

    .base-tea {
        position: absolute;
        width: calc(var(--cup-width) - 10px);
        height: calc(var(--cup-height) - 20px);
        bottom: 0;
        // overflow: hidden;
        z-index: 100;
    }
}
</style>