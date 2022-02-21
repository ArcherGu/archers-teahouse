import { CupSize } from "@/types";
import { AbstractRenderer, autoDetectRenderer, Container, Graphics, Sprite } from "pixi.js";
import { Cup } from "./cup";
import { gsap } from "@/plugins";
import { Liquid } from "./liquid";
import { bgColor, diyItems, makeStep, teaProps } from "@/store";
import { BASE_TEA, CUP_HEIGHT, CUP_WIDTH } from "@/config";
import { watch } from "vue";
import { IceCubes, Leaf, PearlBalls, Bubbles, CoconutFruitCubes, LemonChips, Straw, Slogan, ImageInfo } from "./items";

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
    private straw: Straw;
    private slogan: Slogan;
    private imageInfo: ImageInfo;

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
        this.imageInfo = new ImageInfo();
        this.imageBox = new Graphics();
        this.imageBox.name = "imageBox";
        this.drawImageBox(width, height);

        this.imageBox.addChild(this.container, this.imageInfo)
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
        this.straw = new Straw(cupSize);
        this.slogan = new Slogan(cupSize);
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
            this.straw,
            this.slogan,
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
            this.straw.changeCupSize(cupSize);
            this.slogan.changeCupSize(cupSize);
        })

        watch(() => teaProps.teaType, () => {
            const baseTea = BASE_TEA[teaProps.teaType];

            this.liquid.changeTeaType(teaProps.teaType);
            this.leaf.changeType(baseTea.leaf);
            this.bubbles.changeVisible(baseTea.bubble);
        });

        watch(makeStep, () => {
            this.straw.changeVisible(makeStep.value === 'ENJOY');
            this.slogan.changeVisible(makeStep.value === 'ENJOY');
        })

        watch(() => diyItems, () => {
            this.iceCubes.changeVisible(diyItems.some(e => e === 'Ice'));
            this.pearlBalls.changeVisible(diyItems.some(e => e === 'Pearl'));
            this.coconutFruitCubes.changeVisible(diyItems.some(e => e === 'CoconutFruit'));
            this.lemonChips.changeVisible(diyItems.some(e => e === 'Lemon'));
            this.straw.changeType(diyItems.some(e => e === 'Pearl' || e === 'CoconutFruit'));

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

        this.imageInfo.updatePosition(this.imageBox.width, this.imageBox.height)
    }

    animate() {
        this.renderer.render(this.imageContainer);
        this.liquid.animate();
        requestAnimationFrame(this.animate.bind(this));
    }

    drawImageBox(width: number, height: number) {
        const boxWidth = width < 400 ? (width < 250 ? 250 : width) : 400;
        const boxHeight = height < 800 ? (height < 600 ? 600 : height) : 800;
        this.imageBox.beginFill(this.backgroundColor).drawRect(0, 0, boxWidth, boxHeight).endFill();
    }

    toImage() {
        this.imageInfo.changeVisible(true);
        const data = this.renderer.plugins.extract.image(this.imageContainer).src;
        this.imageInfo.changeVisible(false);
        return data;
    }
}