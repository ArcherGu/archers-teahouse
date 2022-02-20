import { CUP_BOTTOM_OFFSET, CUP_HEIGHT, CUP_WIDTH } from "@/config";
import { CupSize } from "@/types";
import { DropShadowFilter } from "pixi-filters";
import { Graphics } from "pixi.js";

export class Cup extends Graphics {
    constructor(
        private cupSize: CupSize,
    ) {
        super();
        this.zIndex = 101;

        const shadowFilter = new DropShadowFilter();
        shadowFilter.color = 0x000000;
        shadowFilter.alpha = 0.25;
        shadowFilter.blur = 2
        shadowFilter.distance = 5;

        this.filters = [shadowFilter]
    }

    draw() {
        const cupHeight = CUP_HEIGHT[this.cupSize];
        this.clear();
        this.moveTo(0, 0);
        this.lineStyle(4, 0xFFFFFF, 1);
        // left
        this.lineTo(CUP_BOTTOM_OFFSET, cupHeight);
        // bottom
        this.lineTo(CUP_WIDTH - CUP_BOTTOM_OFFSET, cupHeight);
        // right
        this.lineTo(CUP_WIDTH, 0);

        this.lineStyle(1, 0xFFFFFF, 1);
        // top
        this.lineTo(0, 0);
    }

    changeSize(size: CupSize) {
        this.cupSize = size;
        this.draw();
    }
}
