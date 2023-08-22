// paperjs引擎0.1
import paper from 'paper'

// 删除指定project的某一层
export const removeLayer = (currentProject, layerName) => {
    let target = currentProject.layers.filter((layer) => layer.name === layerName)[0]
    if (target) {
      target.remove()
      target = null
    }
  }

// 指定项目绘制坐标层次
export const drawXY = (currentProject) => {
    if (!currentProject) {
        throw "project null"
    }
    const WIDTH = currentProject.view.bounds.width
    const HEIGHT = currentProject.view.bounds.height
    currentProject.activate()
    removeLayer(currentProject, 'layerXY')
    const layerXY = new paper.Layer()
    layerXY.name = 'layerXY'
    const currentCenter = currentProject.view.center
    const X = new paper.Path.Line({
      from: new paper.Point(currentCenter.x - WIDTH / 2, currentCenter.y),
      to: new paper.Point(currentCenter.x + WIDTH / 2, currentCenter.y),
      strokeColor: 'red',
      strokeWidth: 1,
    })
    const Y = new paper.Path.Line({
      from: new paper.Point(currentCenter.x, currentCenter.y - HEIGHT / 2),
      to: new paper.Point(currentCenter.x, currentCenter.y  + HEIGHT / 2),
      strokeColor: 'red',
      strokeWidth: 1,
    })
    const coordinateData = new paper.PointText({
      point: currentCenter.add(2, -5),
      content: `(${currentCenter.x} , ${currentCenter.y})`,
      fillColor: 'red',
      justification: 'left',
      fontWeight:'bold'
    })
  }

// 中心点在坐标原点的圆，给定一个坐标值及radius，返回另一坐标值
export const getAnotherPoint = (val, radius) => {
    return Math.sqrt(Math.pow(radius, 2) - Math.pow(Math.abs(val), 2))
  }

// 给定圆内任意一点，返回两条以该点原中心点的两条直线数据
export const getLineData = (point, radius) => {
    // 通过点坐标的y，获得塬上的两点(-x, y) (x, y)
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


  // 输出圆弧的两个点
export const getFlatPoints = (directionAngle, length, radius) => {
    // 默认为0°
    const y = length / 2
    const x = getAnotherPoint(y, radius)
    const leftPoint = new paper.Point(x, y)
    const rightPoint = new paper.Point(x, -y)
    return [leftPoint.rotate(directionAngle,new paper.Point(0, 0)), rightPoint.rotate(directionAngle,new paper.Point(0, 0))]
}

export const getThroughPoint = (points) => {
    const one = points[0]
    const two = points[1]
    const vector = two.subtract(one)
    // const c1 = new paper.Path.Circle({
    //     center: one,
    //     radius: 10,
    //     fillColor: 'red'
    // })
    // const c2 = new paper.Path.Circle({
    //     center: two,
    //     radius: 10,
    //     fillColor: 'blue'
    // })
    // const c = new paper.Path.Circle({
    //     center: vector,
    //     radius: 10,
    //     fillColor: 'green'
    // })
    
}
  