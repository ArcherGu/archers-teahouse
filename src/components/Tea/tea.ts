import { CupSize } from "@/types";
import { AbstractRenderer, autoDetectRenderer, Container, Graphics } from "pixi.js";
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
            antialias: false, // github issues: https://github.com/pixijs/pixijs/issues/8183
            backgroundColor: this.backgroundColor,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            view
        });

        // init container and image box
        this.container = new Container();
        this.imageInfo = new ImageInfo();
        this.imageBox = new Graphics();
        this.imageBox.name = "imageBox";
        this.drawImageBox();

        this.imageBox.addChild(this.container, this.imageInfo);
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

        this.updatePosition();
    }

    watch() {
        watch(bgColor, (color) => {
            this.backgroundColor = parseInt(color.replace('#', ''), 16);
            this.renderer.backgroundColor = this.backgroundColor;
            this.drawImageBox();
        });

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
        });

        watch(() => teaProps.teaType, () => {
            const baseTea = BASE_TEA[teaProps.teaType];

            this.liquid.changeTeaType(teaProps.teaType);
            this.leaf.changeType(baseTea.leaf);
            this.bubbles.changeVisible(baseTea.bubble);
        });

        watch(makeStep, () => {
            this.straw.changeVisible(makeStep.value === 'ENJOY');
            this.slogan.changeVisible(makeStep.value === 'ENJOY');
        });

        watch(() => diyItems, () => {
            this.iceCubes.changeVisible(diyItems.some(e => e === 'Ice'));
            this.pearlBalls.changeVisible(diyItems.some(e => e === 'Pearl'));
            this.coconutFruitCubes.changeVisible(diyItems.some(e => e === 'CoconutFruit'));
            this.lemonChips.changeVisible(diyItems.some(e => e === 'Lemon'));
            this.straw.changeType(diyItems.some(e => e === 'Pearl' || e === 'CoconutFruit'));

            this.container.sortChildren();
        }, { deep: true });
    }

    resize(width: number, height: number) {
        this.renderer.resize(width, height);
        this.drawImageBox();
        this.updatePosition();
    }

    changeCupSize(size: CupSize) {
        this.cup.changeSize(size);
        this.updatePosition();
    }

    updatePosition() {
        const { width, height } = this.renderer;
        gsap.to(this.imageBox, {
            duration: 0.5,
            pixi: {
                x: (width / window.devicePixelRatio - this.imageBox.width) / 2,
                y: (height / window.devicePixelRatio - this.imageBox.height) / 2
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

        this.imageInfo.updatePosition(this.imageBox.width, this.imageBox.height);
    }

    animate() {
        this.renderer.render(this.imageContainer);
        this.liquid.animate();
        requestAnimationFrame(this.animate.bind(this));
    }

    drawImageBox() {
        const { width: originalWidth, height: originalHeight } = this.renderer;
        const width = originalWidth / window.devicePixelRatio;
        const height = originalHeight / window.devicePixelRatio;

        const boxWidth = width < 400 ? (width < 250 ? 250 : width) : 400;
        const boxHeight = height < 750 ? (height < 600 ? 600 : height) : 750;
        this.imageBox.beginFill(this.backgroundColor).drawRect(0, 0, boxWidth, boxHeight).endFill();
    }

    toImage() {
        this.imageInfo.changeVisible(true);
        this.imageBox.scale.set(3, 3);
        const data = this.renderer.plugins.extract.image(this.imageContainer, "image/jpeg", 1).src;
        this.imageBox.scale.set(1, 1);
        this.imageInfo.changeVisible(false);
        return data;
    }
}