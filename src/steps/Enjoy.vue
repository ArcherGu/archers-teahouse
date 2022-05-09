<script setup lang="ts">
import { ENJOY_BG_COLOR } from '@/config'
import { changeBgColor, makeStep } from '@/store'
</script>

<template>
  <transition name="slide-y">
    <div v-if="makeStep === 'ENJOY'" class="enjoy-bg-color-wrapper">
      <div
        v-for="(color, index) in ENJOY_BG_COLOR"
        :key="index"
        class="enjoy-bg-color"
        :style="{ background: color }"
        @click="changeBgColor(color)"
      />
    </div>
  </transition>
</template>

<style lang="less">
.enjoy-bg-color-wrapper {
    @apply flex items-center justify-center absolute z-50;
    left: calc(50% - 100px);
    bottom: 5vh;
    --slide-y-distance: translateY(20vh);

    .enjoy-bg-color {
        @apply w-20px h-20px rounded-full border-2 mr-10px border-gray-100 cursor-pointer;

        &::last-child {
            @apply mr-0;
        }
    }
}
</style>
