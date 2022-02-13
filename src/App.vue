<template>
    <div class="h-full bg-gray-300 overflow-hidden">
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
            <div class="absolute right-10px top-45px">
                <WaySwitch v-model:value="isHimself" />
            </div>
        </div>
        <BaseStep />
        <DiyStep />
        <EnjoyStep />
        <div class="tea-wrapper">
            <div>
                <Tea />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Tea, WaySwitch } from "./components";
import { makeStep } from "./store";
import logo from "@/assets/logo.png";
import { ref } from "vue";
import { BaseStep, DiyStep, EnjoyStep } from "./steps";
const isHimself = ref(false);
</script>

<style lang="less">
.header {
    @apply shadow-md bg-white absolute top-0 left-0 w-full z-10;
    height: var(--header-height);
}

.tea-wrapper {
    @apply flex items-center justify-center h-full w-full relative;
    transition: all 0.5s ease;
    padding-top: var(--header-height);
    padding-left: v-bind(
        'makeStep === "BASE"? "var(--selector-item-height)" : "0px"'
    );
}
</style>