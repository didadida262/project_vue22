<template>
    <div>
        <Card :padding="0">

            <div v-show="!!showCheckBox" class="action-extra" >
                <el-checkbox v-model="item.selected" v-if="!hideCheckBox" class="checkbox"></el-checkbox>
                <Poptip slot="extra" trigger="hover" class="cursor-pointer ppt" placement="bottom-start">
                    <Icon type="md-more" style="font-size: 18px"/>

                    <List slot="content" style="margin: 0;padding: 0">
                        <ListItem v-if="item.status === '待审核' || item.status === '已完成'">
                            <el-button type="text" size="small" @click="gotoSingleLabel">修改标注</el-button>
                        </ListItem>

                        <!-- <ListItem><el-button type="text" size="small" @click="showModalHandle" v-if="this.name !=='summary'">详情</el-button></ListItem> -->
                        <ListItem><el-button :disabled="!item.delete_image" type="text" size="small" @click="$emit('delete', [item])">删除</el-button></ListItem>
                        <ListItem><el-button type="text" size="small" @click="DownloadImage">下载图片</el-button></ListItem>
                    </List>
                </Poptip>
            </div>
               <el-tooltip content="查看详情" style="cursor: pointer;position: relative"> 
                   <div>
                   <el-image 
                   :src="item.image_thumbnail_url"
                    fit="contain"
                    @click.stop="imagemAgnify"
                    ></el-image>  
                    <el-image
                    style="position: absolute; top: 0; left: 0"
                    v-if="item.mask_png_url" 
                    :src="item.mask_png_url"
                    @click.stop="imagemAgnify"
                    fit="contain"
                    ></el-image> 
                    </div> 

                </el-tooltip>
            
            <Divider />
            <div class="info-container">
                <div class="image-info flex-cb" style="width: 100%" ref="image-info">
                    <Ellipsis :text="item.image_name" :length="hideStatus? 15 : 6" tooltip class="stext" placement="bottom-start"/>
                    <div v-if="item.project_type === 'ATTRIBUTE_RECOGNITION' && item.tag_names[0]">
                        <el-tooltip class="item" effect="dark" :content="item.tag_names[0]" placement="bottom">
                            <span v-if="item.tag_names[0].length <= 6" style="font-weight:bold">{{ item.tag_names[0]}}</span>
                            <span v-else style="font-weight:bold">{{ item.tag_names[0].slice(0, 6) + '...' }}</span>
                        </el-tooltip>
                    </div>
                    <div class="stext flex-ac" v-if="!hideStatus">
                        <div>{{ item.status }}</div>
                        <img v-if="item.status === '已完成'" style="height: 25px;" src="@/assets/svg/label_status_complete.svg">
                        <img v-else-if="item.status === '待分配'" style="height: 25px;" src="@/assets/svg/audit_status_ignore.svg">
                        <img v-else-if="item.status === '待标注'" style="height: 25px;" src="@/assets/svg/label_status_todo.svg">
                        <img v-else-if="item.status === '待审核'" style="height: 25px;" src="@/assets/svg/audit_status_todo.svg">
                    </div>
                </div>
            </div>
            <!-- navcard只有在dataSetDetails页面需要显示ok或者ng -->
            <div v-if="showOK">
               <el-tag v-if="item.abnormal_annotation_type === 'OK'" size='small'>{{ item.abnormal_annotation_type }}</el-tag>
               <el-tag v-else type="danger" size='small'>{{ item.abnormal_annotation_type }}</el-tag>
            </div>
        </Card>

        <Modal v-model="showModal" footer-hide :width="1000">
            <div class="detail-box flex">
                <div>
                    <Button 
                        v-if="fileinfo.compare_image_id" style="margin-bottom: 10px"
                        @mouseleave.native="() => showCompare(false)"
                        @mouseup.native="() => showCompare(false)"
                        @mousedown.native="() => showCompare(true)">
                        查看对比图
                    </Button>
                    <div class="flex-cc items image-spin-container" style="background-color: #b1b1b1">
                        <Spin v-if="showCompareImg && compareImgLoading" fix size="large" style="background-color: rgba(255, 255, 255,0)!important">
                            <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
                            <div>加载中</div>
                        </Spin>
                        <el-image
                            @load="() => compareLoading(false)"
                            style="height: 100%; width: 100%"
                            :src="showCompareImg
                                ? '/api/v1/file/download?file_id=' + fileinfo.compare_image_id 
                                : fileinfo.image_thumbnail_url"
                            fit="contain"
                        ></el-image>
                        <el-image
                            v-if="fileinfo.mask_png_url"
                            style="height: 100%; width: 100%;position: absolute; top: 0; left: 0"
                            :src="fileinfo.mask_png_url"
                            fit="contain"
                        ></el-image>
                    </div>
                </div>

                <div class="items pdlr20">
                    <Ellipsis  v-if="fileinfo.image_name" class="btext" :text="fileinfo.image_name" :length="30" style=" display: flex;flex-wrap:wrap" tooltip />
                    <DescriptionList :col="1" class="mgt20">
                        <Description term="图片宽高：">
                            {{ fileinfo.image_width }} * {{ fileinfo.image_height }}
                        </Description>

                        <Description term="图片大小：">
                            {{ fileinfo.image_size }}
                        </Description>

                        <Description term="标注标签：">
                            {{ Boolean(fileinfo.tag_names) ?  fileinfo.tag_names.join("、") : "-" }}
                        </Description>

                        <Description term="样本源：">
                            {{ fileinfo.origin_data_name || '-' }}
                        </Description>

                        <Description term="标注任务：">
                            <!-- {{ fileinfo.label_task_name?fileinfo.label_task_name.length: '/' }} -->
                                <span v-if="!fileinfo.label_task_name">'-'</span>
                                <span v-else-if="fileinfo.label_task_name.length <= 10">{{ fileinfo.label_task_name }}</span>
                                <span v-else>{{ fileinfo.label_task_name.slice(0,10) + "..."}}</span>
                        </Description>
                    </DescriptionList>

                    <p class="mgt30 mgb10" style="color: black">操作记录</p>
                    <Table
                        :max-height="200"
                        :columns="operationColumns"
                        :data="fileinfo.user_operations"
                        :border="true"
                        width="400"
                    ></Table>
                </div>

            </div>
        </Modal>
    </div>
</template>

<script>
import {readUserProfile} from "@/store/main/getters";
import {downloadFile} from "@/utils";


export default {
    name: "navCard",
    props: ['item', 'hideStatus', 'showCheckBox', 'hideCheckBox','sunmmayName'],
    data() {
        return {
            showModal: false,
            operationColumns: [
                {
                    title: '时间',
                    key: 'operation_time',
                    minWidth: 60
                },
                {
                    title: '操作人员',
                    key: 'user_name'
                },
                {
                    title: '操作类型',
                    key: 'operation_type'
                }
            ],
            fileinfo: {},
            showCompareImg: false,
            compareImgLoading: false
        }
    },
    created(){
    },
    computed: {
        showOK() {
            return (this.$route.name === 'dataSetDetails' || this.$route.name === 'trainings-detail') && this.item.project_type === 'ANOMALY_DETECTION'
        },
        userProfile() {
            return readUserProfile(this.$store) || { roles: [] }
        },
    },
    methods: {
        showCompare(show) {
            show && (this.compareImgLoading = true)
            this.showCompareImg = show
        },
        compareLoading(loading) {
            this.compareImgLoading = loading
        },
        imagemAgnify(){
          this.showModalHandle()
        },
        DownloadImage() {
            downloadFile(this.item.image_id)
        },
        async showModalHandle(){
            if (this.hideStatus) {
                this.$router.push({
                    name: 'detection-single',
                    params: {
                        taskId: this.item.label_task_id,
                        type: 'audit',
                        imageId: this.item.original_file_id
                    },
                    query: {
                        goback: 'summary'
                    }
                })
                return
            }
            this.fileinfo = await this.$axios.getPreviewFileDetail({
                image_id: this.item.image_id,
                label_task_id: this.item.label_task_id,
                origin_data_id: this.item.origin_data_id,
                external_dataset_id: this.item.external_dataset_id,
                published_dataset_file_id: this.item.published_dataset_file_id
            })
            this.showModal=true
        },
        gotoSingleLabel() {
            if (!this.item.modify_image_annotation) {
                this.$Message.info('该图片所属任务仍在标注中，暂时无法进行单张修改')
                return
            }
            if (this.item.project_type === 'ATTRIBUTE_RECOGNITION') {
                this.$router.push({
                    name: 'detectionClassify-single',
                    params: {
                        taskId: this.item.label_task_id,
                        type: 'audit',
                        imageId: this.item.image_id
                    },
                    query: {
                        goback: 'summary'
                    }
                })
            } else {
                this.$router.push({
                        name: 'detection-single',
                        params: {
                            taskId: this.item.label_task_id,
                            type: 'audit',
                            imageId: this.item.image_id
                        },
                        query: {
                            goback: 'summary'
                        }
                    })
                }
            }

    }
}
</script>

<style scoped lang="scss">
.ivu-card-body {
    padding: 0;

    .el-image {
        margin: 12px 12px 6px;
        width: calc(100% - 12px * 2);
        height: 147px;
    }
    .ivu-divider-horizontal {
        margin: 0;
    }
    .info-container {
        padding: 6px 12px 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .image-info {
            width: calc(100% - 32px);
        }
        .index {
            font-weight: bold;
            color: black;
        }
    }
}
.action-extra {
    .checkbox {
        position: absolute;
        left: 20px;
        top: 15px
    }
    .ppt {
        z-index: 2;
        position: absolute;
        right: 10px;
        top: 15px;
    }
    ::v-deep .ivu-poptip-body {
        padding: 0;
    }
    ::v-deep .ivu-poptip-inner {
        width: 100px;
    }
    .ivu-list-item {
        padding: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.detail-box{
    padding: 20px;
    .items{
        width: 500px;
        height: 500px;
    }
}
::v-deep .ivu-description-term {
    color: grey;
    width: 100px;
    padding-bottom: 8px;
}
::v-deep .ivu-description-detail {
    padding-bottom: 8px;
}
.image-info flex-cb  ivu-ellipsis stext
{
    color:#272C33
}
.image-spin-container {
    display: inline-block;
    position: relative;
}
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
</style>
