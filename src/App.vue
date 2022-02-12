<template>
    <div class="h-full bg-gray-300">
        <div class="header p-10px relative">
            <div class="mt-1">
                <img :src="logo" alt="不上茶屋" class="h-40px" />

                <div class="text-gray-400 ml-1 mt-1">
                    假装这里有一家奶茶店
                    <i-twemoji-rolling-on-the-floor-laughing class="inline-block mx-1" />
                </div>
                <div class="text-sm ml-1 mt-1 border-2 border-black rounded-5px inline-block pr-2">
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
        <div class="tea-type-selector" :class="{ disabled: makeStep !== 'BASE' }">
            <div class="tea-type-selector-wrapper">
                <div
                    v-for="item in BASE_TEA_ITEMS"
                    class="tea-type-item cursor-pointer"
                    :class="{ active: teaType === item.type }"
                    :key="item.type"
                    @click="triggerTeaType(item.type)"
                >
                    <div>
                        <div class="flex-center">
                            <component :is="item.icon" class="text-3xl <md:text-2xl" />
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
                    :class="{ disabled: makeStep !== 'BASE' }"
                    @click="changeStep('DIY')"
                >开始定制</button>

                <button class="back-base" v-if="makeStep === 'DIY'" @click="changeStep('BASE')">
                    <i-akar-icons-arrow-back />
                </button>

                <div class="cup-size-selector">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Tea, WaySwitch } from "./components";
import { teaProps, makeStep } from "./store";
import { MakeStep, TeaType } from "./types";
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

const changeStep = (step: MakeStep) => {
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
    @apply bg-gray-100 w-100px absolute top-120px left-0 <md:w-80px flex items-center justify-center;
    height: calc(100% - 120px);
    transition: all 0.5s ease;
    z-index: 50;

    &.disabled {
        transform: translateX(-100px);
    }

    .tea-type-selector-wrapper {
        @apply py-20px px-10px relative overflow-y-auto;

        max-height: 100%;
        .tea-type-item {
            @apply h-100px w-80px flex items-center justify-center text-gray-400 relative <md:w-60px <md:h-80px;
            transition: all 0.2s ease;

            &.active {
                @apply text-gray-700;
            }
        }

        &::before {
            content: "";
            --item-tab-offset: 100px;
            @media (max-width: 767.9px) {
                --item-tab-offset: 80px;
            }
            content: "";
            position: absolute;
            @apply h-100px w-80px bg-white rounded-lg shadow-lg <md:w-60px <md:h-80px;

            top: calc(var(--item-tab-offset) * v-bind(activeIndex) + 20px);
            transition: all 0.2s ease;
        }
    }
}

.tea-wrapper {
    @apply flex items-center justify-center h-full w-full pl-100px pt-120px relative;
    transition: all 0.5s ease;
    padding-left: v-bind('makeStep === "BASE"? "100px" : "0px"');

    .diy-btn {
        @apply w-full rounded-xl bg-cyan-500 h-15 text-white font-bold mt-10 shadow-xl <md:h-12;
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