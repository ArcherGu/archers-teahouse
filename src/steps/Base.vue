<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { changeStep, makeStep, teaProps } from '@/store'
import { BASE_TEA_ITEMS } from '@/config'
import type { TeaType } from '@/types'

const triggerTeaType = (type: TeaType) => {
  teaProps.teaType = type
}
const { teaType } = toRefs(teaProps)
const activeIndex = computed(() => BASE_TEA_ITEMS.findIndex(e => e.type === teaProps.teaType))
</script>

<template>
  <transition name="slide-x">
    <div v-if="makeStep === 'BASE'" class="tea-type-selector">
      <div class="tea-type-selector-wrapper">
        <div
          v-for="item in BASE_TEA_ITEMS"
          :key="item.type"
          class="tea-type-item cursor-pointer"
          :class="{ active: teaType === item.type }"
          @click="triggerTeaType(item.type)"
        >
          <div>
            <div class="flex-center">
              <component :is="item.icon" class="text-3xl <md:text-2xl" />
            </div>
            <div class="flex-center mt-2">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <transition name="slide-y">
    <button v-if="makeStep === 'BASE'" class="diy-btn" @click="changeStep('DIY')">
      开始定制
    </button>
  </transition>
</template>

<style lang="less">
.tea-type-selector {
    @apply bg-gray-100 absolute left-0 flex items-center justify-center z-50;
    top: var(--header-height);
    height: calc(100% - var(--header-height));
    width: var(--selector-item-height);
    --slide-x-distance: translateX(-100px);

    .tea-type-selector-wrapper {
        @apply py-20px px-10px relative overflow-y-auto;

        max-height: 100%;
        .tea-type-item {
            @apply flex items-center justify-center text-gray-400 relative;
            height: var(--selector-item-height);
            width: var(--selector-item-width);
            transition: all 0.2s ease;

            &.active {
                @apply text-gray-700;
            }
        }

        &::before {
            content: "";
            position: absolute;
            height: var(--selector-item-height);
            width: var(--selector-item-width);
            @apply bg-white rounded-lg shadow-lg;

            top: calc(var(--selector-item-height) * v-bind(activeIndex) + 20px);
            transition: all 0.2s ease;
        }
    }
}

.diy-btn {
    @apply w-120px rounded-xl bg-cyan-500 h-15 text-white font-bold shadow-xl <md:h-12 absolute z-50;
    left: calc(50% - 60px + var(--selector-item-height) / 2);
    bottom: 5vh;
    transition: all 0.5s ease;
    --slide-y-distance: translateY(20vh);

    &:hover {
        @apply bg-cyan-600;
    }
}
</style>
