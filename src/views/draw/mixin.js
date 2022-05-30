import paper from "paper";

const DefaultColors = {
  enabled: "gray",
  active: "#409EFF",
  disabled: "gray",
  toggle: "red",
}

export default {
  model: {
    prop: "selected",
    event: "update",
  },
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  template:
    "<div><i v-tooltip.right='tooltip' class='fa fa-lg' :class='icon' :style='{ color: iconColor }' @click='click'></i><br></div>",
  data() {
    return {
      // tool: null,
      enabled: false,
      cursor: "default",
      Colors: DefaultColors,
    
    };
  },
  methods: {
    onMouseMove() {},
    onMouseDown() {},
    onMouseDrag() {},
    onMouseUp() {},

    click() {
      if (this.$parent.isAnnotateComplete === false){
        let _activeTool = this.$parent.activeTool
        if(_activeTool === '多边形工具'){
          this.$parent.$refs.polygon.complete()
        }else if (_activeTool === '矩形工具'){
          this.$Message.warning({
            background: true,
            content: '请先完成该矩形的标注!'
          });
          return
        }
      }
      this.update();
    },
    update() {
      if (this.isDisabled) return;

      this.$emit("update", this.name);
    },
    setPreferences() {},
  },
  computed: {
    currentShowType() {
      return this.$parent.currentShowType
    },
    isActive() {
      if (this.selected == this.name) {
        this.$emit("setcursor", this.cursor);
        return true;
      }
      return false;
    },
    iconColor() {
      if (this.isDisabled) return this.Colors.disabled;

      if (this.isToggled) return this.Colors.toggle;
      if (this.isActive) return this.Colors.active;

      return this.Colors.enabled;
    },
    isDisabled() {
      return false;
    },
    tooltip() {
      var tooltip = this.name;
      if (this.isDisabled) {
        tooltip = "(选择标签后可用)<br>" + tooltip;
      }
      if (this.shortcut) {
        tooltip = tooltip + "(" + this.shortcut + ")";
      }
      return tooltip;
    },
  },
  watch: {
    currentShowType(val){
      if (val == 'person') {
        this.tool.onMouseDown = ()=>{
          this.$parent.onLabelClick()
          this.$Message.warning('已自动切换回标注标签维度')
        }
      } else {
        this.tool.onMouseDown = this.onMouseDown;
      }
    },
    isActive(active) {
      if (active) {
        this.tool.activate();
      }
    },
    isDisabled(disabled) {
      if (disabled && this.isActive) {
        this.$emit("update", "Select");
      }
    },
  },
  mounted() {
    this.tool = new paper.Tool();

    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseDrag = this.onMouseDrag;
    this.tool.onMouseMove = this.onMouseMove;
    this.tool.onMouseUp = this.onMouseUp;
  },
};
