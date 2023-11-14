### 坦克类

坦克实例对象初始化时，会绘制自身躯体，由三部分组成：`坦克底座（Path.Rectangle）、炮塔（Path.Circle）及炮管（Path）`,具体代码如下：
```javascript
  init() {
    this.path = new paper.Group({
      children: [
        // 炮身
        new paper.Path.Rectangle({
          name: 'base',
          center: this.position,
          size: new paper.Size(SIZE),
          strokeColor: this.color
        }),
        // 炮管
        new paper.Path({
          name: 'turret',
          segments: [this.position, this.position.add(this.direction)],
          strokeWidth: 5,
          strokeColor: this.color,
          strokeCap: 'round'
        }),
        // 炮塔
        new paper.Path.Circle({
          radius: SIZE / 4,
          center: this.position,
          fillColor: this.color
        })
      ]
    })
  }
```

- **坦克底座**: 由`position`确定，尺寸由`Size`确定。
- **炮塔**：由`position`确定，尺寸由`Size`确定。
- **炮管**： 由`position`确定，长度由`Size`确定。