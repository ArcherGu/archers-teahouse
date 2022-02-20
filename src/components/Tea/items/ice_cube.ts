import { CUP_HEIGHT, LIQUID_TO_TOP_OFFSET } from "@/config";
import { CupSize } from "@/types";
import { Container, Graphics, Texture } from "pixi.js";
import { gsap } from "@/plugins";
import { Power1 } from "gsap";
import { radialGradient } from "../utils";



export class IceCube extends Container {
    private cubeTween: gsap.core.Tween;
    private cubeA: Graphics;
    private cubeB: Graphics;
    private cubeC: Graphics;
    private cupHeight: number;
    private cubeSize: number = 55;
    private cubeTexture: Texture;
    constructor(
        cupSize: CupSize,
        isIceCube?: boolean,
    ) {
        super();
        this.zIndex = 45;
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.visible = !!isIceCube;

        this.cubeA = new Graphics();
        this.cubeA.pivot.set(this.cubeSize / 2, this.cubeSize / 2)
        this.cubeA.position.set(80, LIQUID_TO_TOP_OFFSET + 5 + this.cubeSize / 2);
        this.cubeA.angle = -5;

        this.cubeTween = gsap.to(this.cubeA, {
            pixi: {
                y: LIQUID_TO_TOP_OFFSET + this.cubeSize / 2 - 5,
                angle: 5
            },
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
        })

        this.cubeB = new Graphics();
        this.cubeB.position.set(60, this.cupHeight - this.cubeSize - 2)
        this.cubeB.angle = -5;

        this.cubeC = new Graphics();
        this.cubeC.position.set(112, this.cupHeight - this.cubeSize * 2 - 7)
        this.cubeC.angle = 20;

        this.addChild(this.cubeA, this.cubeB, this.cubeC);

        this.cubeTexture = radialGradient('rgb(192 202 211 / 70%)', 'rgb(255 255 255 / 70%)', this.cubeSize, this.cubeSize, 1 / 4);
    }

    draw() {
        for (const cube of [this.cubeA, this.cubeB, this.cubeC]) {
            cube.clear();

            cube.beginTextureFill({
                texture: this.cubeTexture
            })
                .drawRoundedRect(0, 0, this.cubeSize, this.cubeSize, 5)
                .endFill();
        }
    }

    float() {
        if (!this.visible) {
            this.cubeTween.pause();
            return;
        }

        this.cubeTween.play();
        this.cubeB.position.set(60, this.cupHeight - this.cubeSize - 2);
        this.cubeC.position.set(112, this.cupHeight - this.cubeSize * 2 - 7);
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.float();
    }

    changeVisible(isIceCube: boolean) {
        this.visible = isIceCube;
        this.float();
    }
}