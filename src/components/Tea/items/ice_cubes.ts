import type { Texture } from 'pixi.js'
import { Graphics } from 'pixi.js'
import { Power1 } from 'gsap'
import { radialGradient } from '../utils'
import type { Options } from './base_items_container'
import { BaseItemsContainer } from './base_items_container'
import { gsap } from '@/plugins'
import type { CupSize } from '@/types'
import { CUP_HEIGHT, LIQUID_TO_TOP_OFFSET } from '@/config'

export class IceCubes extends BaseItemsContainer {
  private cubeSize = 55
  private cubeTexture: Texture

  constructor(opt: Options) {
    super(opt)

    const cubeA = new Graphics()
    cubeA.name = 'cubeA'
    cubeA.pivot.set(this.cubeSize / 2, this.cubeSize / 2)
    cubeA.position.set(80, LIQUID_TO_TOP_OFFSET + 5 + this.cubeSize / 2)
    cubeA.angle = -5
    cubeA.zIndex = 45

    const tweenCubeA = gsap.to(cubeA, {
      pixi: {
        y: LIQUID_TO_TOP_OFFSET + this.cubeSize / 2 - 5,
        angle: 5,
      },
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
    })

    this.group.push({
      item: cubeA,
      tween: tweenCubeA,
    })

    const cubeB = new Graphics()
    cubeB.name = 'cubeB'
    cubeB.position.set(60, this.cupHeight - this.cubeSize - 2)
    cubeB.angle = -5
    cubeB.zIndex = 30
    this.group.push({ item: cubeB })

    const cubeC = new Graphics()
    cubeC.name = 'cubeC'
    cubeC.position.set(112, this.cupHeight - this.cubeSize * 2 - 7)
    cubeC.angle = 20
    cubeC.zIndex = 55
    this.group.push({ item: cubeC })

    this.cubeTexture = radialGradient('rgb(192 202 211 / 70%)', 'rgb(255 255 255 / 70%)', this.cubeSize, this.cubeSize, 1 / 4)

    const { visible = false } = opt
    this.visible = visible
  }

  draw() {
    for (const { item } of this.group) {
      item.clear()

      item.beginTextureFill({
        texture: this.cubeTexture,
      })
        .drawRoundedRect(0, 0, this.cubeSize, this.cubeSize, 5)
        .endFill()
    }
  }

  animate() {
    const cubeA = this.group.find(e => e.item.name === 'cubeA')
    if (!this.visible) {
      cubeA?.tween?.pause()
      return
    }

    cubeA?.tween?.play()

    const cubeB = this.group.find(e => e.item.name === 'cubeB')?.item
    const cubeC = this.group.find(e => e.item.name === 'cubeC')?.item

    cubeB?.position.set(60, this.cupHeight - this.cubeSize - 2)
    cubeC?.position.set(112, this.cupHeight - this.cubeSize * 2 - 7)
  }

  changeCupSize(cupSize: CupSize) {
    this.cupHeight = CUP_HEIGHT[cupSize]
    this.animate()
  }

  changeVisible(visible?: boolean) {
    this.visible = !!visible
    this.animate()
  }
}
