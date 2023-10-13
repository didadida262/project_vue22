<script>
import paper from "paper";
import tool from "./tool";


export default {
    name: "LinePoly",
    mixins: [tool],
    props: {
        scale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            icon: "fa fa-pencil",
            name: "直线工具2.0",
            shortcut: "字母 P",
            scaleFactor: 3,
            cursor: "copy",
            polygonPath: null,
            pathOptions: {
                strokeColor: 'rgb(89, 195, 225)',
                strokeWidth: 10,
                selected: true,
                radius: 5,
                opacity: 0.5
            }
        };
    },
    created() {
        // this.line.path = null
    },
    methods: {
        // 返回点在向量方向的上下顶点,长度基于brush.radius
        getTopAndBot(point, vector) {
            const top = point.add(vector.normalize().multiply(this.pathOptions.radius).rotate(-90))
            const bot = point.add(vector.normalize().multiply(this.pathOptions.radius).rotate(90))
            return [top, bot]
        },
        createPolygon() {
            const cindex = this.getCindex()
            this.$parent.$refs.category[cindex].createAnnotation()
            this.polygonPath = new paper.Path(this.pathOptions)
        },
        onMouseUp(e) {
        },
        onMouseDown(e) {
            const point = e.point
            if (!this.judeTag()) return
            if(this.judgePoint(point)) {
                this.$message.warning('起始点不可超过图片边界')
                return
            }
            if (this.polygonPath == null) {
                this.createPolygon()
                this.$parent.isAnnotateComplete = false;
            }
            this.polygonPath.add(point)
        },
        onMouseDrag(e) {
        },
        removeLenMetr() {
        if (this.lenMetr) {
            this.lenMetr.remove()
        }
        },
        removeRect() {
        if (this.rect) {
            this.rect.remove()
        }
        },
        updateRect() {
        if (this.rect) {
            this.rect.remove()
            this.lenMetr.remove()
        }
        const len = this.polygonPath.segments.length
        const p1 = this.polygonPath.segments[len - 2].point
        const p2 = this.polygonPath.segments[len - 1].point
        const vector = p2.subtract(p1)
        const middle = p1.add(vector.normalize(vector.length / 2))
        this.lenMetr = new paper.PointText({
            point: middle,
            content: vector.length.toFixed(2) + 'px',
            color: 'red'
        })
        this.rect = new paper.Path.Rectangle({
            position: middle,
            size: [vector.length, 10],
            fillColor: 'red',
            opacity: 0.5
        })
        this.rect.rotate(vector.angle)
        },
        removeLastPoints() {
            if (this.polygonPath) {
                this.polygonPath.removeSegment(0)
                this.polygonPath.removeSegment(this.polygonPath.segments.length - 1)
            }
        },
        onMouseMove(e) {
        //     this.selection.add(res[1])
        // this.selection.insert(0, res[0])
            const point = e.point
            if (!this.polygonPath || !this.polygonPath.segments.length) return
            // 方案一
            this.removeLastPoint()
            this.polygonPath.add(point)
            this.updateRect()
        },
        removeLastPoint() {
            if (this.polygonPath && this.polygonPath.segments.length > 1) {
                this.polygonPath.removeSegment(this.polygonPath.segments.length - 1)
            }
        },
        handleLineKeyDown(e) {
            if (e.keyCode === 70) {
                this.completeLine()
                e.stopPropagation()
            }
        },
        removePolygonPath() {
            if (this.polygonPath) {
                this.polygonPath.remove()
                this.polygonPath = null
            }
        },
        getFinalPath() {
            if (!this.polygonPath) return null    
            const f = new paper.Path({
                opacity: 0.5,
                fillColor: 'red',
                strokeWidth: 1,
                strokeColor: 'blue'
            })
            for (let i = 0; i < this.polygonPath.segments.length - 2; i++) {
                const vector = this.polygonPath.segments[i + 1].point.subtract(this.polygonPath.segments[i].point)
                const res = this.getTopAndBot(this.polygonPath.segments[i].point, vector)
                f.add(res[1])
                f.insert(0, res[0])
            }
            const vector = this.polygonPath.segments[this.polygonPath.segments.length - 2].point.subtract(this.polygonPath.segments[this.polygonPath.segments.length - 1].point)
            vector.rotate(180)
            const res = this.getTopAndBot(this.polygonPath.segments[this.polygonPath.segments.length - 1].point, vector)
            f.add(res[1])
            f.insert(0, res[0])
        },
        completeLine() {
            if (!this.polygonPath) return
            this.removeLastPoint()
            this.$parent.isAnnotateComplete = true;
            this.$parent.uniteCurrentAnnotation(this.polygonPath, true, true, false, true);
            this.removePolygonPath()
            this.removeLenMetr()
            this.removeRect()
        },
        setKeyDownListener() {
            window.addEventListener(
                'keydown',
                this.handleLineKeyDown,
                {
                    capture: true
                }
            )
        },
        // 判断当前标签是否已选择
        judeTag() {
            let cindex = this.$parent.current.category
            if (cindex === -1 || typeof(cindex) == 'undefined'){
                this.$message({message: '请在右侧选择标签', type: 'warning'});
                return false
            } else {
                return true
            }
        },
        judgePoint(point) {
            const imgInfo = this.getCurrentImageInfo()
            let p_x = Math.abs(point.x)
            let p_y = Math.abs(point.y)
            return p_x > (imgInfo.bounds.width / 2) || p_y > (imgInfo.bounds.height / 2)
        },
        getCindex() {
            const ccindex = this.$parent.current.category + this.$parent.picViewsList[0].categories.length * this.$parent.activePaperScope
            return ccindex
        },
        getCurrentImageInfo() {
            return paper.project && paper.project.layers['layerImg'].children[0]
        },
        export() {
            return {
                strokeColor: this.pathOptions.strokeColor,
                lineWidth: this.pathOptions.lineWidth
            };
        },
        removeKeydownListenser() {
            window.removeEventListener('keydown', 
            this.handleLineKeyDown,
            {
                capture: true
            })
        }
    },
    watch: {
        selected(val) {
            if (val === this.name) {
                this.setKeyDownListener()
            } else {
                this.removeKeydownListenser()
            }
        }
    },
    mounted() {
    },
    beforeDestroy() {
        this.removeKeydownListenser()
    }
};
</script>
