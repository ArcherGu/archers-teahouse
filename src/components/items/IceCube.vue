<template>
    <div class="ice-cube-wrapper">
        <div class="cube cube1"></div>
        <div class="cube cube2"></div>
        <div class="cube cube3"></div>
    </div>
</template>

<script setup lang="ts">
import { ICE_CUBE_SIZE } from '@/config';
import { CupSize, TeaType } from '@/types';
import { computed, PropType } from 'vue';

const props = defineProps({
    cupSize: {
        type: String as PropType<CupSize>,
        default: 'M'
    }
})

const cubeSize = computed(() => ICE_CUBE_SIZE[props.cupSize]);

</script>

<style lang="less">
.ice-cube-wrapper {
    .cube {
        width: v-bind(cubeSize);
        height: v-bind(cubeSize);
        border-radius: 5px;
        position: absolute;
        background: #c0cad3;
        opacity: 0.7;
        box-shadow: inset 0px 0px 25px #fff;
        left: 25%;
    }
    .cube1 {
        bottom: 5%;
        transform: rotate(-5deg);
        z-index: 75;
    }
    .cube2 {
        bottom: calc(v-bind(cubeSize) + 3px);
        left: 50%;
        transform: rotate(35deg);
        z-index: 25;
    }
    .cube3 {
        top: 6%;
        width: calc(v-bind(cubeSize) - 5px);
        height: calc(v-bind(cubeSize) - 10px);
        transform: rotate(5deg);
        animation: floatIce 2s infinite alternate;
        z-index: 50;
    }

    @keyframes floatIce {
        from {
            transform: translateY(-5px) rotate(5deg);
        }
        to {
            transform: translateY(2px) rotate(-5deg);
        }
    }
}
</style>