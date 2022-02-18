import { BASE_TEA, CUP_BOTTOM_OFFSET, CUP_HEIGHT, CUP_WIDTH, LIQUID_TO_TOP_OFFSET } from "@/config";
import { BaseTeaProps, CupSize, TeaType } from "@/types";
import { Graphics, Point, Texture } from "pixi.js";
import { gradient, GradientColor } from "./utils";

export class Vertex extends Point {
    public origin: Point | undefined;

    constructor(x?: number | undefined, y?: number | undefined) {
        super(x, y)
    }
}


const TOP_VERTICES_NUM = 32;
export class Liquid extends Graphics {
    private amplitude: number = 2;
    private fps: number = 60;
    private theta: number = 0;
    private cupWidth: number;
    private cupHeight: number;
    private baseTea: BaseTeaProps;
    private textureCreator: GradientColor;
    private topVertices: Vertex[] = new Array(TOP_VERTICES_NUM);
    private bottomVertices: Vertex[];

    constructor(
        teaType: TeaType,
        cupSize: CupSize,
    ) {
        super();
        this.x = 2
        this.cupWidth = CUP_WIDTH - 4;
        this.cupHeight = CUP_HEIGHT[cupSize] - 2;
        this.baseTea = BASE_TEA[teaType];
        this.textureCreator = new GradientColor();

        this.bottomVertices = [
            new Vertex(this.cupWidth - CUP_BOTTOM_OFFSET, this.cupHeight),
            new Vertex(CUP_BOTTOM_OFFSET, this.cupHeight),
        ]

        for (let i = 0; i < TOP_VERTICES_NUM; i++) {
            const vertex = new Vertex(
                (i / (TOP_VERTICES_NUM - 1)) * this.cupWidth, 0
            );
            vertex.origin = vertex.clone();
            this.topVertices[i] = vertex;
        }

    }

    draw() {
        for (let i = 0; i < this.topVertices.length; i++) {
            const vertex = this.topVertices[i];
            const pct = i / (this.topVertices.length - 1);
            vertex.y = LIQUID_TO_TOP_OFFSET + this.amplitude * Math.sin(2 * Math.PI * pct + this.theta * 0.25 * Math.PI * 2);
        }

        this.clear()
            .beginTextureFill({
                texture: this.textureCreator.create(
                    this.baseTea.color,
                    this.baseTea.linearColor || this.baseTea.color,
                    this.cupWidth,
                    this.cupHeight
                )
            })
            .drawPolygon(this.topVertices.concat(this.bottomVertices).flat())
            .endFill();

        this.theta += 1 / this.fps;
    }

    animate() {
        this.draw();
    }

    changeCupSize(cupSize: CupSize) {
        this.cupHeight = CUP_HEIGHT[cupSize] - 2;
        this.bottomVertices = [
            new Vertex(this.cupWidth - CUP_BOTTOM_OFFSET, this.cupHeight),
            new Vertex(CUP_BOTTOM_OFFSET, this.cupHeight),
        ]
    }

    changeTeaType(teaType: TeaType) {
        this.baseTea = BASE_TEA[teaType];
    }
}