import { reactive, ref } from 'vue'
import type { DiyItems, MakeStep, TeaProps } from '@/types'

export const teaProps = reactive<TeaProps>({
  cupSize: 'M',
  teaType: 'milk tea',
})

export const makeStep = ref<MakeStep>('BASE')

export const diyItems = reactive<DiyItems[]>([])

export const bgColor = ref('#e4e4e7')

export function changeBgColor(color: string) {
  bgColor.value = color
}

export function changeStep(step: MakeStep) {
  makeStep.value = step
}

