import { DropShadowFilter } from 'pixi-filters'
import { Graphics } from 'pixi.js'
import { CUP_BOTTOM_OFFSET, CUP_HEIGHT, CUP_WIDTH } from '@/config'
import type { CupSize } from '@/types'

export class Cup extends Graphics {
  constructor(
    private cupSize: CupSize,
  ) {
    super()
    this.zIndex = 101

    const shadowFilter = new DropShadowFilter()
    shadowFilter.color = 0x000000
    shadowFilter.alpha = 0.2
    shadowFilter.blur = 3
    shadowFilter.distance = 5

    this.filters = [shadowFilter]
  }

  draw() {
    const cupHeight = CUP_HEIGHT[this.cupSize]
    this.clear()
    this.moveTo(0, 0)
    this.lineStyle(4, 0xFFFFFF, 0.6)
    // left
    this.lineTo(CUP_BOTTOM_OFFSET, cupHeight)
    // bottom
    this.lineTo(CUP_WIDTH - CUP_BOTTOM_OFFSET, cupHeight)
    // right
    this.lineTo(CUP_WIDTH, 0)

    this.lineStyle(1, 0xFFFFFF, 0.6)
    // top
    this.lineTo(0, 0)
  }

  changeSize(size: CupSize) {
    this.cupSize = size
    this.draw()
  }
}
