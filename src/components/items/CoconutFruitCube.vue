<template>
    <div class="coconut-fruit-cube-wrapper">
        <div
            v-for="num in 50"
            class="fruit-cube"
            :style="randomStyles()"
            :key="`fruit-cube-${num}`"
        ></div>
    </div>
</template>

<script setup lang="ts">
import random from 'random';

const randomStyles = () => `
        --random-bottom: ${random.int(10, 150)}px; 
        --random-left: ${random.int(5, 120)}px;
        --random-animation-time: ${random.float(1.5, 3).toFixed(1)}s;
        --random-zIndex: ${random.int(10, 80)};
        --random-rotate-deg: ${random.int(5, 180)}deg;
    `
</script>

<style lang="less">
.coconut-fruit-cube-wrapper {
    .fruit-cube {
        --random-bottom: 10px;
        --random-left: 15px;
        --random-animation-time: 2s;
        --random-zIndex: 10;
        --random-rotate-deg: 0deg;

        position: absolute;
        height: 10px;
        width: 20px;
        background: #eaedf0;
        opacity: 0.7;
        box-shadow: inset 0px 0px 25px #fff;
        animation: floatFruitCube var(--random-animation-time) infinite
            ease-in-out;
        bottom: var(--random-bottom);
        left: var(--random-left);
        z-index: var(--random-zIndex);

        @keyframes floatFruitCube {
            0% {
                transform: translate(0, 0) rotate(var(--random-rotate-deg));
            }
            50% {
                transform: translate(0, -3px)
                    rotate(calc(var(--random-rotate-deg) + 10deg));
            }
            100% {
                transform: translate(0, 0px) rotate(var(--random-rotate-deg));
            }
        }
    }
}
</style>