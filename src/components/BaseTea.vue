<template>
    <div class="base-tea">
        <slot></slot>
        <div class="wave-wrapper">
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="1000"
                height="1000"
                viewBox="0 0 1000 1000"
                xml:space="preserve"
            >
                <path
                    class="wave"
                    d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
            c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
            c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
                />
            </svg>
        </div>

        <div class="bubble-wrapper" v-if="!!baseTeaObj.bubble">
            <div class="bubble bubble1"></div>
            <div class="bubble bubble2"></div>
            <div class="bubble bubble3"></div>
            <div class="bubble bubble4"></div>
        </div>

        <div class="leaf-wrapper" v-if="!!baseTeaObj.leaf">
            <div class="leaf" :class="teaType"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TeaType } from '@/types';
import type { PropType } from 'vue';
import { BASE_TEA } from '@/config';

const props = defineProps({
    teaType: {
        type: String as PropType<TeaType>,
        default: 'milk tea'
    }
})

const baseTeaObj = computed(() => {
    const obj = BASE_TEA[props.teaType]
    return obj
})

</script>

<style lang="less">
.base-tea {
    --base-tea-color: v-bind("baseTeaObj.color");
    position: relative;
    .wave-wrapper {
        .wave {
            transition: all 1s ease;
            animation: wave-action 2s linear infinite;

            fill: var(--base-tea-color);
        }

        @keyframes wave-action {
            0% {
                transform: translate(-150px, 0);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    }

    .bubble-wrapper {
        .bubble {
            border-radius: 40px;
            background: rgba(255, 255, 255, 0.4);
            position: absolute;
            animation-delay: 1s;
        }

        .bubble1 {
            width: 10px;
            height: 10px;
            animation: bubbleAnimation 1s ease-in infinite,
                sideways 0.5s ease-in infinite alternate;
            left: 20%;
        }
        .bubble2 {
            width: 12px;
            height: 12px;
            left: 30%;
            animation: bubbleAnimation 1.5s ease-in infinite,
                sideways 0.3s ease-in infinite alternate;
        }
        .bubble3 {
            width: 8px;
            height: 8px;
            left: 70%;
            animation: bubbleAnimation 3.5s ease-in infinite,
                sideways 0.5s ease-in infinite alternate;
        }
        .bubble4 {
            width: 8px;
            height: 8px;
            left: 90%;
            animation: bubbleAnimation 2.5s ease-in infinite,
                sideways 1s ease-in infinite alternate;
        }

        @keyframes bubbleAnimation {
            from {
                bottom: -15%;
            }
            to {
                bottom: 110%;
            }
        }
    }

    .leaf-wrapper {
        .leaf {
            width: 40px;
            height: 80px;
            border-radius: 0 100% 0 100%;
            position: absolute;
            transform: rotate(190deg);
            overflow: hidden;
            z-index: 10;
            &:after {
                content: "";
                position: absolute;
                height: 120px;
                width: 60px;
            }
        }

        .green.leaf {
            bottom: 12px;
            left: 6px;
            animation: greenFloatLeaf 5s ease-in alternate infinite;
            &:after {
                background-image: linear-gradient(
                    65deg,
                    #168168 50%,
                    #2d9174 50%
                );
            }
        }

        .red.leaf {
            bottom: -10px;
            right: 23px;
            animation: redFloatLeaf 5s ease-in alternate infinite;
            &:after {
                background-image: linear-gradient(
                    65deg,
                    #992b3a 50%,
                    #743542 50%
                );
            }
        }

        @keyframes greenFloatLeaf {
            from {
                transform: translateY(-20px) rotate(-10deg);
            }
            to {
                transform: translateY(-10px) rotate(0);
            }
        }

        @keyframes redFloatLeaf {
            from {
                transform: translateY(-20px) rotate(-100deg);
            }
            to {
                transform: translateY(-10px) rotate(-90deg);
            }
        }
    }
}
</style>