<template>
    <div class="tea">
        <Cup :size="cupSize">
            <BaseTea :teaType="teaType"></BaseTea>
            <transition name="fade">
                <IceCube :cupSize="cupSize" v-if="diyItems.some(e => e === 'Ice')" />
            </transition>

            <transition name="fade">
                <PearlBall v-if="diyItems.some(e => e === 'Pearl')" />
            </transition>

            <transition name="fade">
                <CoconutFruitCube v-if="diyItems.some(e => e === 'CoconutFruit')" />
            </transition>

            <transition name="fade">
                <Straw :cupSize="cupSize" :diyItems="diyItems" v-if="makeStep === 'ENJOY'" />
            </transition>
        </Cup>

        <transition name="fade">
            <LemonSlice :cupSize="cupSize" v-if="diyItems.some(e => e === 'Lemon')" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import Cup from "./Cup.vue";
import BaseTea from "./BaseTea.vue";
import { toRefs } from "vue";
import { teaProps, diyItems, makeStep } from "@/store";
import { IceCube, PearlBall, LemonSlice, CoconutFruitCube, Straw } from "./items";

const { cupSize, teaType } = toRefs(teaProps)

</script>

<style lang="less">
.tea {
    position: relative;
}
</style>