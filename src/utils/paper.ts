// 基于paperjs的游戏引擎0.1版本库
import paper from 'paper'

// 获得区域范围内的随机点： 左上角(0,0)
export const getRandomPoint = (canvasViewWidth: number, canvasViewHeight: number) => {
    return new paper.Point(Math.random() * canvasViewWidth, Math.random() * canvasViewHeight)
}



