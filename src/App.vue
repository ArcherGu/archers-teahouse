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
        <transition name="slide-x">
            <button
                class="top-btn step-back-btn"
                v-if="makeStep === 'DIY' || makeStep === 'ENJOY'"
                @click="changeStep(makeStep === 'DIY' ? 'BASE' : 'DIY')"
            >
                <i-akar-icons-arrow-back />
            </button>
        </transition>

        <BaseStep />
        <DiyStep />
        <EnjoyStep />
        <div class="tea-wrapper">
            <div id="tea-share-box">
                <Tea />
            </div>
        </div>

        <transition name="slide-x">
            <button class="top-btn tea-share-btn" v-if="makeStep === 'ENJOY'" @click="shareTea">
                <i-fluent-share-android-24-regular />
            </button>
        </transition>

        <transition name="fade">
            <div
                class="share-modal-wrapper"
                v-if="makeStep === 'ENJOY' && isShareModal"
                @click="hideShareModal"
            >
                <div class="share-modal">
                    <img :src="teaShareImg" alt="不上茶屋特供" class="share-img" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { Tea, WaySwitch } from "./components";
import { makeStep, changeStep } from "./store";
import logo from "@/assets/logo.png";
import { ref, watch } from "vue";
import { BaseStep, DiyStep, EnjoyStep } from "./steps";
import domtoimage from 'dom-to-image';

const isHimself = ref(false);

const isShareModal = ref(false);
const teaShareImg = ref<string>("");

watch(
    () => makeStep.value,
    () => {
        if (makeStep.value !== 'ENJOY') {
            isShareModal.value = false;
            teaShareImg.value = "";
        }
    }
)

const shareTea = async () => {
    const teaShareEl = document.getElementById("tea-share-box");
    if (!teaShareEl) return;

    if (teaShareImg.value) {
        isShareModal.value = true;
        return;
    }

    teaShareImg.value = await domtoimage.toPng(teaShareEl);
    isShareModal.value = true
}

const hideShareModal = () => {
    isShareModal.value = false
}
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

    #tea-share-box {
        padding: 100px;
    }
}

.tea-share-btn {
    @apply right-10px;
    --slide-x-distance: translateX(100px);
}

.share-modal-wrapper {
    @apply absolute top-0 left-0 w-full h-full z-1000;
    .share-modal {
        @apply w-4/5 p-10px relative;
        transition: all 0.5s ease;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .share-img {
            position: relative;
            z-index: 10;
        }

        &::before {
            @apply absolute border-10 border-gray-400 border-double shadow-2xl bg-white z-5;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            transform: rotate(5deg);
        }

        &::after {
            @apply absolute border-10 border-gray-400 border-double shadow-2xl bg-white z-8;
            content: "";
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
        }
    }
}
</style>