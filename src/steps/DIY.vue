<template>
    <transition name="slide-x">
        <button class="diy-back-btn" v-if="makeStep === 'DIY'" @click="changeStep('BASE')">
            <i-akar-icons-arrow-back />
        </button>
    </transition>

    <transition name="slide-x">
        <div class="cup-size-selector" v-if="makeStep === 'DIY'">
            <div
                v-for="size in cupSizeArr"
                :key="size"
                class="cup-size-item"
                :class="{ active: cupSize === size }"
                @click="changeCupSize(size)"
            >{{ size }}</div>
        </div>
    </transition>

    <transition name="slide-y">
        <button class="order-btn" v-if="makeStep === 'DIY'" @click="changeStep('BASE')">下单制作</button>
    </transition>
</template>

<script setup lang="ts">
import { teaProps, makeStep, changeStep } from "@/store";
import { CupSize } from "@/types";
import { toRefs } from "vue";

const cupSizeArr: CupSize[] = ['S', 'M', 'L']

const changeCupSize = (size: CupSize) => {
    teaProps.cupSize = size
}

const { cupSize } = toRefs(teaProps);
</script>

<style lang="less">
.cup-size-selector {
    @apply absolute z-50;
    top: calc(50% - 100px + var(--header-height) / 2);
    right: 10px;
    --slide-x-distance: translateX(100vw);
    .cup-size-item {
        @apply w-40px h-40px rounded-full border-3 mb-10px border-gray-400 flex items-center justify-center text-xl text-gray-400 cursor-pointer;
        transition: all 0.5s ease;

        &:last-child {
            @apply mb-0;
        }

        &.active {
            @apply border-gray-700 text-gray-700;
        }
    }
}

.order-btn {
    @apply w-120px rounded-xl bg-cyan-500 h-15 text-white font-bold shadow-xl <md:h-12 absolute z-50;
    left: calc(50% - 60px);
    bottom: 5vh;
    --slide-y-distance: translateY(20vh);

    &:hover,
    &:active,
    &:focus {
        @apply bg-cyan-600;
    }
}

.diy-back-btn {
    @apply absolute top-130px left-10px text-3xl text-gray-400 z-50;
    --slide-x-distance: translateX(-100px);
}
</style>