<template>
    <div class="way-switch flex cursor-pointer" :class="{ enable: myVal }" @click="onChange">
        <div class="w-1/2 flex-center z-100" :class="{ 'text-light-900': !value }">外送</div>
        <div class="w-1/2 flex-center z-100" :class="{ 'text-light-900': value }">自取</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    value: {
        type: Boolean,
        default: false // false: 外送，true: 自取
    }
});

const myVal = ref(props.value);

const emit = defineEmits(['change', 'update:value'])
const onChange = () => {
    myVal.value = !myVal.value;
    emit('change', myVal.value)
    emit('update:value', myVal.value)
}
</script>

<style lang="less">
.way-switch {
    @apply bg-gray-300;
    position: relative;
    height: 30px;
    width: 100px;
    border-radius: 4px;

    &::before {
        content: "";
        @apply bg-cyan-500;
        position: absolute;
        top: 2px;
        left: 2px;
        height: 26px;
        width: 46px;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgb(0 0 0 / 40%);
        transition: all 0.2s ease;
    }

    &.enable::before {
        left: 52px;
    }
}
</style>