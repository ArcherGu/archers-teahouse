<template>
    <div class="pearl-ball-wrapper">
        <div class="ball ball-1"></div>
        <div class="ball ball-2"></div>
        <div class="ball ball-3"></div>
        <div class="ball ball-4"></div>
        <div class="ball ball-5"></div>
        <div class="ball ball-6"></div>
        <div class="ball ball-7"></div>
        <div class="ball ball-8"></div>
        <div class="ball ball-9"></div>
        <div class="ball ball-10"></div>
        <div class="ball ball-11"></div>
        <div class="ball ball-12"></div>
        <div class="ball ball-13"></div>
        <div class="ball ball-14"></div>
        <div class="ball ball-15"></div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="less">
.pearl-ball-wrapper {
    .ball {
        --animation-time: 2s;
        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background: #462713;
        animation: floatBall var(--animation-time) infinite ease-in-out;

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

        &.ball-1 {
            bottom: 10px;
            left: 5px;
            --animation-time: 2.2s;
            z-index: 10;
        }
        &.ball-2 {
            bottom: 16px;
            left: 25px;
            --animation-time: 3s;
            z-index: 30;
        }
        &.ball-3 {
            bottom: 11px;
            left: 45px;
            --animation-time: 2.8s;
            z-index: 10;
        }
        &.ball-4 {
            bottom: 23px;
            left: 65px;
            --animation-time: 1.8s;
            z-index: 10;
        }
        &.ball-5 {
            bottom: 14px;
            right: 5px;
            --animation-time: 1.5s;
            z-index: 30;
        }
        &.ball-6 {
            bottom: 33px;
            right: 25px;
            --animation-time: 2.4s;
            z-index: 80;
        }
        &.ball-7 {
            bottom: 15px;
            right: 45px;
            --animation-time: 2.4s;
            z-index: 10;
        }
        &.ball-8 {
            bottom: 30px;
            right: 65px;
            --animation-time: 2s;
            z-index: 80;
        }
        &.ball-9 {
            bottom: 45px;
            left: 15px;
            --animation-time: 3s;
            z-index: 10;
        }
        &.ball-10 {
            bottom: 53px;
            left: 45px;
            --animation-time: 2.8s;
            z-index: 30;
        }
        &.ball-11 {
            bottom: 46px;
            left: 66px;
            --animation-time: 1.8s;
            z-index: 80;
        }
        &.ball-12 {
            bottom: 50px;
            right: 15px;
            --animation-time: 1.5s;
            z-index: 80;
        }
        &.ball-13 {
            bottom: 52px;
            right: 56px;
            --animation-time: 2.4s;
            z-index: 30;
        }
        &.ball-14 {
            bottom: 49px;
            right: 35px;
            --animation-time: 2.4s;
            z-index: 30;
        }
        &.ball-15 {
            bottom: 40px;
            right: 5px;
            --animation-time: 2s;
            z-index: 10;
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