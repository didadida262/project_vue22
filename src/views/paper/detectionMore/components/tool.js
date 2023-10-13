import paper from 'paper';

const DefaultColors = {
  enabled: 'gray',
  active: '#59C3E1',
  disabled: 'gray',
  toggle: 'red'
}

export default {
  model: {
    prop: 'selected',
    event: 'update'
  },
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  template:
    "<div><i v-tooltip.right='tooltip' class='fa fa-lg' :class='icon' :style='{ color: iconColor }' @click='click'></i><br></div>",
  data () {
    return {
      enabled: false,
      Colors: DefaultColors
    };
  },
  methods: {
    onMouseMove () {},
    onMouseDown () {},
    onMouseDrag () {},
    onMouseUp () {},

    click () {
      this.update();
    },
    update () {
      this.$emit('update', this.name);
    },
    setPreferences () {}
  },
  computed: {
    iconColor () {
      if (this.isActive) return this.Colors.active;
      return this.Colors.enabled;
    },
    isActive () {
      return this.selected === this.name
    },
    tooltip () {
      return this.name + '(' + this.shortcut + ')'
    }

  },
  watch: {
    selected () {
      if (this.selected === this.name) {
        this.tool.activate();
        this.$emit('setcursor', this.cursor);
      }
    }
  },
  mounted () {
    this.tool = new paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseDrag = this.onMouseDrag;
    this.tool.onMouseMove = this.onMouseMove;
    this.tool.onMouseUp = this.onMouseUp;
  }
};
