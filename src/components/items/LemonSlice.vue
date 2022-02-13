<template>
    <div class="lemon-slice-wrapper">
        <div class="lemon-1">
            <div class="seed seed1"></div>
            <div class="seed seed2"></div>
            <div class="seed seed3"></div>
            <div class="seed seed4"></div>
            <div class="seed seed5"></div>
            <div class="seed seed6"></div>
        </div>

        <div class="half-lemon lemon-2">
            <div class="seeds seed1"></div>
            <div class="seeds seed2"></div>
            <div class="seeds seed3"></div>
            <div class="seeds seed4"></div>
        </div>
        <div class="half-lemon lemon-3">
            <div class="seeds seed1"></div>
            <div class="seeds seed2"></div>
            <div class="seeds seed3"></div>
            <div class="seeds seed4"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LEMON_SCALE } from '@/config';
import { CupSize } from '@/types';
import { computed, PropType } from 'vue';

const props = defineProps({
    cupSize: {
        type: String as PropType<CupSize>,
        default: 'M'
    }
})

const lemonScale = computed(() => LEMON_SCALE[props.cupSize]);
</script>

<style lang="less">
.lemon-slice-wrapper {
    .lemon-1 {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        position: absolute;
        border: 6px solid #fdde23;
        top: -10%;
        left: -10%;
        z-index: 5;
        background: #fff;
        transform-origin: 50% 50%;
        transform: translate(-50%, -50%) scale(v-bind(lemonScale));
        .seed {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 40px solid #fdde23;
            border-radius: 100%;
        }
        .seed1 {
            left: 20px;
            top: 3px;
            transform: rotate(-10deg);
        }
        .seed2 {
            left: 3px;
            top: 17px;
            transform: rotate(-70deg);
        }
        .seed3 {
            left: 7px;
            top: 39px;
            transform: rotate(-130deg);
        }
        .seed4 {
            left: 27px;
            top: 45px;
            transform: rotate(-190deg);
        }
        .seed5 {
            left: 44px;
            top: 33px;
            transform: rotate(110deg);
        }
        .seed6 {
            left: 40px;
            top: 11px;
            transform: rotate(50deg);
        }
    }

    .half-lemon {
        position: absolute;
        width: 100px;
        height: 50px;
        background: #fff;
        border-radius: 100px 100px 0 0;
        border: 5px solid #fdde23;
        border-bottom: 0;

        .seeds {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 40px solid #fdde23;
            border-radius: 100%;
        }
        .seed1 {
            left: 8px;
            bottom: -10px;
            transform: rotate(-70deg);
        }
        .seed2 {
            left: 20px;
            bottom: 2px;
            transform: rotate(-20deg);
        }
        .seed3 {
            left: 38px;
            bottom: 2px;
            transform: rotate(25deg);
        }
        .seed4 {
            left: 50px;
            top: 15px;
            transform: rotate(70deg);
        }

        &.lemon-2 {
            left: 40%;
            bottom: 12%;
            transform: rotate(120deg) scale(v-bind(lemonScale));
        }

        &.lemon-3 {
            top: 40%;
            left: -20px;
            transform: rotate(-95deg) scale(v-bind(lemonScale));
            animation: floatLemon 6s ease-in alternate infinite;
        }

        @keyframes floatLemon {
            from {
                transform: translateY(-12px) rotate(-95deg)
                    scale(v-bind(lemonScale));
            }
            to {
                transform: translateY(12px) rotate(-120deg)
                    scale(v-bind(lemonScale));
            }
        }
    }
}
</style>