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
import { teaProps, diyItems } from "@/store";
import { IceCube, PearlBall, LemonSlice, CoconutFruitCube } from "./items";

const { cupSize, teaType } = toRefs(teaProps)

</script>

<style lang="less">
.tea {
    position: relative;
}
</style>