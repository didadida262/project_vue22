import paper from "paper";
export default {
    data() {
        return {
        };
    },
    created() {

    },
    mounted() {
        this.initTool()
    },
    methods: {
        initTool() {
            this.tool = new paper.Tool()
            this.tool.onMouseDown = this.onMouseDown
            this.tool.onMouseDrag = this.onMouseDrag
            this.tool.onMouseMove = this.onMouseMove
        }
    },
    watch:{
        selected() {
            if (this.selected === this.name) {
                console.log(`激活${this.name}`)
                this.tool.activate()
            }
        }
    }
};
