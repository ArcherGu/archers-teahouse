<template>
    <div class="way-switch">
        <label class="switch-label" :class="{ 'checked': value }">
            <input type="checkbox" class="switch-input" v-model="value" @change="onChange" />

            <div class="switch-track flex">
                <div class="w-1/2 flex-center z-100" :class="{ 'text-light-900': !value }">外送</div>
                <div class="w-1/2 flex-center z-100" :class="{ 'text-light-900': value }">自取</div>
            </div>
            <div class="switch-thumb"></div>
        </label>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    value: {
        type: Boolean,
        default: false // false: 外送，true: 自取
    }
})

const emit = defineEmits(['change', 'update:value'])
const onChange = () => {
    emit('change', props.value)
    emit('update:value', props.value)
}


</script>

<style lang="less">
.way-switch {
    position: relative;

    .switch-label {
        cursor: pointer;
        &.checked {
            .switch-thumb {
                left: 52px;
            }
        }

        .switch-track {
            @apply bg-gray-300;
            position: absolute;
            top: 3px;
            height: 30px;
            width: 100px;
            border-radius: 4px;

            transition: background-color 0.1s linear;
        }

        .switch-thumb {
            @apply bg-cyan-500;
            position: absolute;
            top: 5px;
            left: 2px;
            height: 26px;
            width: 46px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgb(0 0 0 / 40%);
            transition: all 0.2s ease;
        }

        .switch-input {
            position: absolute;
            opacity: 0;

            &:focus ~ .ui-switch-focus-ring {
                transform: scale(1);
                opacity: 1;
            }
        }
    }
}
</style>