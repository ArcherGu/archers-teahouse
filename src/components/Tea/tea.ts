import { CupSize } from "@/types";
import { AbstractRenderer, autoDetectRenderer, Container, Graphics } from "pixi.js";
import { Cup } from "./cup";
import { setMask } from "./utils";
import { gsap } from "@/plugins";
import { Liquid } from "./liquid";
import { teaProps } from "@/store";
import { BASE_TEA } from "@/config";
import { watch } from "vue";

export class Tea {
    private renderer: AbstractRenderer;
    private container: Container;
    private cup: Cup;
    private liquid: Liquid;

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
            view,
            forceCanvas: true
        });

        this.container = new Container();

        const { cupSize, teaType } = teaProps;
        this.cup = new Cup(cupSize);
        this.liquid = new Liquid(
            teaType,
            cupSize
        )
    }

    init() {
        this.cup.draw();
        this.liquid.draw();

        this.container.addChild(this.cup, this.liquid);

        const { width, height } = this.renderer;
        this.container.position.set((width - this.container.width) / 2, (height - this.container.height) / 2);

        this.watch();
        this.animate();
    }

    watch() {
        watch(() => teaProps.cupSize, () => {
            this.changeCupSize(teaProps.cupSize);
            this.liquid.changeCupSize(teaProps.cupSize)
        })

        watch(() => teaProps.teaType, () => {
            this.liquid.changeTeaType(teaProps.teaType)
        })
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