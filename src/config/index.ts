import type { BaseTeaItem, BaseTeaProps, TeaType } from "@/types";
import IIconParkOutlineMilk from '~icons/icon-park-outline/milk';
import ITablerCup from '~icons/tabler/cup'
import ITablerCoffee from '~icons/tabler/coffee';
import IFileIconsLeaflet from '~icons/file-icons/leaflet';
import IFluentLeafThree24Regular from '~icons/fluent/leaf-three24-regular';
import IIconParkOutlineBubbleChart from '~icons/icon-park-outline/bubble-chart';

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