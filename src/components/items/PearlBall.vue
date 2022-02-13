<template>
    <div class="pearl-ball-wrapper">
        <div v-for="num in 15" class="ball" :style="randomStyles()" :key="`pearl-ball-${num}`"></div>
    </div>
</template>

<script setup lang="ts">
import random from 'random';

const randomStyles = () => `
        --random-bottom: ${random.int(10, 60)}px; 
        --random-left: ${random.int(5, 120)}px;
        --random-animation-time: ${random.float(1.5, 3).toFixed(1)}s;
        --random-zIndex: ${random.int(10, 80)};
    `

</script>

<style lang="less">
.pearl-ball-wrapper {
    .ball {
        --random-bottom: 10px;
        --random-left: 15px;
        --random-animation-time: 2s;
        --random-zIndex: 10;

        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background: #462713;
        animation: floatBall var(--random-animation-time) infinite ease-in-out;

        bottom: var(--random-bottom);
        left: var(--random-left);
        z-index: var(--random-zIndex);

        &::before,
        &::after {
            position: absolute;
            content: "";
            background: #fff;
            border-radius: 50%;
        }

        &::before {
            top: 4px;
            left: 4px;
            height: 4px;
            width: 4px;
            opacity: 0.8;
        }

        &::after {
            top: 8px;
            left: 8px;
            height: 2px;
            width: 2px;
            opacity: 0.6;
        }

        @keyframes floatBall {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            50% {
                transform: translate(0, -3px) rotate(20deg);
            }
            100% {
                transform: translate(0, 0px) rotate(0deg);
            }
        }
    }
}
</style>