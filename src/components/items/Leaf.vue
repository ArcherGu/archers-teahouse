<template>
    <div class="leaf-wrapper">
        <div class="leaf" :class="teaType"></div>
    </div>
</template>

<script setup lang="ts">
import { TeaType } from '@/types';
import { PropType } from 'vue';

const props = defineProps({
    teaType: {
        type: String as PropType<TeaType>,
        default: 'milk tea'
    }
})

</script>

<style lang="less">
.leaf-wrapper {
    .leaf {
        width: 30px;
        height: 60px;
        border-radius: 0 100% 0 100%;
        position: absolute;
        transform: rotate(190deg);
        overflow: hidden;
        &:after {
            content: "";
            position: absolute;
            height: 120px;
            width: 60px;
            transform: scale(1);
        }
    }

    .green.leaf {
        z-index: 10;
        top: 15%;
        left: 6px;
        animation: greenFloatLeaf 5s ease-in alternate infinite;
        &:after {
            background-image: linear-gradient(65deg, #168168 50%, #2d9174 50%);
        }
    }

    .red.leaf {
        z-index: 80;
        top: 10%;
        right: 23px;
        animation: redFloatLeaf 5s ease-in alternate infinite;
        &:after {
            background-image: linear-gradient(65deg, #992b3a 50%, #743542 50%);
        }
    }

    @keyframes greenFloatLeaf {
        from {
            transform: translateY(-20px) rotate(-10deg);
        }
        to {
            transform: translateY(-10px) rotate(0);
        }
    }

    @keyframes redFloatLeaf {
        from {
            transform: translateY(-20px) rotate(-100deg);
        }
        to {
            transform: translateY(-10px) rotate(-90deg);
        }
    }
}
</style>