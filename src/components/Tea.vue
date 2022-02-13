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
        </Cup>
    </div>
</template>

<script setup lang="ts">
import Cup from "./Cup.vue";
import BaseTea from "./BaseTea.vue";
import { toRefs } from "vue";
import { teaProps, diyItems } from "@/store";
import { IceCube, PearlBall } from "./items";

const { cupSize, teaType } = toRefs(teaProps)

</script>

<style>
</style>