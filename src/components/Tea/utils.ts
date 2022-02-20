import { TeaType } from "@/types";
import { Container, Graphics, Texture } from "pixi.js";

export function setMask(container: Container) {
    const mask = new Graphics();
    mask.beginFill(0x66CCFF, 0.2);
    mask.lineStyle(1, 0xFF3300, 1);
    mask.drawRect(0, 0, container.width, container.height);
    mask.endFill();

    mask.name = "dev_mask"
    const index = container.children.findIndex(e => e.name === "dev_mask")
    if (index > -1) {
        container.removeChildAt(index)
    }
    container.addChild(mask)
}

export function radialGradient(from: string, to: string, width: number, height: number, radiusSegmentation: number = 1 / 2) {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const center = [width / 2, height / 2];
    const radius = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2))
    const ctx = c.getContext("2d")!;
    const grd = ctx.createRadialGradient(center[0], center[1], radius * radiusSegmentation, center[0], center[1], radius);
    grd.addColorStop(0, from);
    grd.addColorStop(1, to);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    return Texture.from(c);
}

export function gradient(from: string, to: string, width: number, height: number) {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const ctx = c.getContext("2d")!;
    const grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, from);
    grd.addColorStop(1, to);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    return Texture.from(c);
}

export class GradientColor {
    private cache: { [key: string]: Texture } = {};

    create(from: string, to: string, width: number, height: number) {
        const id = `${from}-${to}-${width}-${height}`;
        if (this.cache[id]) {
            return this.cache[id];
        }

        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        const ctx = c.getContext("2d")!;
        const grd = ctx.createLinearGradient(0, 0, 0, height);
        grd.addColorStop(0, from);
        grd.addColorStop(1, to);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        const texture = Texture.from(c);
        this.cache[id] = texture;
        return texture;
    }
}