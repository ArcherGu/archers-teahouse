<template>
    <div class="h-full flex-center bg-green-400">
        <Cup :size="cupSize">{{ cupSize }}</Cup>

        <button @click="triggerCupSize">切换尺寸</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Cup } from "./components/BaseTea";
import type { CupSize } from "./types";
const cupSize = ref<CupSize>('M');

const triggerCupSize = () => {
    if (cupSize.value === 'S') {
        cupSize.value = 'M'
    }
    else if (cupSize.value === 'M') {
        cupSize.value = 'L'
    }
    else if (cupSize.value === 'L') {
        cupSize.value = 'XL'
    }
    else {
        cupSize.value = 'S'
    }
}

</script>

<style lang="less">
</style>
