<script setup lang="ts">
import { toRefs } from 'vue'
import { DIY_ITEMS } from '@/config'
import { changeStep, diyItems, makeStep, teaProps } from '@/store'
import type { CupSize, DiyItems } from '@/types'

const cupSizeArr: CupSize[] = ['S', 'M', 'L']

const changeCupSize = (size: CupSize) => {
  teaProps.cupSize = size
}

const changeDitItems = (item: DiyItems) => {
  const index = diyItems.findIndex(e => e === item)
  if (index > -1)
    diyItems.splice(index, 1)

  else
    diyItems.push(item)
}

const { cupSize } = toRefs(teaProps)
</script>

<template>
  <transition name="slide-x">
    <div v-if="makeStep === 'DIY'" class="diy-items-selector">
      <div
        v-for="item in DIY_ITEMS"
        :key="item.type"
        class="diy-items"
        :class="{ active: diyItems.some(e => e === item.type) }"
        :style="`background: ${item.bgColor}`"
        @click="changeDitItems(item.type)"
      >
        <i-fa-solid-plus class="mr-1 text-light-500 text-sm" />
        <component :is="item.icon" class="icon" />
      </div>
    </div>
  </transition>

  <transition name="slide-x">
    <div v-if="makeStep === 'DIY'" class="cup-size-selector">
      <div
        v-for="size in cupSizeArr"
        :key="size"
        class="cup-size-item"
        :class="{ active: cupSize === size }"
        @click="changeCupSize(size)"
      >
        {{ size }}
      </div>
    </div>
  </transition>

  <transition name="slide-y">
    <button v-if="makeStep === 'DIY'" class="enjoy-btn" @click="changeStep('ENJOY')">
      享用
      <i-noto-v1-two-hearts class="absolute top-2 right-2 text-20px" />
    </button>
  </transition>
</template>

<style lang="less">
.diy-items-selector {
    @apply absolute z-50;
    top: calc(50% - 110px + var(--header-height) / 2);
    left: 10px;
    --slide-x-distance: translateX(-100vw);
    .diy-items {
        @apply py-2px px-4px h-30px rounded-5px mb-10px  flex items-center justify-center cursor-pointer opacity-30;
        transition: all 0.5s ease;

        .icon {
            @apply h-20px w-20px;
        }

        &:last-child {
            @apply mb-0;
        }

        &.active {
            @apply border-gray-400 opacity-100;
        }
    }
}

.cup-size-selector {
    @apply absolute z-50;
    top: calc(50% - 100px + var(--header-height) / 2);
    right: 10px;
    --slide-x-distance: translateX(100vw);
    .cup-size-item {
        @apply w-40px h-40px rounded-full border-3 mb-10px border-gray-400 flex items-center justify-center text-xl text-gray-400 cursor-pointer;
        transition: all 1s ease;

        &:last-child {
            @apply mb-0;
        }

        &.active {
            @apply border-gray-700 text-gray-700;
        }
    }
}

.enjoy-btn {
    @apply w-120px rounded-xl bg-violet-300 h-15 text-white font-bold shadow-xl <md:h-12 absolute z-50;
    left: calc(50% - 60px);
    bottom: 5vh;
    transition: all 0.5s ease;
    --slide-y-distance: translateY(20vh);

    &:hover {
        @apply bg-violet-400;
    }
}
</style>
