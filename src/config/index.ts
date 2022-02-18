import type { BaseTeaItem, BaseTeaProps, CupSize, DiyItemParams, TeaType } from "@/types";
import IIconParkOutlineMilk from '~icons/icon-park-outline/milk';
import ITablerCup from '~icons/tabler/cup'
import ITablerCoffee from '~icons/tabler/coffee';
import IFileIconsLeaflet from '~icons/file-icons/leaflet';
import IFluentLeafThree24Regular from '~icons/fluent/leaf-three24-regular';
import IIconParkOutlineBubbleChart from '~icons/icon-park-outline/bubble-chart';
import { CoconutFruit, Pearl, Ice, Lemon } from "@/assets/svg";

export const CUP_WIDTH = 180;
export const CUP_BOTTOM_OFFSET = 24;
export const LIQUID_TO_TOP_OFFSET = 20;
export const CUP_HEIGHT: { [key in CupSize]: number } = {
    'S': 260,
    'M': 320,
    'L': 340
}

export const BASE_TEA: { [key in TeaType]: BaseTeaProps } = {
    'milk': {
        color: "rgb(255 255 255 / 80%)",
    },
    'red': {
        color: "rgb(177 9 9 / 50%)",
        linearColor: "rgb(177 9 9 / 60%)",
        leaf: true,
    },
    'green': {
        color: "rgb(118 193 29 / 50%)",
        linearColor: "rgb(29 86 2 / 50%)",
        leaf: true,
    },
    'milk tea': {
        color: "rgb(249 205 158 / 50%)",
        linearColor: "rgb(249 205 158 / 60%)"
    },
    'coffee': {
        color: "rgb(96 39 2 / 70%)",
        linearColor: "rgb(106 45 5 / 80%)",
    },
    'soda': {
        color: "rgb(255 255 159 / 30%)",
        linearColor: "rgb(54 135 70 / 30%)",
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
        bgColor: "#f59e0b"
    },
    {
        name: '柠檬',
        type: 'Lemon',
        icon: Lemon,
        bgColor: "#14b8a6"
    },
    {
        name: '冰块',
        type: 'Ice',
        icon: Ice,
        bgColor: '#0ea5e9'
    }
]

export const ICE_CUBE_SIZE: { [key in CupSize]: string } = {
    'S': "48px",
    'M': '60px',
    'L': '60px'
}

export const LEMON_SCALE: { [key in CupSize]: string } = {
    'S': "0.7",
    'M': "0.9",
    'L': "1"
}

export const ENJOY_BG_COLOR: string[] = [
    '#fecdd3',
    '#fde68a',
    '#bbf7d0',
    '#a5f3fc',
    '#edeade',
    '#e9d5ff',
    '#e4e4e7'
]