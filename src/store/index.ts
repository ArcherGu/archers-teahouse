import { TeaProps, MakeStep } from "@/types";
import { reactive, ref } from "vue";

export const teaProps = reactive<TeaProps>({
    cupSize: 'M',
    teaType: 'milk tea'
})

export const makeStep = ref<MakeStep>('BASE')
