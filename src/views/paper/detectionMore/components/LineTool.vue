<script>
import paper from "paper";
import tool from "./tool";


export default {
    name: "LineTool",
    mixins: [tool],
    props: {
        scale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            icon: "fa-window-minimize",
            name: "直线工具",
            shortcut: "字母 L",
            scaleFactor: 3,
            cursor: "copy",
            line: {
                pathOptions: {
                    strokeColor: "white",
                    strokeWidth: 1,
                    lineWidth: 40
                }
            },

            // 两个点的信息
            firstPoint: null,
            lastPoint: null
        };
    },
    created() {
        this.line.path = null
    },
    methods: {
        export() {
            return {
                strokeColor: this.line.pathOptions.strokeColor,
                lineWidth: this.line.pathOptions.lineWidth
            };
        },
        setPreferences(pref) {
            this.line.pathOptions.strokeColor = pref.strokeColor || this.line.pathOptions.strokeColor;
            this.line.pathOptions.lineWidth = pref.lineWidth || this.line.pathOptions.lineWidth;
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

        clampPoint(p) {
            const imgInfo = this.getCurrentImageInfo()
            const clamp = (min, val, max) => Math.max(min, Math.min(val, max))
            const { width, height } = imgInfo.bounds
            const maxw = (width - this.line.pathOptions.lineWidth) / 2
            const maxh = (height - this.line.pathOptions.lineWidth) / 2
            return new paper.Point({ x: clamp(-maxw, p.x, maxw), y: clamp(-maxh, p.y, maxh) })
        },
        onMouseDown(event) {
        },
        onMouseMove(event) {
            const imgInfo = this.getCurrentImageInfo()
            if (!this.line.path) return

            if (this.line.path.segments.length > 1){
                this.removeLastPoint();
            }

            let _point = this.clampPoint(event.point)
            let p_x = Math.abs(_point.x)
            let p_y = Math.abs(_point.y)

            if(this.firstPoint && p_x > imgInfo.bounds.width / 2 || p_y > imgInfo.bounds.height/ 2){
                return
            }
            this.lastPoint = _point
            this.line.path.removeSegments();
            this.line2polygon()
            this.line.path.closePath();
        },
        onMouseDrag(event){
        },
        onMouseUp(event){
            if (!this.judeTag()) return
            const point = this.clampPoint(event.point)
            if (!this.firstPoint){
                // if(this.judgePoint(event.point)) {
                //     this.$message.warning('起始点不可超过图片边界')
                //     return
                // }
                this.createLine(point)
                this.$parent.isAnnotateComplete = false;
            } else {
                this.completeLine(point)
            }
        },
        removeLastPoint() {
            this.line.path.removeSegment(this.line.path.segments.length - 1);
        },
        // 以当前开始结束点,更新line.path四个点位置
        line2polygon() {
            const vector = this.lastPoint.subtract(this.firstPoint)
            this.line.path.add(vector.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(-90).add(this.firstPoint))
            this.line.path.add(vector.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(90).add(this.firstPoint))
            const vector2 = this.firstPoint.subtract(this.lastPoint)
            this.line.path.add(vector2.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(-90).add(this.lastPoint))
            this.line.path.add(vector2.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(90).add(this.lastPoint))
        },
        getCindex() {
            const ccindex = this.$parent.current.category + this.$parent.picViewsList[0].categories.length * this.$parent.activePaperScope
            return ccindex
        },
        createLine(point) {
            let current = this.$parent.current
            if (this.line.path) {
                this.line.path.selected = false;
            }
            let cindex = this.getCindex()
            this.$parent.$refs.category[cindex].createAnnotation()
            // this.$parent.$refs.category[current.category].createAnnotation()
            this.firstPoint = point
            this.line.path = new paper.Path(this.line.pathOptions);
            this.line.path.add(this.firstPoint);
        },
        findPoint(firstPoint,secondPoint) {
            let deltx = secondPoint.x - firstPoint.x
            let delty = secondPoint.y - firstPoint.y
            let length = Math.sqrt(deltx * deltx + delty * delty)
            let lineWidth = this.line.pathOptions.lineWidth / 2

            return [
                {
                    x: secondPoint.x - delty * lineWidth / length,
                    y: secondPoint.y + deltx * lineWidth  / length
                },
                {
                    x: secondPoint.x + delty * lineWidth / length,
                    y: secondPoint.y - deltx * lineWidth / length
                },
                {
                    x: firstPoint.x - delty * lineWidth / length,
                    y: firstPoint.y + deltx * lineWidth  / length
                },
                {
                    x: firstPoint.x + delty * lineWidth / length,
                    y: firstPoint.y - deltx * lineWidth / length
                }
            ]
        },
        judgePoint(point) {
            const imgInfo = this.getCurrentImageInfo()
            let p_x = Math.abs(point.x)
            let p_y = Math.abs(point.y)
            return p_x > (imgInfo.bounds.width / 2) || p_y > (imgInfo.bounds.height / 2)
        },
        completeLine(point){
            this.$parent.isAnnotateComplete = true;
            const secondHornPoint = this.findPoint(this.firstPoint, point)
            // console.log(secondHornPoint, this.imgInfo.raster.width / 2, this.imgInfo.raster.height / 2)
            if(secondHornPoint.some(item => this.judgePoint(item))) {
                this.$message.warning('直线框超过图片边界')
                return
            }
            
            this.lastPoint = point
            this.line.path.removeSegments();
            this.line2polygon()
            this.line.path.closePath();
            this.$parent.uniteCurrentAnnotation(this.line.path,true, true, false, true);
            this.removeLine()
        },
        removeLine(){
            this.line.path.remove();
            this.line.path = null;

            this.firstPoint = null
            this.lastPoint = null
        },
        decreaseWidth() {
          if (!this.isActive) return;
          if (this.line.pathOptions.lineWidth - 2 < 1) {
              this.line.pathOptions.lineWidth = 1
              return
          }
          this.line.pathOptions.lineWidth -= 2;
          this.line.path.removeSegments();
          this.line2polygon()
        },
        increaseWidth() {
          if (!this.isActive) return;
          this.line.pathOptions.lineWidth += 2;
          this.line.path.removeSegments();
          this.line2polygon()
        },
        getCurrentImageInfo() {
            return paper.project && paper.project.layers['layerImg'].children[0]
        },
    },
    computed: {
        isDisabled() {
            return this.$parent.current.category === -1;
        }
    },
    watch: {
        // isActive(active) {
        //     if (active) {
        //         this.tool.activate();
        //         localStorage.setItem("editorTool", this.name);
        //     }
        // },
        /**
         * Change width of stroke based on zoom of image
         */
        scale(newScale) {
            this.line.pathOptions.strokeWidth = newScale * this.scaleFactor;
            if (this.line.path != null)
                this.line.path.strokeWidth = newScale * this.scaleFactor;
        },

        "line.pathOptions.strokeColor"(newColor) {
            if (this.line.path == null) return;

            this.line.path.strokeColor = newColor;
        },
    },
    mounted() {}
};
</script>
