<template>
    <div class="straw"></div>
</template>

<script setup lang="ts">
import { CupSize, DiyItems } from '@/types';
import { computed, PropType } from 'vue';

const props = defineProps({
    cupSize: {
        type: String as PropType<CupSize>,
        default: 'M'
    },
    diyItems: {
        type: Array as PropType<DiyItems[]>,
        default: () => []
    }
})

const strawObj = computed(() => {
    const obj = {
        height: "305px",
        right: "-18%"
    }
    switch (props.cupSize) {
        case 'S':
            obj.height = "260px";
            obj.right = "-20%"
            break;
        case 'L':
            obj.height = "350px";
            obj.right = "-15%"
            break;
        default:
            obj.height = "305px";
            obj.right = "-18%"
            break;
    }

    return obj;
})

const coarseObj = computed(() => {
    if (props.diyItems.some(e => e === 'CoconutFruit' || e === 'Pearl')) {
        return {
            borderTop: "0",
            borderLeft: "15px",
            borderRadius: "0",
            rightOffset: "8%",
            heightOffset: "10px"
        }
    }
    else {
        return {
            borderTop: "5px",
            borderLeft: "5px",
            borderRadius: "10px",
            rightOffset: "0%",
            heightOffset: "0px"
        }
    }
});

</script>

<style lang="less">
.straw {
    --straw-color: #6e594e;
    border-bottom: 0;
    border-right: 0;
    border-top: v-bind("coarseObj.borderTop") solid var(--straw-color);
    border-left: v-bind("coarseObj.borderLeft") solid var(--straw-color);
    border-radius: v-bind("coarseObj.borderRadius") 0;
    height: calc(v-bind("strawObj.height") + v-bind("coarseObj.heightOffset"));
    width: 50px;
    position: absolute;
    right: calc(v-bind("strawObj.right") + v-bind("coarseObj.rightOffset"));
    bottom: 0%;
    transform: rotate(10deg);
}
</style>