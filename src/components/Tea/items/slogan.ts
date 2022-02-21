import { Container, Sprite } from "pixi.js";
import sloganImg from "@/assets/slogan.png";
import { CupSize } from "@/types";
import { CUP_HEIGHT } from "@/config";

export class Slogan extends Container {
    private imgSprite: Sprite;
    private cupHeight: number;
    constructor(cupSize: CupSize = 'M', visible: boolean = false) {
        super();
        this.zIndex = 200;
        this.visible = visible;
        this.cupHeight = CUP_HEIGHT[cupSize];

        this.imgSprite = Sprite.from(sloganImg);
        this.imgSprite.scale.set(0.5, 0.5);

        this.addChild(this.imgSprite);
    }

    updatePosition() {
        this.position.set(-this.width / 6, this.cupHeight + this.height - 25)
    }

    changeVisible(visible?: boolean) {
        this.visible = !!visible;
        this.updatePosition();
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.updatePosition();
    }
}