import type { BaseTeaItem, BaseTeaProps, DiyItemParams, TeaType } from "@/types";
import IIconParkOutlineMilk from '~icons/icon-park-outline/milk';
import ITablerCup from '~icons/tabler/cup'
import ITablerCoffee from '~icons/tabler/coffee';
import IFileIconsLeaflet from '~icons/file-icons/leaflet';
import IFluentLeafThree24Regular from '~icons/fluent/leaf-three24-regular';
import IIconParkOutlineBubbleChart from '~icons/icon-park-outline/bubble-chart';
import { CoconutFruit, Pearl, Pudding, Ice } from "@/assets/svg";

export const BASE_TEA: { [key in TeaType]: BaseTeaProps } = {
    'milk': {
        color: "rgb(255 255 255 / 70%)",
        linearColor: "rgb(255 255 255 / 100%)",
    },
    'red': {
        color: "rgb(200 49 49 / 70%)",
        linearColor: "rgb(136 23 23 / 80%)",
        leaf: true,
    },
    'green': {
        color: "rgb(49 167 80 / 60%)",
        linearColor: "rgb(54 135 70 / 90%)",
        leaf: true,
    },
    'milk tea': {
        color: "rgb(209 192 191 / 70%)",
    },
    'coffee': {
        color: "rgb(135 98 79 / 80%)",
        linearColor: "rgb(110 97 85)",
    },
    'soda': {
        color: "rgb(115 198 140 / 50%)",
        bubble: true,
    }
}

export const BASE_TEA_ITEMS: BaseTeaItem[] = [
    {
        name: '奶茶',
        type: 'milk tea',
        icon: ITablerCup
    },
    {
        name: '牛奶',
        type: 'milk',
        icon: IIconParkOutlineMilk
    },

    {
        name: '红茶',
        type: 'red',
        icon: IFileIconsLeaflet
    },
    {
        name: '绿茶',
        type: 'green',
        icon: IFluentLeafThree24Regular
    },
    {
        name: '咖啡',
        type: 'coffee',
        icon: ITablerCoffee
    },
    {
        name: '苏打水',
        type: 'soda',
        icon: IIconParkOutlineBubbleChart
    },
]

export const DIY_ITEMS: DiyItemParams[] = [
    {
        name: '椰果',
        type: 'CoconutFruit',
        icon: CoconutFruit,
        bgColor: "#84cc16"
    },
    {
        name: '珍珠',
        type: 'Pearl',
        icon: Pearl,
        bgColor: "#14b8a6"
    },
    {
        name: '布丁',
        type: 'Pudding',
        icon: Pudding,
        bgColor: "#f59e0b"
    },
    {
        name: '冰块',
        type: 'Ice',
        icon: Ice,
        bgColor: '#0ea5e9'
    }
]