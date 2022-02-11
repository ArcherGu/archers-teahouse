<template>
    <div class="h-full bg-gray-300">
        <div class="header p-10px relative">
            <div class="mt-2">
                <img :src="logo" alt="不上茶屋" class="h-40px" />

                <div class="text-gray-400 ml-2 mt-1">假装这里有一家奶茶店 😂</div>
                <div></div>
            </div>
            <div class="absolute right-110px top-40px">
                <WaySwitch v-model:value="isHimself" />
            </div>
        </div>
        <div class="tea-type-selector">
            <div class></div>
            <div></div>
        </div>
        <div class="tea-wrapper">
            <Tea />
        </div>

        <button @click="triggerCupSize" class="mr-4">切换尺寸: {{ teaProps.cupSize }}</button>

        <button @click="triggerBaseTea">切换底茶: {{ teaProps.teaType }}</button>
    </div>
</template>

<script setup lang="ts">
import { Tea, WaySwitch } from "./components";
import { teaProps } from "./store/tea";
import type { TeaType } from "./types";
import logo from "@/assets/logo.png";
import { ref } from "vue";

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

const teaTypes: TeaType[] = ['milk', 'red', 'green', 'milk tea', 'coffee', 'soda'];
let teaTypesIndex = 0;
const triggerBaseTea = () => {
    teaTypesIndex++;
    if (teaTypesIndex >= teaTypes.length) {
        teaTypesIndex = 0;
    }

    teaProps.teaType = teaTypes[teaTypesIndex];
}

</script>

<style lang="less">
.header {
    @apply shadow-md bg-white h-120px absolute top-0 left-0 w-full z-10;
}

.tea-type-selector {
    @apply bg-gray-100 h-full w-100px absolute top-120px left-0 z-1;
}

.tea-wrapper {
    @apply flex items-center justify-center h-full w-full pl-100px pt-120px;
}
</style>
