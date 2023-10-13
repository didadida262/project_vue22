
/**
 * 功能：
 *  1.解析任务相关router路径中传入的params参数
 *  2.根据params中指定的任务编号，获取任务详情
 *  3.提供图像状态筛选的选项
 * 作者：wenshuoc
 * 邮箱：wenshuoc@evision.ai
 */
export default {
    data () {
        let paramsStatus = this.$route.params.status
        return {
            // 标注图像的状态筛选
            status: paramsStatus || 'all'
        }
    },
    computed: {
        tabOptions () {
            return [
                {
                    name: 'all',
                    label: '全部'
                },
                {
                    name: 'todo',
                    label: '未标注'
                },
                {
                    name: 'complete',
                    label: '已标注'
                }
            ]
        }
    }
}
