<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Tea, WaySwitch } from './components'
import { bgColor, changeStep, makeStep } from './store'
import { BaseStep, DiyStep, EnjoyStep } from './steps'
import logo from '@/assets/logo.png'

onMounted(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({ immediate: true })
})

const isHimself = ref(false)
const isShareModal = ref(false)
const teaShareImg = ref<string>('')
const teaRef = ref()

watch(
  () => makeStep.value,
  () => {
    if (makeStep.value !== 'ENJOY') {
      isShareModal.value = false
      teaShareImg.value = ''
    }
  },
)

const base64ToBlob = (code: string) => {
  const parts = code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) uInt8Array[i] = raw.charCodeAt(i)

  return new Blob([uInt8Array], {
    type: contentType,
  })
}

const downloadImage = () => {
  if (!teaShareImg.value)
    return
  const aLink = document.createElement('a')
  const blob = base64ToBlob(teaShareImg.value)
  aLink.download = '不上茶饮'
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

const shareTea = async () => {
  teaShareImg.value = teaRef.value.toImage()
  isShareModal.value = true
}

const hideShareModal = () => {
  isShareModal.value = false
}
</script>

<template>
  <div class="h-full overflow-hidden" :style="{ background: bgColor }">
    <div class="header p-10px relative">
      <div class="mt-1">
        <img :src="logo" alt="不上茶屋" class="h-40px">

        <div class="text-gray-400 ml-1 mt-1">
          假装这里有一家奶茶店
          <i-twemoji-rolling-on-the-floor-laughing class="inline-block mx-1" />
        </div>
        <div class="text-sm ml-1 mt-1 border-2 border-black rounded-5px inline-block pr-2">
          <div class="flex items-center">
            <i-icon-park-shop v-if="!isHimself" class="inline-block mx-1" />
            <i-icon-park-sleep v-else class="inline-block mx-1" />

            <span class="border-l-2 border-black pl-2">{{
              isHimself ? '请在梦中享受您的茶饮' : '这是一杯永远无法送达的茶饮'
            }}</span>
          </div>
        </div>
      </div>
      <div class="absolute right-10px top-45px">
        <WaySwitch v-model:value="isHimself" />
      </div>
    </div>
    <transition name="slide-x">
      <button
        v-if="makeStep === 'DIY' || makeStep === 'ENJOY'"
        class="top-btn step-back-btn"
        @click="changeStep(makeStep === 'DIY' ? 'BASE' : 'DIY')"
      >
        <i-akar-icons-arrow-back />
      </button>
    </transition>

    <BaseStep />
    <DiyStep />
    <EnjoyStep />
    <div class="tea-wrapper">
      <Tea ref="teaRef" />
    </div>

    <transition name="slide-x">
      <button v-if="makeStep === 'ENJOY'" class="top-btn tea-share-btn" @click="shareTea">
        <i-fluent-share-android-24-regular />
      </button>
    </transition>

    <transition name="fade">
      <div v-if="makeStep === 'ENJOY' && isShareModal" class="share-modal-wrapper" @click.self="hideShareModal">
        <div class="share-modal" @click="downloadImage">
          <div class="share-note">
            长按图片进行保存
          </div>
          <div class="share-bg" :style="{ backgroundColor: bgColor }" />
          <img :src="teaShareImg" alt="不上茶屋特供" class="share-img">
        </div>
      </div>
    </transition>

    <div class="foot">
      Made with
      <i-noto-v1-red-heart class="inline-block mr-1" />by
      <a target="_blank" href="https://archergu.me/">Archer Gu</a>
    </div>
  </div>
</template>

<style lang="less">
.header {
  @apply shadow-md bg-white absolute top-0 left-0 w-full z-10;
  height: var(--header-height);
}

.tea-wrapper {
  @apply flex items-center justify-center h-full w-full relative;
  transition: all 0.5s ease;
  padding-top: var(--header-height);
  padding-left: v-bind('makeStep === "BASE" ? "var(--selector-item-height)" : "0px"');

  #tea-share-box {
    position: relative;
    padding: 100px;
    --cup-perspective: 15px;
    --cup-rotate-x: -1deg;

    .slogan-img {
      @apply absolute bottom-50px left-12 h-30px z-1000;
      opacity: 0.6;
    }
  }
}

.tea-share-btn {
  @apply right-10px;
  --slide-x-distance: translateX(100px);
}

.share-modal-wrapper {
  @apply absolute top-0 left-0 w-full h-full z-1000;
  .share-modal {
    @apply p-10px relative;
    max-width: 300px;
    transition: all 0.5s ease;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .share-note {
      @apply absolute bottom-10px z-50;
    }

    .share-img {
      position: relative;
      z-index: 10;
    }

    .share-bg {
      @apply absolute z-6;
      top: 10px;
      left: 10px;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      transform: rotate(5deg);
    }

    &::before {
      @apply absolute border-10 border-gray-400 border-double shadow-2xl bg-white z-5;
      content: '';
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      transform: rotate(5deg);
    }

    &::after {
      @apply absolute border-10 border-gray-400 border-double shadow-2xl bg-white z-8;
      content: '';
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
    }
  }
}

.foot {
  width: 100%;
  position: absolute;
  bottom: 10px;
  text-align: center;
  z-index: 99;
  color: #71717a;
  font-size: 0.7rem;
  line-height: 1.25rem;
  transition: all 0.5s ease;
  padding-left: v-bind('makeStep === "BASE" ? "var(--selector-item-height)" : "0px"');
}

.foot a {
  color: #52525b;
  font-weight: inherit;
  text-decoration: none;
  border-bottom: 1px dotted rgba(125, 125, 125, 0.1);
  transition: all 0.3s ease-in-out;
  margin-left: 4px;
}

.foot a:hover {
  color: #00aa90;
  border-bottom: 1px dotted #00aa90;
}
</style>
