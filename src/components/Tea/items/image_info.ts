import { Container, Sprite } from "pixi.js";
import logo from "@/assets/logo.png";
import qr from "@/assets/qr.png";

export class ImageInfo extends Container {
    private qrSprite: Sprite;
    private logoSprite: Sprite;

    constructor() {
        super();
        this.visible = false;

        this.qrSprite = Sprite.from(qr);
        this.qrSprite.scale.set(0.4, 0.4);

        this.logoSprite = Sprite.from(logo);
        this.logoSprite.scale.set(0.3, 0.3);

        this.addChild(this.qrSprite, this.logoSprite);
    }

    updatePosition(imageWidth: number, imageHeight: number) {
        this.logoSprite.position.set(10, 10)
        this.qrSprite.position.set(imageWidth - this.qrSprite.width - 10, imageHeight - this.qrSprite.height - 10)
        // this.position.set(10, imageHeight - this.height - 10)
    }

    changeVisible(visible?: boolean) {
        this.visible = !!visible;
    }
}