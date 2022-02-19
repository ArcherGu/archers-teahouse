import { CupSize } from "@/types";
import { Container, Graphics } from "pixi.js";
import { gsap } from "@/plugins";
import { Power1 } from "gsap";
import { CUP_HEIGHT, LIQUID_TO_TOP_OFFSET } from "@/config";

interface BubbleProps {
    size: number;
    left: number;
    duration: number
}

interface BubbleItem {
    bubble: Graphics;
    tween?: gsap.core.Tween
}

const BUBBLES_PROPS: BubbleProps[] = [
    {
        size: 6,
        left: 40,
        duration: 1
    },
    {
        size: 8,
        left: 75,
        duration: 1.5
    },
    {
        size: 4,
        left: 110,
        duration: 3.5
    },
    {
        size: 4,
        left: 140,
        duration: 2.5
    }
]

export class Bubble extends Container {
    private items: BubbleItem[] = [];
    private cupHeight: number;
    constructor(
        cupSize: CupSize,
        isBubble?: boolean
    ) {
        super();
        this.zIndex = 50;
        this.visible = !!isBubble;
        this.cupHeight = CUP_HEIGHT[cupSize];

        for (let i = 0; i < BUBBLES_PROPS.length; i++) {
            this.items.push({
                bubble: new Graphics()
            });
        }
        this.addChild(...this.items.map(e => e.bubble));
    }

    draw() {
        for (let i = 0; i < this.items.length; i++) {
            const props = BUBBLES_PROPS[i];
            const bubble = this.items[i].bubble;
            bubble.clear();

            bubble.beginFill(0xffffff, 1)
                .drawCircle(0, 0, props.size)
                .endFill();

            bubble.position.set(props.left, this.cupHeight)
        }
    }

    bubbling() {
        if (!this.visible) {
            this.items.forEach(e => e.tween?.kill());
            return;
        }

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            item.tween?.kill();
            gsap.set(item.bubble, {
                pixi: {
                    y: this.cupHeight - 5
                }
            });

            item.tween = gsap.to(item.bubble, {
                pixi: {
                    y: LIQUID_TO_TOP_OFFSET + 2,
                },
                duration: BUBBLES_PROPS[i].duration,
                repeat: -1,
                ease: Power1.easeIn
            })
        }
    }

    changeVisible(isBubble?: boolean) {
        this.visible = !!isBubble;
        this.bubbling();
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.bubbling();
    }
}