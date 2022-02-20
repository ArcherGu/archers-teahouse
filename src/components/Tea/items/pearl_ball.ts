import { CUP_BOTTOM_OFFSET, CUP_HEIGHT, CUP_WIDTH } from "@/config";
import { CupSize } from "@/types";
import { Container, Graphics } from "pixi.js";
import random from 'random';
import { gsap } from "@/plugins";
import { Power1 } from "gsap";

interface PearItem {
    pearl: Graphics;
    tween?: gsap.core.Tween
}

export class PearlBall extends Container {
    private items: PearItem[] = [];
    private cupHeight: number;
    constructor(
        cupSize: CupSize,
        isPear?: boolean
    ) {
        super();
        this.visible = !!isPear;
        this.cupHeight = CUP_HEIGHT[cupSize];

        const count = random.int(10, 15)
        for (let i = 0; i < count; i++) {
            this.items.push({
                pearl: new Graphics()
            })
        }

        this.addChild(...this.items.map(e => e.pearl));
        this.sortChildren();
    }

    draw() {
        for (const item of this.items) {
            const { pearl } = item;

            pearl.clear();
            pearl.beginFill(0x462713)
                .drawCircle(0, 0, 8)
                .endFill();

            pearl.beginFill(0xffffff)
                .drawCircle(3, 3, 2)
                .endFill();

            pearl.beginFill(0xffffff)
                .drawCircle(0.5, 0.5, 1)
                .endFill();

            const leftOffset = random.int(CUP_BOTTOM_OFFSET + 10, CUP_WIDTH - CUP_BOTTOM_OFFSET - 10);
            const bottomOffset = random.int(10, 60);
            pearl.position.set(
                leftOffset,
                this.cupHeight - bottomOffset
            )
        }
    }

    float() {
        if (!this.visible) {
            this.items.forEach(e => e.tween?.kill());
            return;
        }
        for (const item of this.items) {
            const { pearl } = item;
            const leftOffset = random.int(CUP_BOTTOM_OFFSET + 10, CUP_WIDTH - CUP_BOTTOM_OFFSET - 10);
            const bottomOffset = random.int(10, 60);

            item.tween?.kill();
            gsap.set(pearl, {
                pixi: {
                    x: leftOffset,
                    y: this.cupHeight - bottomOffset,
                    angle: random.int(0, 180),
                    zIndex: random.int(10, 80)
                }
            });

            item.tween = gsap.to(item.pearl, {
                pixi: {
                    x: leftOffset + random.int(-2, 2),
                    y: this.cupHeight - bottomOffset - random.int(0, 5),
                    angle: pearl.angle + random.int(-30, 30)
                },
                duration: random.float(2.5, 4),
                repeat: -1,
                yoyo: true,
                ease: Power1.easeInOut
            })
        }
    }

    changeVisible(isPear?: boolean) {
        this.visible = !!isPear;
        this.float();
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.float();
    }
}