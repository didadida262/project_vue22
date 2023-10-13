<!--
 * @Author: Hhvcg
 * @Date: 2023-08-02 15:40:41
 * @LastEditors: Hhvcg
-->
<template>
    <div v-show="line.isActive">
        <el-tag>F键完成标注</el-tag>

        <!-- <span class="mglr10">线宽度</span>
        <InputNumber v-model="line.line.pathOptions.lineWidth"
                     :min="1"
                     :max="100"
                     :step="1"
                     size="small"
                     style="width: 100px;"
        ></InputNumber>

        <Divider type="vertical"/>

        <span class="mglr10">引导线颜色</span>
        <ColorPicker size="small" v-model="line.line.pathOptions.strokeColor" /> -->

    </div>
</template>

<script>


export default {
    name: "LinePanel",
    props: {
        line: {
            type: Object,
            required: true,
        },
    },
};
</script>
