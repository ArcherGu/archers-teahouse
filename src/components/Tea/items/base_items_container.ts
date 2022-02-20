import { Container, Graphics } from "pixi.js";
import { gsap } from "@/plugins";
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

export abstract class BaseItemsContainer extends Container {
    protected group: BaseItem[] = [];
    protected cupHeight: number = 0;

    constructor({ cupSize = 'M', visible = false }: Options) {
        super();

        this.visible = visible;
        this.cupHeight = CUP_HEIGHT[cupSize];
    }

    abstract draw(): any

    abstract animate(): any

    abstract changeVisible(visible: boolean): any

    abstract changeCupSize(cupSize: CupSize): any
}