import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin"
import * as PIXI from "pixi.js";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export { gsap }