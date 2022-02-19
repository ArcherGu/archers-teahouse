import { Component, FunctionalComponent } from "vue"

export type CupSize = 'S' | 'M' | 'L';

export type TeaType = 'milk' | 'red' | 'green' | 'milk tea' | 'coffee' | 'soda';

export type MakeStep = 'BASE' | 'DIY' | 'ENJOY';

export type DiyItems = 'CoconutFruit' | 'Pearl' | 'Lemon' | 'Ice';

export type LeafType = 'green' | 'red';

export interface TeaProps {
    cupSize: CupSize,
    teaType: TeaType
}

export interface BaseTeaProps {
    color: string;
    linearColor?: string;
    bubble?: boolean;
    leaf?: LeafType;
    leafColor?: string;
}

export interface BaseTeaItem {
    name: string;
    type: TeaType;
    icon: FunctionalComponent
}

export interface DiyItemParams {
    name: string;
    type: DiyItems;
    icon: Component;
    bgColor: string;
}