<!--
 * @Author: Hhvcg
 * @Date: 2023-02-14 15:47:00
 * @LastEditors: -_-
 * @Description: 又原缩略图改造
-->

<template>
    <div></div>
</template>

<script lang="ts">
import DetectionAPI from "@/api_v2/detection"
import { readUserProfile } from '@/store/main/getters'

export default {
    // 组件名称
    name: 'thumbnailScroll',
    // 组件参数 接收来自父组件的数据
    props: {
        index: {
            type: Number,
            default: 0
        },
        imageId: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    },
    // 组件状态值
    data () {
        let paramsStatus = this.$route.params.status
        return {
            status: paramsStatus || 'all',
            absoluteIndex: 0, // 图片在任务中的绝对序号
            page: {
                // 缩略图滑条加载的图片页码是一个页码范围
                firstPage: parseInt(this.$route.params.page) || 0,
                lastPage: (parseInt(this.$route.params.page) - 1) || 0,
                total: 0,
                nPage: -1,
                pageSize: 18
            },
            imageItemList: [],
            // 传给image-slider的url list
            currentImageIndex: -1
        }
    },
    // 计算属性
    computed: {
        // 任务ID
        id () {
            return this.$route.params.taskId
        },
        // 样本源ID
        sampleId () {
            return this.$route.params.sampleId
        },
        // 任务类型：audit审核，或label标注
        type () {
            return this.$route.params.type
        },
        userProfile() {
            return readUserProfile(this.$store) || { roles: [] }
        },
        imageList() {
            return this.imageItemList.map(item => {
                return {
                    img_name: item.img_name,
                    url: item.img_thumbnail_url,
                    clickable: true,
                    index: item.index,
                    mask_png_url: item.mask_png_url
                }
            })
        },
        firstIndexLoaded() {
            return (this.page.firstPage - 1) * this.page.pageSize
        },
        lastIndexLoaded() {
            return (this.page.lastPage - 1) * this.page.pageSize + this.imageItemList.length - 1
        }
    },
    // 侦听器
    watch: {
        imageId: {
            handler(val) {
                if (!!val) {
                    this.loadThumbnailData()
                }
            },
            immediate: true
        },
        currentImageIndex(val) {
            let realIndex = this.firstIndexLoaded + val
            this.$emit('update:index', realIndex)
        },
        page: {
            deep: true,
            handler(val) {
                let realIndex = this.firstIndexLoaded + this.currentImageIndex
                this.$emit('update:index', realIndex)
                // 更新图像总数
                this.$emit('update:total', val.total)
            }
        },
    },
    // 组件方法
    methods: {
        // 分隔符===========
        // 分隔符===========
        // 分隔符===========
        async getNavigationList(loadingPage) {
            let status = this.status
            let res = {}
            if (!!this.id) {
                const params = {
                    task_id: this.id,
                    status: status,
                    page: loadingPage,
                    page_size: this.page.pageSize
                }
                res = await DetectionAPI.getNavigationList(this.id, {
                    ...params,
                    page: 1,
                })
            }else if (!!this.sampleId){
                res = await DetectionAPI.getNavigationSampleList(this.sampleId, {
                    page: loadingPage,
                    page_size: this.page.pageSize
                })
            }

            this.page.total = res['total']
            this.page.nPage = res['n_pages']
            return res['items']
        },
        // 向后加载
        async loadNextPage() {
            if (this.page.nPage >= 0 && this.page.lastPage >= this.page.nPage) {
                return
            }
            this.page.lastPage += 1
            let list = await this.getNavigationList(this.page.lastPage)
            this.imageItemList.push(...list)
        },
        // 向前加载
        async loadPrevPage() {
            if (this.page.firstPage <= 1) {
                return
            }
            this.page.firstPage -= 1
            let list = await this.getNavigationList(this.page.firstPage)
            this.imageItemList.unshift(...list)
            // 向前加载，原本的队列前部被塞入了图像，因此currentImageIndex失效，需要增加塞入图像的数量以继续指向当前图的位置
            this.currentImageIndex += list.length
        },
        onClickItem(relativeIndex: number) {
            this.$emit('onClickItem', relativeIndex + this.firstIndexLoaded)
        },
        async gotoImage(index) {
            // 连续地加载图像列表，直到跳转目标位置的图像被加载进来为止
            while (index < this.firstIndexLoaded) {
                await this.loadPrevPage()
            }
            while (index > this.lastIndexLoaded) {
                await this.loadNextPage()
            }
            while(!this.imageItemList[index - this.firstIndexLoaded]) {
                await this.loadNextPage()
            }
            // currentImageIndex赋值操作必须放在最后，否则会导致缩略图实例未渲染完成，获取失败
            this.currentImageIndex = index - this.firstIndexLoaded
            const image = this.imageItemList[this.currentImageIndex]
            this.absoluteIndex = image.index
            return image
        },
        async loadThumbnailData() {
            await this.loadNextPage()
            // if [], router_to_all
            if (this.imageItemList.length === 0) {
                let params = this.$route.params
                params.status = "all"
                this.$router.push({params: params}).catch(() => {})
                return
            }
            this.currentImageIndex = this.imageItemList.findIndex(item => item.img_id == this.imageId)
            if (this.currentImageIndex >= 0) this.absoluteIndex = this.imageItemList[this.currentImageIndex].index
            // 如果在当前缩略图列表中没有找到目标图像，则跳转到列表的首张图
            if (this.currentImageIndex === -1 && this.imageItemList.length > 0) {
                this.$emit('onClickItem',  this.firstIndexLoaded)
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
