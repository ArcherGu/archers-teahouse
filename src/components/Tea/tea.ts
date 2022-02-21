import { CupSize } from "@/types";
import { AbstractRenderer, autoDetectRenderer, Container, Graphics } from "pixi.js";
import { Cup } from "./cup";
import { gsap } from "@/plugins";
import { Liquid } from "./liquid";
import { bgColor, diyItems, teaProps } from "@/store";
import { BASE_TEA, CUP_HEIGHT, CUP_WIDTH } from "@/config";
import { watch } from "vue";
import { IceCubes, Leaf, PearlBalls, Bubbles, CoconutFruitCubes, LemonChips } from "./items";

export class Tea {
    private renderer: AbstractRenderer;
    private backgroundColor: number = 0xe4e4e7;
    private imageContainer: Container;
    private imageBox: Graphics;
    private container: Container;
    private cup: Cup;
    private liquid: Liquid;
    private leaf: Leaf;
    private bubbles: Bubbles;
    private iceCubes: IceCubes;
    private pearlBalls: PearlBalls;
    private coconutFruitCubes: CoconutFruitCubes;
    private lemonChips: LemonChips;

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
            backgroundColor: this.backgroundColor,
            resolution: 1,
            view
        });

        // init container and image box
        this.container = new Container();
        this.imageBox = new Graphics();
        this.imageBox.name = "imageBox";
        this.drawImageBox(width, height);
        this.imageBox.addChild(this.container)
        this.imageContainer = new Container();
        this.imageContainer.addChild(this.imageBox);

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
        this.lemonChips = new LemonChips({ cupSize });
    }

    init() {
        this.cup.draw();
        this.liquid.draw();
        this.leaf.draw();
        this.bubbles.draw();
        this.iceCubes.draw();
        this.pearlBalls.draw();
        this.coconutFruitCubes.draw();
        this.lemonChips.draw();

        this.container.addChild(
            this.cup,
            this.liquid,
            this.leaf,
            ...this.bubbles.items,
            ...this.iceCubes.items,
            ...this.pearlBalls.items,
            ...this.coconutFruitCubes.items,
            ...this.lemonChips.items
        );
        this.container.sortChildren();

        this.watch();
        this.animate();

        const { width, height } = this.renderer;
        this.updatePosition(width, height);
    }

    watch() {
        watch(bgColor, (color) => {
            this.backgroundColor = parseInt(color.replace('#', ''), 16);
            this.renderer.backgroundColor = this.backgroundColor;
            const { width, height } = this.renderer;
            this.drawImageBox(width, height)
        })

        watch(() => teaProps.cupSize, (cupSize) => {
            this.changeCupSize(cupSize);
            this.liquid.changeCupSize(cupSize);
            this.bubbles.changeCupSize(cupSize);
            this.iceCubes.changeCupSize(cupSize);
            this.pearlBalls.changeCupSize(cupSize);
            this.coconutFruitCubes.changeCupSize(cupSize);
            this.lemonChips.changeCupSize(cupSize);
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
            this.lemonChips.changeVisible(diyItems.some(e => e === 'Lemon'));

            this.container.sortChildren();
        }, { deep: true })
    }

    resize(width: number, height: number) {
        this.renderer.resize(width, height);
        this.drawImageBox(width, height);
        this.updatePosition(width, height);
    }

    changeCupSize(size: CupSize) {
        this.cup.changeSize(size);
        const { width, height } = this.renderer;
        this.updatePosition(width, height);
    }

    updatePosition(viewWidth: number, viewHeight: number) {
        gsap.to(this.imageBox, {
            duration: 0.5,
            pixi: {
                x: (viewWidth - this.imageBox.width) / 2,
                y: (viewHeight - this.imageBox.height) / 2
            }
        });

        gsap.to(this.container,
            {
                duration: 0.5,
                pixi: {
                    x: (this.imageBox.width - CUP_WIDTH) / 2,
                    y: (this.imageBox.height - CUP_HEIGHT[teaProps.cupSize]) / 2
                }
            }
        );
    }

    animate() {
        this.renderer.render(this.imageContainer);
        this.liquid.animate();
        requestAnimationFrame(this.animate.bind(this));
    }

    drawImageBox(width: number, height: number) {
        this.imageBox.beginFill(this.backgroundColor, 1).drawRect(0, 0, width < 400 ? width : 400, height < 800 ? height : 800).endFill();
    }

    toImage() {
        return this.renderer.plugins.extract.image(this.imageBox).src;
    }
}