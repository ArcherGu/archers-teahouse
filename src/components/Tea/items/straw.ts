import { Graphics } from 'pixi.js'
import { CUP_HEIGHT, CUP_WIDTH } from '@/config'
import type { CupSize } from '@/types'

export class Straw extends Graphics {
  private cupHeight: number
  private isBig = false

  constructor(cupSize: CupSize = 'M', visible = false) {
    super()

    this.zIndex = 30
    this.visible = visible
    this.cupHeight = CUP_HEIGHT[cupSize]
    this.angle = 10
  }

  draw() {
    if (!this.visible)
      return
    this.clear()

    this.beginFill(0x35231A, 0.9)
    if (!this.isBig) {
      this.moveTo(0, 0)
        .lineTo(-50, 0)
        .arcTo(-70, 0, -70, 20, 20)
        .lineTo(-70, this.cupHeight + 53)
        .lineTo(-63, this.cupHeight + 53)
        .lineTo(-63, 20)
        .arcTo(-63, 10, -50, 10, 10)
        .lineTo(0, 10)
      this.position.set(CUP_WIDTH + 68, -40)
    }
    else {
      this.moveTo(0, 0)
        .lineTo(-15, 0)
        .lineTo(-13, this.cupHeight + 53)
        .lineTo(-2, this.cupHeight + 53)
      this.position.set(CUP_WIDTH + 7, -50)
    }

    this.endFill()
  }

  changeVisible(visible?: boolean) {
    this.visible = !!visible
    this.draw()
  }

  changeCupSize(cupSize: CupSize) {
    this.cupHeight = CUP_HEIGHT[cupSize]
    this.draw()
  }

  changeType(isBig: boolean) {
    this.isBig = isBig
    this.draw()
  }
}
