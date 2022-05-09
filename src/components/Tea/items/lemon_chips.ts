import { Graphics } from 'pixi.js'
import { Power1 } from 'gsap'
import type { Options } from './base_items_container'
import { BaseItemsContainer } from './base_items_container'
import { CUP_HEIGHT, CUP_WIDTH } from '@/config'
import type { CupSize } from '@/types'
import { gsap } from '@/plugins'

export class LemonChips extends BaseItemsContainer {
  constructor(opt: Options) {
    super(opt)

    const lemonA = new Graphics()
    lemonA.name = 'lemonA'
    lemonA.zIndex = 50
    lemonA.angle = 30
    lemonA.visible = this.visible
    lemonA.position.set(0, 0)
    this.group.push({ item: lemonA })

    const lemonB = new Graphics()
    lemonB.name = 'lemonB'
    lemonB.zIndex = 70
    lemonB.angle = 170
    lemonB.visible = this.visible
    lemonB.position.set(70, this.cupHeight - 120)
    this.group.push({ item: lemonB })

    const lemonC = new Graphics()
    lemonC.name = 'lemonC'
    lemonC.zIndex = 30
    lemonC.angle = 15
    lemonC.visible = this.visible
    lemonC.position.set(CUP_WIDTH - 67, this.cupHeight - 50)
    this.group.push({ item: lemonC })
  }

  draw() {
    const MAIN_COLOR = 0xFDDE23
    const DEPUTY_COLOR = 0xFFFFFF
    const lemonA = this.group.find(e => e.item.name === 'lemonA')?.item

    const lemonRadius = 45
    const innerRadius = 40

    if (lemonA) {
      // magic numbers
      const centerOffset = 2
      const borderLength = 33
      const arcLength = 39
      const arcRadius = 20
      const fanAngle = 50

      lemonA.clear()

      lemonA.beginFill(MAIN_COLOR)
        .drawCircle(0, 0, lemonRadius)
        .endFill()
        .beginFill(DEPUTY_COLOR)
        .drawCircle(0, 0, innerRadius)
        .endFill()

      const fanNum = 6
      const segmentAngle = 360 / fanNum
      for (let i = 0; i < fanNum; i++) {
        const startAngle = [
          Math.sin(Math.PI * segmentAngle * (i + 0.5) / 180),
          Math.cos(Math.PI * segmentAngle * (i + 0.5) / 180),
        ]

        lemonA.beginFill(MAIN_COLOR)
          .moveTo(startAngle[0] * centerOffset, startAngle[1] * centerOffset)
          .lineTo(Math.sin(Math.PI * segmentAngle * i / 180) * borderLength, Math.cos(Math.PI * segmentAngle * i / 180) * borderLength)
          .arcTo(
            startAngle[0] * arcLength,
            startAngle[1] * arcLength,
            Math.sin(Math.PI * (segmentAngle * i + fanAngle) / 180) * borderLength,
            Math.cos(Math.PI * (segmentAngle * i + fanAngle) / 180) * borderLength,
            arcRadius,
          )
          .lineTo(startAngle[0] * centerOffset, startAngle[1] * centerOffset)
          .endFill()
      }
    }

    {
      const lemonB = this.group.find(e => e.item.name === 'lemonB')?.item
      const lemonC = this.group.find(e => e.item.name === 'lemonC')?.item

      // magic numbers
      const centerOffset = 3
      const borderLength = 33
      const arcLength = 39
      const arcRadius = 15
      const fanAngle = 40

      for (const halfLemon of [lemonB, lemonC]) {
        if (!halfLemon)
          continue

        halfLemon.clear()

        halfLemon.beginFill(MAIN_COLOR)
          .arc(0, 0, lemonRadius, 1.52 * Math.PI, 2.52 * Math.PI)
          .endFill()
          .beginFill(DEPUTY_COLOR)
          .arc(0, 0, innerRadius, 1.52 * Math.PI, 2.52 * Math.PI)
          .endFill()

        const fanNum = 4
        const segmentAngle = 180 / fanNum
        for (let i = 0; i < fanNum; i++) {
          const startAngle = [
            Math.sin(Math.PI * segmentAngle * (i + 0.5) / 180),
            Math.cos(Math.PI * segmentAngle * (i + 0.5) / 180),
          ]

          halfLemon.beginFill(MAIN_COLOR)
            .moveTo(startAngle[0] * centerOffset, startAngle[1] * centerOffset)
            .lineTo(Math.sin(Math.PI * segmentAngle * i / 180) * borderLength, Math.cos(Math.PI * segmentAngle * i / 180) * borderLength)
            .arcTo(
              startAngle[0] * arcLength,
              startAngle[1] * arcLength,
              Math.sin(Math.PI * (segmentAngle * i + fanAngle) / 180) * borderLength,
              Math.cos(Math.PI * (segmentAngle * i + fanAngle) / 180) * borderLength,
              arcRadius,
            )
            .lineTo(startAngle[0] * centerOffset, startAngle[1] * centerOffset)
            .endFill()
        }
      }
    }
  }

  animate() {
    this.group.forEach(e => e.tween?.kill())
    if (!this.visible)
      return

    const lemonB = this.group.find(e => e.item.name === 'lemonB')
    const lemonC = this.group.find(e => e.item.name === 'lemonC')
    if (lemonB) {
      gsap.set(lemonB.item, {
        pixi: {
          x: 70,
          y: this.cupHeight - 120,
        },
      })

      lemonB.tween = gsap.to(lemonB.item, {
        pixi: {
          y: this.cupHeight - 110,
          angle: 150,
        },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
      })
    }

    if (lemonC) {
      gsap.set(lemonC.item, {
        pixi: {
          x: CUP_WIDTH - 67,
          y: this.cupHeight - 50,
        },
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
