<template>
    <transition name="slide-y">
        <div class="enjoy-bg-color-wrapper" v-if="makeStep === 'ENJOY'">
            <div
                class="enjoy-bg-color"
                v-for="(color, index) in ENJOY_BG_COLOR"
                :key="index"
                :style="{ background: color }"
                @click="changeBgColor(color)"
            ></div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ENJOY_BG_COLOR } from "@/config";
import { makeStep, changeBgColor } from "@/store";
</script>

<style lang="less">
.enjoy-bg-color-wrapper {
    @apply flex items-center justify-center absolute z-50;
    left: calc(50% - 100px);
    bottom: 5vh;
    .enjoy-bg-color {
        @apply w-20px h-20px rounded-full border-2 mr-10px border-gray-100 cursor-pointer;

        &::last-child {
            @apply mr-0;
        }
    }
}
</style>