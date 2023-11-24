<template>
    <div>
        <div class="top-panel flex-cb">
            <div style="width:20%;display:flex">
                <el-button
                    icon="el-icon-back"
                    type="text"
                    style="color:gray"
                    @click="goBack"
                >返回</el-button>
            </div>

            <div style="width: 60%;text-align: center">
            </div>

            <div style="width: 20%;color: #fff;justify-content: flex-end" class="flex-ac">
                <el-button size="small" @click="save(null, true,'', true)" type="primary">保存(S)</el-button>
            </div>

        </div>

        <div class="middle-panel">
            <annotate
                v-if="true" 
                ref="annotate" 
                :showImageList="showImageList"
                :canBack="canBack"
				:snapshotLength.sync="snapshotLength"
				:canGo="canGo"
				:currentStep.sync="currentStep"
            ></annotate>
        </div>


        <div class="bottom-panel" v-if="showImageList">
            <thumbnail-scroll
                ref="thumbnail-scroll"
                @onClickItem="onClickItem"
                :imageId="$route.params.imageId"
                :index.sync="index"
                :total.sync="total"
            ></thumbnail-scroll>
        </div>

    </div>
</template>

<script>
import Annotate from '@/pages/detection/annotate.vue'
import ThumbnailScroll from "./thumbnailScroll.vue"

export default {
    name: "single",
    components: {
        Annotate,
        ThumbnailScroll
    },
    data() {
        return {
			currentStep: 1,  // 当前步数
			snapshotLength: 0,
            index: -1,
            total: 0,
        }
    },
    methods: {
        stepControl(step) {
			if ((step > 0 && this.canGo) || step < 0 && this.canBack) {
				this.currentStep += step
				this.$refs['annotate'].changeStep(this.currentStep)
			}
		},
        // 回到导航页
        goBack() {
            this.$refs['annotate'].save()
            if (this.$route.query.goback === "summary") {
                this.$router.push({
                    name: 'summaryList',
                })
            }else {
                this.$router.push({
                    name: 'sampleList',
                })
            }
        },
        save(callback, disableCheck, saveType, submitTrig) {
            setTimeout(() => {
                this.$refs['annotate'].save(callback, disableCheck, saveType, submitTrig)
            }, 0)
        },
        async onClickItem(index) {
            let nextImage = await this.$refs['thumbnail-scroll'].gotoImage(index)
            this.$router.push({
                name: "detection-mask",
                params: {
                    sampleId: this.$route.params.sampleId,
                    imageId: nextImage.img_id,
                    name: this.$route.params.name
                }
            })
        },
    },
    computed: {
        canBack() {
            return this.currentStep > 1
        },
        canGo() {
            return this.currentStep < this.snapshotLength
        },
        showImageList(){
            if (this.$route.query.goback === 'summary') {
                return false
            }else {
                return true
            }
        }
    }
}
</script>

<style scoped>
.top-panel {
    background-color: #fff;
    height: 57px;
    width: 100%;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    position: absolute;
    z-index: 20;
}
.middle-panel {
    height: calc(100vh - 150px);
}
.bottom-panel {
    display: block;
    margin: 0 320px 0 75px;
    height: 150px;
    background-color: #fff;
    border-top: 1px solid rgba(0,0,0,.1);
}
</style>
