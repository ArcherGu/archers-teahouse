import { TeaProps, MakeStep, DiyItems } from "@/types";
import { reactive, ref } from "vue";

export const teaProps = reactive<TeaProps>({
    cupSize: 'M',
    teaType: 'milk tea'
})

export const makeStep = ref<MakeStep>('BASE');

export const diyItems = ref<DiyItems[]>([]);

export function changeStep(step: MakeStep) {
    makeStep.value = step
}

