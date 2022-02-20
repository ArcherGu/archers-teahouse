import { CUP_HEIGHT } from "@/config";
import { CupSize } from "@/types";
import { Container, Graphics } from "pixi.js";
import { BaseItemsContainer, Options } from "./base_items_container";

export class CoconutFruitCube extends BaseItemsContainer {
    constructor(opt: Options) {
        super(opt);
    }

    draw() {

    }

    animate() {

    }

    changeVisible(visible?: boolean) {
        if (this.visible === !!visible) return;
        this.visible = !!visible;
        this.animate();
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.animate();
    }
}