import { Graphics } from "pixi.js";
import { CupSize } from "@/types";
import { CUP_HEIGHT } from "@/config";

export interface BaseItem {
    item: Graphics;
    tween?: gsap.core.Tween
}

export interface Options {
    cupSize?: CupSize;
    visible?: boolean
}

export abstract class BaseItemsContainer {
    protected group: BaseItem[] = [];
    protected cupHeight: number;
    private _visible: boolean

    constructor({ cupSize = 'M', visible = false }: Options) {
        this._visible = visible;
        this.cupHeight = CUP_HEIGHT[cupSize];
    }

    get items() {
        return this.group.map(e => e.item);
    }

    get visible() {
        return this._visible;
    }

    set visible(val: boolean) {
        this._visible = val;
        this.group.forEach(e => e.item && (e.item.visible = val))
    }

    abstract draw(): any

    abstract animate(): any

    abstract changeVisible(visible: boolean): any

    abstract changeCupSize(cupSize: CupSize): any
}