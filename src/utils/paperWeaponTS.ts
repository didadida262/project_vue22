// 基于paperjs的游戏引擎0.1版本库
import paper from 'paper'

// 删除指定project的某一层
export const removeLayer = (currentProject: paper.Project, layerName: string) => {
  let target = currentProject.layers.filter((layer) => layer.name === layerName)[0]
  if (target) {
    target.remove()
    target = null
  }
}
// // 指定项目、层，绘制坐标图形
export const drawXY = (currentProject, layerName) => {
  if (!currentProject) return
  const WIDTH = currentProject.view.bounds.width
  const HEIGHT = currentProject.view.bounds.height
  currentProject.activate()
  removeLayer(currentProject, layerName)
  const layerXY = new paper.Layer()
  layerXY.name = layerName
  const currentCenter = currentProject.view.center
  const X = new paper.Path.Line({
    from: new paper.Point(currentCenter.x - WIDTH / 2, currentCenter.y),
    to: new paper.Point(currentCenter.x + WIDTH / 2, currentCenter.y),
    strokeColor: 'red',
    strokeWidth: getViewBorderSize(currentProject),
  })
  const Y = new paper.Path.Line({
    from: new paper.Point(currentCenter.x, currentCenter.y - HEIGHT / 2),
    to: new paper.Point(currentCenter.x, currentCenter.y + HEIGHT / 2),
    strokeColor: 'red',
    strokeWidth: getViewBorderSize(currentProject),
  })
  const coordinateData = new paper.PointText({
    point: currentCenter.add(2, -5),
    content: `(${currentCenter.x.toFixed(2)} , ${currentCenter.y.toFixed(2)})`,
    fillColor: 'red',
    justification: 'left',
    fontWeight: 'bold',
    fontSize: getViewFontSize(currentProject)
  })
}
// 获取视图级别的字体大小
export const getViewFontSize = (currentProject) => {
  const ratio = currentProject.view.zoom
  return 16 / ratio
}
//     // 获取视图级别的线大小
export const getViewBorderSize = (currentProject) => {
  const ratio = currentProject.view.zoom
  return 1 / ratio
}
// // 中心点在坐标原点的圆，给定一个坐标值及radius，返回另一坐标值
export const getAnotherPoint = (val: number, radius: number) => {
  return Math.sqrt(Math.pow(radius, 2) - Math.pow(Math.abs(val), 2))
}

// 输出圆弧的两个点
export const getFlatPoints = (directionAngle: number, length: number, radius: number) => {
  // 默认为0°
  const y = length / 2
  const x = getAnotherPoint(y, radius)
  const leftPoint = new paper.Point(x, y)
  const rightPoint = new paper.Point(x, -y)
  return [leftPoint.rotate(-directionAngle, new paper.Point(0, 0)), rightPoint.rotate(-directionAngle,new paper.Point(0, 0))]
}
// // 在目标层上绘制带平边的弧，若该层已有path，取两者交集,即：取交集合并式绘制
export const drawFlat = (currentProject: paper.Project, layerName: string, directionAngle: number, length: number, radius: number) =>  {
  if (!currentProject) return
  currentProject.activate()
  const layerTarget = currentProject.layers.filter((layer) => layer.name === layerName)[0]
  if (!layerTarget) return
  const existedPath = layerTarget.children[0] as paper.Path
  const flatPoints = getFlatPoints(directionAngle, length, radius)
  const through = flatPoints[0].rotate(180, new paper.Point(0, 0))
  const newPath = new paper.Path.Arc({
    from: flatPoints[0],
    through: through,
    to: flatPoints[1],
    strokeColor: '#FFDE2C',
    closed: true,
    strokeWidth: 1
  })
  if (existedPath) {
    const resPath = newPath.intersect(existedPath)
    resPath.selected = true
    existedPath.remove()
    newPath.remove()
  } else {
    const resPath = newPath.clone()
    resPath.selected = true
    newPath.remove()
  }
}

export const getMidPoint = (point1: paper.Point, point2: paper.Point) => {
  const center = point1.add(point2).divide(2)
  return center
}

// 给定圆内任意一点，返回两条以该点原中心点的两条直线数据
export const getLineData = (point: paper.Point, radius: number) => {
  const X = getAnotherPoint(point.y, radius)
  const Y = getAnotherPoint(point.x, radius)
  return [
    // 横轴
    {
      one: [-X, point.y],
      two: [X, point.y]
    },
    // 纵轴
    {
      one: [point.x, -Y],
      two: [point.x, Y]
    }
  ]
}

// 输出凹槽所需的三个点信息
export const getNotchPoints = (directionAngle: number, grooveLength: number, grooveAngle: number, radius: number) => {
  const grooveWidth = grooveLength * Math.sin(grooveAngle / 2 / 180 * Math.PI)
  const grooveHeight = grooveLength * Math.cos(grooveAngle / 2 / 180 * Math.PI)
  // 默认为0°
  const y = grooveWidth
  const x = getAnotherPoint(y, radius)
  const leftPoint = new paper.Point(x, y)
  const rightPoint = new paper.Point(x, -y)
  const center = getMidPoint(leftPoint, rightPoint)
  const mid = center.normalize().multiply(center.length - grooveHeight)
  return [leftPoint.rotate(-directionAngle,new paper.Point(0, 0)),mid.rotate(-directionAngle,new paper.Point(0, 0)), rightPoint.rotate(-directionAngle,new paper.Point(0, 0))]
}

// 在目标层上绘制带凹槽的弧，若该层已有path，取两者交集,即：取交集合并式绘制
export const drawNotch = (currentProject: paper.Project, layerName: string, directionAngle: number, grooveLength: number, grooveAngle: number, radius: number) =>  {
  if (!currentProject) return
  currentProject.activate()
  const layerTarget = currentProject.layers.filter((layer) => layer.name === layerName)[0]
  const existedPath = layerTarget.children[0] as paper.Path
  const notchPoints = getNotchPoints(directionAngle, grooveLength, grooveAngle, radius)

  const through = notchPoints[0].rotate(180, new paper.Point(0, 0))
  const currentPath = new paper.Path.Arc({
    from: notchPoints[0],
    through: through,
    to: notchPoints[2],
    strokeColor: '#FFDE2C',
    closed: false,
    strokeWidth: 1
  })
  currentPath.add(notchPoints[1])
  currentPath.closed = true
  if (existedPath) {
    const resPath = currentPath.intersect(existedPath)
    resPath.selected = true
    existedPath.remove()
    currentPath.remove()
  } else {
    const resPath = currentPath.clone()
    resPath.selected = true
    currentPath.remove()
  }
}

// 获取当前视图的随机点
export const getRandomPoint = (currentProject: paper.Project) => {
  const bounds = currentProject.view.bounds
  const WIDTH = bounds.width
  const HEIGHT = bounds.height
  const topLeft = bounds.topLeft
  const stepPoint = new paper.Point(Math.random() * WIDTH, Math.random() * HEIGHT)
  return topLeft.add(stepPoint)
}
// 测试功能函数
export const testPaper = (currentProject: paper.Project) => {
  if (!currentProject) return
  currentProject.activate()
  const c1 = new paper.Path.Circle({
    center: new paper.Point(-100, 0),
    radius: 110,
    fillColor: 'green'
  })
  const c2 = new paper.Path.Circle({
    center: new paper.Point(100, 0),
    radius: 110,
    fillColor: 'red'
  })
  const res = c1.intersect(c2)
  res.selected = true
  c1.remove()
  c2.remove()
}

export const showPoint = (point: paper.Point, color: string) => {
  const p = new paper.Path.Circle({
    center: point,
    radius: 8,
    fillColor: color
  })
}
