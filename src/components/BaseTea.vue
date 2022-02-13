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
                <linearGradient id="linearTeaColor" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" :stop-color="baseTeaObj.color" />
                    <stop offset="100%" :stop-color="baseTeaObj.linearColor || baseTeaObj.color" />
                </linearGradient>

                <path
                    fill="url(#linearTeaColor)"
                    class="wave"
                    d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
            c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
            c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
                />
            </svg>
        </div>

        <Bubble v-if="!!baseTeaObj.bubble" />
        <Leaf v-if="!!baseTeaObj.leaf" :teaType="teaType" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TeaType } from '@/types';
import type { PropType } from 'vue';
import { BASE_TEA } from '@/config';
import { Bubble, Leaf } from './items';

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
    position: relative;
    .wave-wrapper {
        .wave {
            transition: all 1s ease;
            animation: wave-action 2s linear infinite;
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
}
</style>