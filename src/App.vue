<template>
    <div class="h-full bg-gray-300">
        <div class="header p-10px relative">
            <div class="mt-1">
                <img :src="logo" alt="不上茶屋" class="h-40px" />

                <div class="text-gray-400 ml-1 mt-1">
                    假装这里有一家奶茶店
                    <i-twemoji-rolling-on-the-floor-laughing class="inline-block mx-1" />
                </div>
                <div class="text-sm ml-1 mt-1 border-2 border-black rounded-2px inline-block pr-2">
                    <div class="flex items-center">
                        <i-icon-park-shop class="inline-block mx-1" v-if="!isHimself" />
                        <i-icon-park-sleep class="inline-block mx-1" v-else />

                        <span
                            class="border-l-2 border-black pl-2"
                        >{{ isHimself ? '请在梦中享受您的茶饮' : '这是一杯永远无法送达的茶饮' }}</span>
                    </div>
                </div>
            </div>
            <div class="absolute right-110px top-40px">
                <WaySwitch v-model:value="isHimself" />
            </div>
        </div>
        <div
            class="tea-type-selector flex-center"
            :class="{ disabled: makeStep !== MAKE_STEP.BASE }"
        >
            <div class="tea-type-selector-wrapper">
                <div class="item-tab"></div>
                <div
                    v-for="item in BASE_TEA_ITEMS"
                    class="tea-type-item cursor-pointer"
                    :class="{ active: teaType === item.type }"
                    :key="item.type"
                    @click="triggerTeaType(item.type)"
                >
                    <div>
                        <div class="flex-center">
                            <component :is="item.icon" class="text-3xl" />
                        </div>
                        <div class="flex-center mt-2">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tea-wrapper">
            <div class="mt-10">
                <Tea />
                <button
                    class="diy-btn"
                    :class="{ disabled: makeStep !== MAKE_STEP.BASE }"
                    @click="changeStep(MAKE_STEP.DIY)"
                >开始定制</button>

                <button
                    class="back-base"
                    v-if="makeStep === MAKE_STEP.DIY"
                    @click="changeStep(MAKE_STEP.BASE)"
                >
                    <i-akar-icons-arrow-back />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Tea, WaySwitch } from "./components";
import { teaProps, makeStep } from "./store";
import { MAKE_STEP, TeaType } from "./types";
import logo from "@/assets/logo.png";
import { computed, ref, toRefs } from "vue";
import { BASE_TEA_ITEMS } from "./config";
const isHimself = ref(false);

const triggerCupSize = () => {
    if (teaProps.cupSize === 'S') {
        teaProps.cupSize = 'M'
    }
    else if (teaProps.cupSize === 'M') {
        teaProps.cupSize = 'L'
    }
    else {
        teaProps.cupSize = 'S'
    }
}

const triggerTeaType = (type: TeaType) => {
    teaProps.teaType = type;
}

const changeStep = (step: MAKE_STEP) => {
    makeStep.value = step;
}

const { teaType } = toRefs(teaProps);

const activeIndex = computed(() => BASE_TEA_ITEMS.findIndex(e => e.type === teaProps.teaType));

</script>

<style lang="less">
.header {
    @apply shadow-md bg-white h-120px absolute top-0 left-0 w-full z-10;
}

.tea-type-selector {
    @apply bg-gray-100 w-100px absolute top-120px left-0;
    height: calc(100vh - 120px);
    transition: all 0.5s ease;
    overflow-y: auto;
    z-index: 50;

    &.disabled {
        transform: translateX(-100px);
    }

    .tea-type-selector-wrapper {
        position: relative;
        .tea-type-item {
            @apply h-100px w-80px flex items-center justify-center text-gray-400 relative;
            transition: all 0.2s ease;

            &.active {
                @apply text-gray-700;
            }
        }

        & .item-tab {
            content: "";
            position: absolute;
            @apply h-100px w-80px bg-white rounded-lg shadow-lg;
            left: 0px;
            top: calc(100px * v-bind(activeIndex));
            transition: all 0.2s ease;
        }
    }
}

.tea-wrapper {
    @apply flex items-center justify-center h-full w-full pl-100px pt-120px relative;
    transition: all 0.5s ease;
    padding-left: v-bind('makeStep === MAKE_STEP.BASE? "100px" : "0px"');

    .diy-btn {
        @apply w-full rounded-xl bg-cyan-500 h-15 text-white font-bold mt-10 shadow-xl;
        transition: all 0.5s ease;
        &.disabled {
            transform: translateY(50vh);
        }

        &:hover,
        &:active,
        &:focus {
            @apply bg-cyan-600;
        }
    }

    .back-base {
        @apply absolute top-130px left-10px text-3xl text-gray-400;
    }
}
</style>