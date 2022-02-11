<template>
    <div class="tea">
        <Cup :size="cupSize">
            <BaseTea :teaType="teaType"></BaseTea>
        </Cup>
    </div>
</template>

<script setup lang="ts">
import Cup from "./Cup.vue";
import BaseTea from "./BaseTea.vue";
import { toRefs } from "vue";
import { teaProps } from "@/store/tea";


const { cupSize, teaType } = toRefs(teaProps)

</script>

<style>
</style>