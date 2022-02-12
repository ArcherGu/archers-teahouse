import { Component, FunctionalComponent } from "vue"

export type CupSize = 'S' | 'M' | 'L';

export type TeaType = 'milk' | 'red' | 'green' | 'milk tea' | 'coffee' | 'soda';

export interface TeaProps {
    cupSize: CupSize,
    teaType: TeaType
}

export interface BaseTeaProps {
    color: string;
    bubble?: boolean;
    leaf?: boolean;
    leafColor?: string;
}

export interface BaseTeaItem {
    name: string;
    type: TeaType;
    icon: FunctionalComponent
}


export enum MAKE_STEP {
    BASE,
    DIY,
    ORDER
}