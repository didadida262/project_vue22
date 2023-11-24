<template>
    <div class="detection-navigation-container">
        <div class="flex-jb">
            <div>
                <span class="btext">{{ taskDetail.name }}</span>
                <Tag class="ivu-ml" :color="statusColorMap[taskDetail.status]">{{ taskDetail.status }}</Tag>
            </div>

            <div class="flex-cc">
                <span class="stext">{{ typeName }}进度 ({{ completeCount }}/{{ completeCount + todoCount }})</span>
                <el-progress class="mgl10" :percentage="parseInt(completeCount / (completeCount + todoCount) * 100)" style="width: 150px;"></el-progress>
                <Button class="mgl5" @click="goBack">返回</Button>
            </div>
        </div>

        <Layout class="main-panel mgt10">
            <Content :key="contentKey">
                <Tabs v-model="status">
                    <TabPane
                        v-for="(item, index) in tabOptions[type]" :key="index"
                        :label="optionLabel(item)" :name="item.name"
                    ></TabPane>
                </Tabs>
                <div v-if="false" class="menu-container flex-cb">
                    <el-checkbox v-model="checkAll">全选</el-checkbox>
                    <el-link class="ivu-ml">删除</el-link>
                    <el-link class="ivu-ml">导出</el-link>
                </div>
                <Row :gutter="20">
                    <Col :xl="4" :lg="6" :md="8" :sm="12" :xs="24" class="ivu-mb" v-for="(item, index) in navigationList" :key="item.img_id">
                        <nav-card :item="item"></nav-card>
                    </Col>
                </Row>
                <Page
                    :current.sync="page.current"
                    :total="page.total"
                    :page-size="page.pageSize"
                    show-total
                    show-elevator
                    @on-change="onChange"
                />
            </Content>
            <transition name="sider">
                <Sider v-show="showImageDetail">
                    <div v-if="!!navigationList && selectedImage > -1 && !!navigationList[selectedImage]">
                        <el-button type="text" @click="hideImageDetail" size="mini">
                            <i class="el-icon-d-arrow-right"></i>
                        </el-button>
                        <el-image
                            :src="navigationList[selectedImage].img_url"
                            :preview-src-list="[navigationList[selectedImage].img_url]"
                            fit="contain"
                        ></el-image>
                        <p class="image-title ivu-mb">{{ navigationList[selectedImage].img_name }}</p>
                        <Form :label-width="100">
                            <FormItem label="数据状态：">{{ navigationList[selectedImage].status }}</FormItem>
                            <FormItem label="数据大小：">{{ navigationList[selectedImage].img_size }}</FormItem>
                            <FormItem label="标注标签：">
                                <Tag
                                    v-for="(tag, index) in navigationList[selectedImage].tag_list" :key="index"
                                >{{ tag }}</Tag>
                            </FormItem>
                            <FormItem label="样本源：">{{ navigationList[selectedImage].source_name }}</FormItem>
                            <FormItem label="操作记录："></FormItem>
                            <Table
                                max-height="400"
                                :columns="operationColumns"
                                :data="navigationList[selectedImage].logs"
                                :border="true"
                            ></Table>
                        </Form>
                    </div>
                </Sider>
            </transition>
        </Layout>
    </div>
</template>

<script lang="ts">
import mixin from './mixins'
import DetectionAPI from '@/api_v2/detection'
import navCard from '@/pages/detection/navCard.vue'
import { readUserProfile } from '@/store/main/getters'

export default {
    mixins: [ mixin ],
    components:{
        navCard
    },
    name: 'navigation',
    data() {
        return {
            checkAll: false,
            showImageDetail: false,
            selectedImage: -1,

            navigationList: [],
            page: {
                current: 1,
                total: 0,
                pageSize: 18
            },

            operationColumns: [
                {
                    title: '时间',
                    key: 'date',
                    minWidth: 60
                },
                {
                    title: '操作人员',
                    key: 'full_name'
                },
                {
                    title: '动作类型',
                    key: 'action'
                }
            ],
            operationData: [],
        }
    },
    computed: {
        userProfile() {
            return readUserProfile(this.$store) || { roles: [] }
        },
        contentKey() {
            return this.showImageDetail ? 1 : 0
        },
        noFurtherAction() {
            // 目前正在查看无需审核页面
            let ignore = this.status === 'ignore'
            // 当前正在查看一张图的详情页，且该图无需审核
            ignore = ignore || (!!this.navigationList[this.selectedImage] && this.navigationList[this.selectedImage].status == '无需审核')
            // 目前正在查看一个空列表
            ignore = ignore || this.navigationList.length === 0
            return ignore
        }
    },
    watch: {
        status(val) {
            this.page.current = 1
            this.getNavigationList()
        }
    },
    async mounted() {
        this.getNavigationList()
        if (this.type === 'audit' && this.status === 'auditable') {
            this.status = 'all'
        }
    },
    methods: {
        async getNavigationList() {
            let res = await DetectionAPI.getNavigationList(this.id, {
                task_id: this.id,
                status: this.status,
                page: this.page.current,
                page_size: this.page.pageSize
            })
            this.page.total = res['total']
            this.navigationList = res['items']
        },

        showDetail(index: number) {
            this.showImageDetail = true
            this.selectedImage = index
        },
        hideImageDetail() {
            this.showImageDetail = false
            this.selectedImage = -1
        },
        onChange(current: number) {
            this.getNavigationList()
        },

        startLabel() {
            let params = this.$route.params
            if (this.showImageDetail && !!this.navigationList[this.selectedImage]) {
                // 如果用户选中了一个图，就从该图开始标注
                params.imageId = this.navigationList[this.selectedImage].img_id
            } else if (this.navigationList.length > 0 && (this.type != 'audit' || this.status != 'all')) {
                // 如果当前正在展示的图像列表不为空，则从第一张图开始
                params.imageId = this.navigationList[0].img_id
            } else {
                params.imageId = this.firstImageId
            }
            params.status = this.status
            params.page = this.page.current
            this.$router.push({
                name: 'detection-main',
                params: params
            })
        },
        clickDowpDownMenu(name: string, index: number) {
            if (name == 'detail') {
                this.showDetail(index)
            }
        },
        goBack() {
            this.$router.push({
                name: 'tasks'
            })
        }
    }
}
</script>

<style lang="scss">
.detection-navigation-container {
    height: 100vh;

    .ivu-page-header {
        border-bottom: 3px solid #e8eaec;

        .title {
            display: inline-block;
            line-height: 36px;
        }
    }
    .main-panel {
        flex-grow: 1;

        .ivu-layout-content {
            position: relative;

            .menu-container {
                position: absolute;
                right:0;
                top:0;
                padding: 8px 0;

                .el-checkbox {
                    margin: 0 !important;
                }
            }
            .ivu-page {
                float: right;
            }
        }
        .ivu-layout-sider {
            background: white;
            min-width: 400px !important;
            width: 400px !important;
            max-width: 400px !important;
            height: inherit;
            padding: 16px;
            border-left: 1px solid #e8eaec;
            position: relative;

            .el-button {
                position: absolute;
                left: 5px;
                top: 0;
                font-size: 20px;
            }
            .el-image {
                margin: 25px 25px 15px;
                width: calc(100% - 25px * 2);
                height: 300px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            }
            .image-title {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
            .ivu-form-item {
                margin-bottom: 0;

                label {
                    margin-bottom: 0;
                }
                .ivu-form-item-label {
                    font-weight: bold;
                }
            }
            .ivu-table {
                font-size: 12px;
                .ivu-table-tip {
                    overflow-x: hidden;
                }
            }
        }
    }
    .sider-enter-active, .sider-leave-active {
        transition: all .3s ease;
    }
    .sider-enter, .sider-leave-to {
        transform: translateX(400px);
    }
}
</style>
