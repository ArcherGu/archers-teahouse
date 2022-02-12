import { TeaProps, BaseTeaProps, TeaType, MAKE_STEP } from "@/types";
import { reactive, ref } from "vue";

export const teaProps = reactive<TeaProps>({
    cupSize: 'M',
    teaType: 'milk tea'
})

export const makeStep = ref<MAKE_STEP>(MAKE_STEP.BASE)
