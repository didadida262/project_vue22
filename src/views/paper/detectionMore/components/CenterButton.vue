<!--
 * @Author: Hhvcg
 * @Date: 2023-03-15 10:32:18
 * @LastEditors: Hhvcg
-->
<script>
import button from "@/mixins/toolBar/button";
import paper from 'paper'

export default {

  name: "CenterButton",
  mixins: [button],
  data() {
    return {
      name: "居中图片",
      shortcut: "字母 C",
      icon: "fa-align-center"
    };
  },
  methods: {
    execute() {
      paper.projects.forEach((pro) => {
        const raster = pro.layers['layerImg'].children[0]
        pro.view.zoom = 1
        pro.view.setCenter(0, 0)
      })
    }
  }
};
</script>
