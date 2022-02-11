<template>
    <div class="h-full flex-center bg-gray-300">
        <Tea />

        <button @click="triggerCupSize" class="mr-4">切换尺寸: {{ teaProps.cupSize }}</button>

        <button @click="triggerBaseTea">切换底茶: {{ teaProps.teaType }}</button>
    </div>
</template>

<script setup lang="ts">
import { Tea } from "./components";
import { teaProps } from "./store/tea";
import type { TeaType } from "./types";

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
</style>
