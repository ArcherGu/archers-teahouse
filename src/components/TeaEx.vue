<template>
    <div class="h-full w-full" ref="canvasWrapper"></div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { unrefElement } from '@vueuse/core';
import { Tea } from './Tea';
import { makeStep } from '@/store';

const canvasWrapper = ref(null);
let tea: Tea;
let lastSize = "0 + 0";

const onResize = () => {
    const wrapper = unrefElement(canvasWrapper) as HTMLElement;
    if (!wrapper) return;
    const { clientHeight: height, clientWidth: width } = wrapper;
    const currentSize = `${width} + ${height}`;
    if (lastSize === currentSize) return;

    lastSize = currentSize;
    tea?.resize(width, height)
}

watch(canvasWrapper, () => {
    const wrapper = unrefElement(canvasWrapper) as HTMLElement;
    if (!wrapper) return;
    tea = new Tea(wrapper);
    tea.init();
    window.addEventListener('resize', onResize, false);
}, {
    flush: 'post',
});

watch(() => makeStep.value, () => {
    setTimeout(() => {
        onResize()
    }, 500);
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize, false)
})
</script>

<style>
</style>