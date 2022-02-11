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