import { LEAF_COLOR } from "@/config";
import { LeafType } from "@/types";
import { Graphics } from "pixi.js";
import { watch } from "vue";
import { gsap } from "@/plugins";
import { Power1 } from "gsap";

const Y_SCALE = 0.5;
const LEAF_SIZE = 70;

interface LeafFloat {
    from: [number, number];
    to: [number, number];
    angle: [number, number]; // [from,to]
}

const LEAF_FLOAT: { [key in LeafType]: LeafFloat } = {
    'green': {
        from: [25, 60],
        to: [25, 65],
        angle: [45, 50]
    },
    'red': {
        from: [90, 70],
        to: [90, 80],
        angle: [-35, -40]
    }
}
export class Leaf extends Graphics {
    private type: LeafType | undefined;
    private greenTween: gsap.core.Tween;
    private redTween: gsap.core.Tween;

    constructor(
        leafType?: LeafType
    ) {
        super();
        this.zIndex = 50;
        this.scale.set(1, 1 * Y_SCALE);
        this.type = leafType;

        watch(() => this.type, () => {
            this.visible = !!this.type;
        })

        const greenFloat = LEAF_FLOAT['green'];
        const redFloat = LEAF_FLOAT['red'];
        this.greenTween = gsap.fromTo(
            this,
            {
                pixi: {
                    x: greenFloat.from[0],
                    y: greenFloat.from[1],
                    angle: greenFloat.angle[0]
                }
            },
            {
                pixi: {
                    x: greenFloat.to[0],
                    y: greenFloat.to[1],
                    angle: greenFloat.angle[1]
                },
                duration: 5,
                repeat: -1,
                repeatDelay: 0.5,
                yoyo: true,
                ease: Power1.easeInOut
            },
        ).pause();

        this.redTween = gsap.fromTo(
            this,
            {
                pixi: {
                    x: redFloat.from[0],
                    y: redFloat.from[1],
                    angle: redFloat.angle[0]
                }
            },
            {
                pixi: {
                    x: redFloat.to[0],
                    y: redFloat.to[1],
                    angle: redFloat.angle[1]
                },
                duration: 5,
                repeat: -1,
                repeatDelay: 0.5,
                yoyo: true,
                ease: Power1.easeInOut
            },
        ).pause();
    }

    draw() {
        this.clear();
        if (!this.type) return;

        const color = LEAF_COLOR[this.type]
        this.beginFill(color[0])
            .moveTo(0, 0)
            .arcTo(LEAF_SIZE, 0, LEAF_SIZE, LEAF_SIZE, LEAF_SIZE)
            .endFill()

        this.beginFill(color[1])
            .moveTo(0, 0)
            .arcTo(0, LEAF_SIZE, LEAF_SIZE, LEAF_SIZE, LEAF_SIZE)
            .endFill();
    }

    changeType(type?: LeafType) {
        this.type = type;
        this.draw();
        this.float();
    }

    float() {
        if (!this.type || !this.visible) {
            this.greenTween.pause();
            this.redTween.pause();
            return;
        };

        const float = LEAF_FLOAT[this.type];
        this.position.set(...float.from);
        this.angle = 90//float.angle[0];

        if (this.type === 'green') {
            this.redTween.pause();
            this.greenTween.restart();
        }
        else {
            this.greenTween.pause();
            this.redTween.restart();
        }
    }
}