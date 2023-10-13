<template>
	<div class="detection-main">
		<div class="top-panel flex-cb">
			<div style="display:flex">
				<el-button icon="el-icon-back" type="text" style="color:gray" @click="backToTaskList">返回</el-button>
				<el-select v-model="status" v-width="200" class="ivu-ml" @change="onStatusChange">
					<el-option v-for="item in tabOptions" :key="item.name" :value="item.name" :label="optionLabel(item)"
						:disabled="statusOptionDisabled(item)">
						<span>{{ item.label }}</span>
						<span style="float:right; color:#8492a6; font-size:13px">{{ optionCount(item) }}</span>
					</el-option>
				</el-select>
			</div>
			<div style="color: #fff;justify-content: flex-end;margin-left: -6%;" class="flex-ac options-list">
				<span style="font-size: 14px;color: gray">快捷跳转</span>
				<InputNumber v-model="targetIndex" class="mgl10" placeholder="输入目标位置" :min="1" :max="total"></InputNumber>
				<el-button style="margin-left: 10px;" size="small" @click="gotoIndex">确定</el-button>i
			</div>

			<div style="text-align: center">
				<el-button size="small" :disabled="currentImageIndex <= 0" @click="previousImage">上一组(←)</el-button>
				<span class="ivu-ml-8 ivu-mr-8">
					{{ currentImageIndex }} / {{ total }}
				</span>
				<el-button size="small" :disabled="(currentImageIndex + 1) > total" @click="nextImage">下一组(→)</el-button>
				<el-button size="small" @click="save" type="primary">保存(S)</el-button>
			</div>

			<div class="flex-cb">
				<el-button style="margin-right: 20px;" type="primary" size="small" @click="taskSubmit">提交标注任务</el-button>
			</div>

		</div>
		<!-- 当路由中的imageId变化时，只刷新中间部分页面 -->
		<div>
			<div class="middle-panel">
				<annotate
					v-if="annotate"
					ref="annotate" 
					:imageData="imageData"
					:taskDetail="taskDetail"
				 >
				</annotate>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import Annotate from './annotate.vue'
import mixins from './mixins.js'
import { readUserProfile } from '@/store/main/getters'
export default {
	// 组件名称
	name: 'detectionDouble',
	mixins: [mixins],
	// 局部注册的组件
	components: {
		Annotate
	},
	// 组件状态值
	data() {
		let paramsStatus = this.$route.params.status
		return {
			targetIndex: 1,
			total: 0,
			currentImageIndex: 0,
			annotate: true,
			taskDetail: {},
			imageData: [],
            status: paramsStatus || 'all'
		}
	},
	// 计算属性
	computed: {
        // 任务ID
        id () {
            return this.$route.params.taskId
        },
        // 当前用户的ID
        userId () {
            return readUserProfile(this.$store).id
        },
        // 当前图片ID
        imageId () {
            if (this.$route.params.imageId) {
                return this.$route.params.imageId
            }
            return this.firstImageId
        },
        // 任务的第一张图片ID
        firstImageId () {
            return this.taskDetail.first_label_image_id
        },
		// 根据任务类型，计算【全部/未标注/已标注/已忽略】等统计数据
		allCount () {
			if (!this.taskDetail.progress) return
            return this.taskDetail.progress.progress_label[1]
        },
        todoCount () {
            if (!this.taskDetail.progress) return
            return this.allCount - this.completeCount
        },
        completeCount () {
            if (!this.taskDetail.progress) return
            return this.taskDetail.progress.progress_label[0]
        },
		userProfile() {
			return readUserProfile(this.$store) || { roles: [] }
		},
	},
	// 组件方法
	methods: {
		async getData() {
			await this.getTaskDetail()
			await this.getImageData()
		},
		async getImageData() {
			const res = await this.$axios.getMutilChannelData(this.id, this.imageId)
			console.log('图片数据>>>', res)
			this.imageData = res.map((item, index) => {
				return {
					...item, 
					categories: item.categories.map((cateitem, cateindex) => {
						return {
							...cateitem,
							index: cateindex
						}
					}),
					key: index,
					src: "/api/v1/file/download?file_id=" + item.image.id,
					title: `通道${index}`
				}
			})
			// 临时数据
			const temp = [
				{
					title: '通道二',
					src: require('@/assets/bigPic2.png'),
					key: 1
				},
				{
					title: '通道三',
					src: require('@/assets/bigPic2.png'),
					key: 2
				},
				{
					title: '通道四',
					src: require('@/assets/bigPic2.png'),
					key: 3
				}
			]
			this.imageData.push(...temp)

			console.log('this.imageData>>>', this.imageData)
		},
        async getTaskDetail () {
			if (!this.id) return
			this.taskDetail = await this.$axios.getTask(this.id)
			console.log('this.taskDetail>>>', this.taskDetail)
        },
        // 根据任务类型，获取任务名称和统计数据
        optionLabel (option) {
            return `${option.label}（${this.optionCount(option)}）`
        },
        optionCount (option) {
            if (option.name === 'all') {
                return this.allCount
            } else if (option.name === 'todo') {
                return this.todoCount
            } else if (option.name === 'complete') {
                return this.completeCount
            }
        },
        statusOptionDisabled (item) {
            return this.optionCount(item) === 0
        },
		// 当图像状态选项变更时，需要更新route中的query
		onStatusChange () {
			this.$refs['annotate'].save()
			let params = this.$route.params
			params.status = this.status
			params.imageId = ''
			this.$router.push({
				params: {
					...params,
					refresh: true
				}
			}).catch(() => {})
        },
		backToTaskList() {
			this.$router.push({
				name: 'taskList',
			})
		},
		nextImage() {

		},
		previousImage() {
			
		},
		save() {

		},
		taskSubmit() {

		},
		gotoIndex() {
			const params = this.targetIndex
		}

	},
	created() {
		this.getData()
	},
	mounted() {
	},
	beforeDestroy() {
	},
}
</script>

<style lang="scss" scoped>
.top-panel {
	background-color: #fff;
	height: 57px;
	width: 100%;
	padding: 0 20px;
	border-bottom: 1px solid rgba(0, 0, 0, .1);
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
	border-top: 1px solid rgba(0, 0, 0, .1);
}

.disabledClick {
	cursor: not-allowed;
	color: #e5e5e5;
}

.audid-button {
	margin-left: 5%;

	.ivu-btn {
		&:hover {
			opacity: 0.8;
		}
	}
}
</style>
