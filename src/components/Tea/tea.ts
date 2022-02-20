import { CupSize } from "@/types";
import { AbstractRenderer, autoDetectRenderer, Container, Graphics } from "pixi.js";
import { Cup } from "./cup";
import { gsap } from "@/plugins";
import { Liquid } from "./liquid";
import { bgColor, diyItems, teaProps } from "@/store";
import { BASE_TEA } from "@/config";
import { watch } from "vue";
import { IceCube, Leaf } from "./items";
import { Bubble } from "./items";

export class Tea {
    private renderer: AbstractRenderer;
    private container: Container;
    private cup: Cup;
    private liquid: Liquid;
    private leaf: Leaf;
    private bubble: Bubble;
    private iceCube: IceCube;

    constructor(wrapper: HTMLElement) {
        const { clientWidth: width, clientHeight: height } = wrapper;

        const view = document.createElement("canvas");
        view.width = width;
        view.height = height;
        wrapper.appendChild(view);
        this.renderer = autoDetectRenderer({
            width,
            height,
            antialias: true,
            backgroundColor: 0xe4e4e7,
            resolution: 1,
            view
        });

        this.container = new Container();

        const { cupSize, teaType } = teaProps;
        this.cup = new Cup(cupSize);
        this.liquid = new Liquid(
            teaType,
            cupSize
        );

        this.leaf = new Leaf(BASE_TEA[teaType].leaf);
        this.bubble = new Bubble(cupSize, BASE_TEA[teaType].bubble);
        this.iceCube = new IceCube(cupSize);
    }

    init() {
        this.cup.draw();
        this.liquid.draw();
        this.leaf.draw();
        this.bubble.draw();
        this.iceCube.draw();

        this.container.addChild(
            this.cup,
            this.liquid,
            this.leaf,
            this.bubble,
            this.iceCube
        );
        this.container.sortChildren();

        const { width, height } = this.renderer;
        this.container.position.set((width - this.container.width) / 2, (height - this.container.height) / 2);

        this.watch();
        this.animate();
    }

    watch() {
        watch(bgColor, (color) => {
            this.renderer.backgroundColor = parseInt(color.replace('#', ''), 16);
        })

        watch(() => teaProps.cupSize, (cupSize) => {
            console.log(cupSize)
            this.changeCupSize(cupSize);
            this.liquid.changeCupSize(cupSize);
            this.bubble.changeCupSize(cupSize);
            this.iceCube.changeCupSize(cupSize);
        })

        watch(() => teaProps.teaType, () => {
            const baseTea = BASE_TEA[teaProps.teaType];

            this.liquid.changeTeaType(teaProps.teaType);
            this.leaf.changeType(baseTea.leaf);
            this.bubble.changeVisible(baseTea.bubble);
        });

        watch(() => diyItems, () => {
            this.iceCube.changeVisible(diyItems.some(e => e === 'Ice'));
        }, { deep: true })
    }

    resize(width: number, height: number) {
        console.log("DO RESIZE")
        this.renderer.resize(width, height);
        this.updatePosition(width, height);
    }

    changeCupSize(size: CupSize) {
        this.cup.changeSize(size);
        const { width, height } = this.renderer;
        this.updatePosition(width, height);
    }

    updatePosition(viewWidth: number, viewHeight: number) {
        const { width, height } = this.container;
        gsap.to(this.container,
            {
                duration: 0.5,
                pixi: {
                    x: (viewWidth - width) / 2,
                    y: (viewHeight - height) / 2
                }
            }
        );
    }

    animate() {
        this.renderer.render(this.container);
        this.liquid.animate();
        requestAnimationFrame(this.animate.bind(this));
    }
}