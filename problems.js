// 本文用于记录工作中所遇的种种问题

// 1. 笔刷工具断画
// 表现：在画板中使用笔刷工具时，鼠标缓慢拖动没有问题，但是当移动速度很快，会出现断画的问题

// 原因分析：当前版本的笔刷实现逻辑： 鼠标每次移动会根据当前移动点绘制圆，并合并到当前整个绘制的路径path。就是说，只有触发了该事件才会有绘制的动作。
// 而当鼠标移动速度很快时，paperjs底层做了防抖处理，这是合理的。但是因为该原因，导致我们没能触发move事件，从而出现了断画问题的出现。

// 解决方案： 通过研读paperjs的官方文档发现，官方提供了add的方法，用于绘制连续的线段。但是针对当前项目的需要，需要根据当前点和方向向量，获得上下端点
// 解决断画问题，替换当前版本笔刷工具。

// 2. canvas性能问题
// 表现：某视图组件，用paperjs实现的一个多图层架构，比如缺陷点层、十字准心层、区域选中层、内外框层等等。其中，缺陷点层包含数量不定的小圆点。
// 十字准心层会受其他组件的联动影响。开发过程中发现，若缺陷层中的点数量很少时，十字准心层位置变更不会卡顿。
// 但是若缺陷层的缺陷点数量很多时，十字准心卡顿明显

// 原因分析：重排重绘导致的。每当我们改变十字准星的位置时，原本以为只是以图层级别的重排重绘，但事实并不是。画布的更新，是以canvas为基础节点的。这也就是
// 为什么，缺陷层点数的多少会影响准心层。

// 解决方案： 既然重排重绘的基础节点是整个canvas，那我们就直接把十字准心层这样频繁变更的图层，用单独的canvas隔离，不就好了吗？，实践表明，几乎完美

// 3. 自研的类似高德地图的瓦片视图组件
// 实现逻辑：首先计算，当前视图中心点到整个图片区域的四个定点距离，拿到这四个距离后，同当前视图框的宽长对比。以此来判断是否出现空白区域，从而判断是否需要再次发送请求
