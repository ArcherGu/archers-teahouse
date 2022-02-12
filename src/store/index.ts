import type { TeaProps, BaseTeaProps, TeaType } from "@/types";
import { reactive } from "vue";

export const teaProps = reactive<TeaProps>({
    cupSize: 'M',
    teaType: 'milk tea'
})

