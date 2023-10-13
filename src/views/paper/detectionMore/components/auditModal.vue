<style lang="less">
.audit-custom-style {
    .ivu-modal-wrap {
        .ivu-modal {
            position: absolute;
        }
        .ivu-modal-content {
            background-color: rgba(255,255,255,0.4);
        }
        .ivu-modal-close {
            right: -2px;
            top: -3px;
        }
        .ivu-modal-body {
            padding: 0;
        }
        .audit-content {
            padding: 10px;
            color: black;
            // .close-btn {
            //     position: absolute;
            //     top: -4px;
            //     right: 12px;
            //     transform: rotate(45deg);
            //     font-size: 29px;
            //     cursor: pointer;
            // }
            .close-text {
                position: absolute;
                top: 8px;
                right: 12px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
            }
            span {
                display: block;
                max-width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
<template>
    <Modal
        class="audit-custom-style audit-modal"
        :mask="false"
        width="170"
        :footer-hide="true"
        :closable="false"
        @on-cancel="whenAuditModalClose"
        :select_tools_position="selectToolsPosition"
        v-model="isShowAuditModal"
        :styles="{top: `${selectToolsPosition.clientY + 30}px`, left: `${selectToolsPosition.clientX - 85}px`}"
    >
        <div class="audit-modal audit-content" @click="changeAnnotation(false, true)" @dblclick="changeAnnotation(true, false)">
            <!-- <span class="audit-modal close-btn" @click="changeAnnotation(false, false)">+</span> -->
            <span class="audit-modal close-text" @click="changeAnnotation(false, false)">
                {{currentText}}
            </span>
            <span class="audit-modal" v-if="annotationsInfo.category">标签：{{annotationsInfo.category.name}}</span>
            <span class="audit-modal" v-if="annotationsInfo.category">标注人：{{creator}}</span>
            <span class="audit-modal" v-if="labelType=='label'">双击修改标签及配置</span>
        </div>
    </Modal>
</template>
<script>
    import { readUserProfile } from '@/store/main/getters'
    export default {
        name: "auditModal",
        props: {
            isShowAuditModal: {
                type: Boolean,
            },
            selectToolsPosition: {
                type: Object,
            },
            annotationsInfo: {
                type: Object,
            },
            labelType: {
                type: String
            }
        },
        data () {
            return {
            }
        },
        watch: {
            // annotationsInfo(val) {
            // }
        },
        computed: {
            currentText() {
                if (this.annotationsInfo.annotation && this.labelType == 'label') {
                    const { id, source } =  this.annotationsInfo.annotation
                    const isLabel = location.hash.includes('label')
                    if (isLabel || id < 0 || source === 'AUDIT') {
                        return '删除'
                    }
                    return '取消选择'
                }
            },
            creator() {
                return this.annotationsInfo.annotation.creator || this.userProfile.full_name
            },
            userProfile() {
                return readUserProfile(this.$store) || { roles: [] }
            },
        },
        methods: {
            changeAnnotation(dbclick,click) {
                this.$emit('changeAnnotation', this.annotationsInfo.annotation.id, dbclick, click, this.currentText)
                !click && this.$emit("update:isShowAuditModal", false)
            },
            whenAuditModalClose() {
                this.$emit("update:isShowAuditModal", false)
            }
        }
    }
</script>
