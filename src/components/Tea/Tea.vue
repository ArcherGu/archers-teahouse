<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { unrefElement } from '@vueuse/core'
import { Tea } from './tea'
import { makeStep } from '@/store'

const canvasWrapper = ref<HTMLElement>()
let tea: Tea
let lastSize = '0 + 0'

const onResize = () => {
  const wrapper = unrefElement(canvasWrapper)
  if (!wrapper)
    return
  const { clientHeight: height, clientWidth: width } = wrapper
  const currentSize = `${width} + ${height}`
  if (lastSize === currentSize)
    return

  lastSize = currentSize
  tea?.resize(width, height)
}

const toImage = () => {
  return tea?.toImage()
}

watch(
  canvasWrapper,
  () => {
    const wrapper = unrefElement(canvasWrapper)
    if (!wrapper)
      return
    tea = new Tea(wrapper)
    tea.init()
    window.addEventListener('resize', onResize, false)
  },
  {
    flush: 'post',
  },
)

watch(
  () => makeStep.value,
  () => {
    setTimeout(() => {
      onResize()
    }, 500)
  },
)

onUnmounted(() => {
  window.removeEventListener('resize', onResize, false)
})

defineExpose({
  toImage,
})
</script>

<template>
  <div ref="canvasWrapper" class="h-full w-full" />
</template>

<style></style>
