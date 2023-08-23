// 基于paperjs的游戏引擎0.1版本库
import paper from 'paper'

export const getRandomPoint = (canvasViewWidth: number, canvasViewHeight: number) => {
    return new paper.Point(Math.random() * canvasViewWidth, Math.random() * canvasViewHeight)
}


