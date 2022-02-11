import type { TeaProps, BaseTeaProps, TeaType } from "@/types";
import { reactive } from "vue";

export const teaProps = reactive<TeaProps>({
    cupSize: 'M',
    teaType: 'milk tea'
})

export const BASE_TEA: { [key in TeaType]: BaseTeaProps } = {
    'milk': {
        color: "rgb(255 255 255 / 70%)",
    },
    'red': {
        color: "rgb(167 49 49 / 70%)",
        leaf: true,
    },
    'green': {
        color: "rgb(49 167 80 / 40%)",
        leaf: true,
    },
    'milk tea': {
        color: "rgb(209 192 191 / 70%)",
    },
    'coffee': {
        color: "rgb(135 98 79 / 80%)",
    },
    'soda': {
        color: "rgb(225 235 225 / 80%)",
        bubble: true,
    }
}