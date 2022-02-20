import { CupSize } from "@/types";
import { Graphics } from "pixi.js";
import { gsap } from "@/plugins";
import { Power1 } from "gsap";
import { CUP_HEIGHT, LIQUID_TO_TOP_OFFSET } from "@/config";
import { BaseItemsContainer, Options } from "./base_items_container";

interface BubbleProps {
    size: number;
    left: number;
    duration: number
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

export class Bubbles extends BaseItemsContainer {
    constructor(opt: Options) {
        super(opt);

        this.zIndex = 50;

        for (let i = 0; i < BUBBLES_PROPS.length; i++) {
            this.group.push({
                item: new Graphics()
            });
        }
        this.addChild(...this.group.map(e => e.item));
    }

    draw() {
        for (let i = 0; i < this.group.length; i++) {
            const props = BUBBLES_PROPS[i];
            const bubble = this.group[i].item;
            bubble.clear();

            bubble.beginFill(0xffffff, 1)
                .drawCircle(0, 0, props.size)
                .endFill();

            bubble.position.set(props.left, this.cupHeight)
        }
    }

    animate() {
        if (!this.visible) {
            this.group.forEach(e => e.tween?.kill());
            return;
        }

        for (let i = 0; i < this.group.length; i++) {
            const item = this.group[i]
            item.tween?.kill();
            gsap.set(item.item, {
                pixi: {
                    y: this.cupHeight - 5
                }
            });

            item.tween = gsap.to(item.item, {
                pixi: {
                    y: LIQUID_TO_TOP_OFFSET + 2,
                },
                duration: BUBBLES_PROPS[i].duration,
                repeat: -1,
                ease: Power1.easeIn
            })
        }
    }

    changeVisible(visible?: boolean) {
        this.visible = !!visible;
        this.animate();
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize];
        this.animate();
    }
}