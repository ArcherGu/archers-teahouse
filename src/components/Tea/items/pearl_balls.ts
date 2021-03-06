import { Graphics } from 'pixi.js'
import random from 'random'
import { Power1 } from 'gsap'
import type { Options } from './base_items_container'
import { BaseItemsContainer } from './base_items_container'
import { gsap } from '@/plugins'
import type { CupSize } from '@/types'
import { CUP_BOTTOM_OFFSET, CUP_HEIGHT, CUP_WIDTH } from '@/config'

export class PearlBalls extends BaseItemsContainer {
  constructor(opt: Options) {
    super(opt)

    const count = random.int(10, 15)
    for (let i = 0; i < count; i++) {
      const item = new Graphics()
      item.visible = this.visible
      this.group.push({ item })
    }
  }

  draw() {
    for (const one of this.group) {
      const { item } = one

      item.clear()
      item.beginFill(0x462713)
        .drawCircle(0, 0, 8)
        .endFill()

      item.beginFill(0xFFFFFF)
        .drawCircle(3, 3, 2)
        .endFill()

      item.beginFill(0xFFFFFF)
        .drawCircle(0.5, 0.5, 1)
        .endFill()

      const leftOffset = random.int(CUP_BOTTOM_OFFSET + 10, CUP_WIDTH - CUP_BOTTOM_OFFSET - 10)
      const bottomOffset = random.int(10, 60)
      item.position.set(
        leftOffset,
        this.cupHeight - bottomOffset,
      )
    }
  }

  animate() {
    if (!this.visible) {
      this.group.forEach(e => e.tween?.kill())
      return
    }
    for (const one of this.group) {
      const { item } = one
      const leftOffset = random.int(CUP_BOTTOM_OFFSET + 10, CUP_WIDTH - CUP_BOTTOM_OFFSET - 10)
      const bottomOffset = random.int(10, 60)

      one.tween?.kill()
      gsap.set(item, {
        pixi: {
          x: leftOffset,
          y: this.cupHeight - bottomOffset,
          angle: random.int(0, 180),
          zIndex: random.int(10, 80),
        },
      })

      one.tween = gsap.to(item, {
        pixi: {
          x: leftOffset + random.int(-2, 2),
          y: this.cupHeight - bottomOffset - random.int(0, 5),
          angle: item.angle + random.int(-30, 30),
        },
        duration: random.float(2.5, 4),
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
      })
    }
  }

  changeVisible(visible?: boolean) {
    if (this.visible === !!visible)
      return
    this.visible = !!visible
    this.animate()
  }

  changeCupSize(cupSize: CupSize) {
    this.cupHeight = CUP_HEIGHT[cupSize]
    this.animate()
  }
}
