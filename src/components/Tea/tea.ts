import { CupSize } from "@/types";
import { AbstractRenderer, autoDetectRenderer, Container, Graphics } from "pixi.js";
import { Cup } from "./cup";
import { gsap } from "@/plugins";
import { Liquid } from "./liquid";
import { bgColor, diyItems, teaProps } from "@/store";
import { BASE_TEA } from "@/config";
import { watch } from "vue";
import { IceCubes, Leaf, PearlBalls, Bubbles, CoconutFruitCubes } from "./items";

export class Tea {
    private renderer: AbstractRenderer;
    private container: Container;
    private cup: Cup;
    private liquid: Liquid;
    private leaf: Leaf;
    private bubbles: Bubbles;
    private iceCubes: IceCubes;
    private pearlBalls: PearlBalls;
    private coconutFruitCubes: CoconutFruitCubes;

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
        this.bubbles = new Bubbles({ cupSize, visible: BASE_TEA[teaType].bubble });
        this.iceCubes = new IceCubes({ cupSize });
        this.pearlBalls = new PearlBalls({ cupSize });
        this.coconutFruitCubes = new CoconutFruitCubes({ cupSize });
    }

    init() {
        this.cup.draw();
        this.liquid.draw();
        this.leaf.draw();
        this.bubbles.draw();
        this.iceCubes.draw();
        this.pearlBalls.draw();
        this.coconutFruitCubes.draw();

        this.container.addChild(
            this.cup,
            this.liquid,
            this.leaf,
            this.bubbles,
            this.iceCubes,
            this.pearlBalls,
            this.coconutFruitCubes
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
            this.bubbles.changeCupSize(cupSize);
            this.iceCubes.changeCupSize(cupSize);
            this.pearlBalls.changeCupSize(cupSize);
            this.coconutFruitCubes.changeCupSize(cupSize);
        })

        watch(() => teaProps.teaType, () => {
            const baseTea = BASE_TEA[teaProps.teaType];

            this.liquid.changeTeaType(teaProps.teaType);
            this.leaf.changeType(baseTea.leaf);
            this.bubbles.changeVisible(baseTea.bubble);
        });

        watch(() => diyItems, () => {
            this.iceCubes.changeVisible(diyItems.some(e => e === 'Ice'));
            this.pearlBalls.changeVisible(diyItems.some(e => e === 'Pearl'));
            this.coconutFruitCubes.changeVisible(diyItems.some(e => e === 'CoconutFruit'));
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