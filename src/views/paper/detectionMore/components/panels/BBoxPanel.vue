<!--
 * @Author: hhvcg 719713496@qq.com
 * @Date: 2023-10-10 16:15:54
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description: 
 * 
-->
<template>
  <div v-show="bbox.isActive">
    <el-tooltip class="item" effect="dark" placement="bottom">
      <div slot="content">
        点击删除当前矩形标注框<br />快捷键：退格键 <Icon type="ios-backspace-outline" />
      </div>
      <!-- <Button style="width: 70px;" @click="bbox.deleteBbox" type="error" size="small" ghost>
        删除(<Icon type="ios-backspace-outline" />)
      </Button> -->
    </el-tooltip>
    <!-- <Divider type="vertical" />
    <span class="mglr10">边框颜色</span>
    <ColorPicker size="small" v-model="bbox.polygon.pathOptions.strokeColor" /> -->
  </div>
</template>

<script>
import PanelButton from "@/components/PanelButton";
import PanelToggle from "@/components/PanelToggle";
import PanelInputString from "@/components/PanelInputString";
import PanelInputNumber from "@/components/PanelInputNumber";
export default {
  name: "BBoxPanel",
  components: { PanelButton, PanelToggle, PanelInputString, PanelInputNumber },
  props: {
    bbox: {
      type: Object,
      required: true,
    },
  },
};
</script>
