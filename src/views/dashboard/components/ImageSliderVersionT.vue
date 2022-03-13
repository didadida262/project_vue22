<template>
    <div class="horizontal-container">
        <el-link class="scroll-button" icon="el-icon-arrow-left" :underline="false" @click="scroll(1)"></el-link>
        <div class="scroll-wrapper" ref="scroll">
            <div class="scroll-content">
                <div
                    v-for="(item, index) in imageList" :key="index"
                    class="scroll-item"
                >
                    <div v-if="item.img_name" style="font-size:15px">
                        <span style="font-weight:bold;">{{item.index}}. </span>
                        <span v-if="item.img_name.length <= 5">{{item.img_name}}</span>
                        <el-tooltip v-else class="item" effect="dark" :content="item.img_name" placement="bottom">
                            <span>{{ item.img_name.slice(0, 5) + '...' }}</span>
                        </el-tooltip>
                    </div>
                    <el-image
                        :class="[item.status === '未标注'? 'unMark-image': 'marked-image', 'image','cursor-pointer', item.selected? 'selected-image': '']"
                        fit="contain"
                        :src="item.img_thumbnail_url"
                        @click="clickItem(item)"
                    ></el-image>
                </div>
            </div>
        </div>
        <el-link class="scroll-button" icon="el-icon-arrow-right" :underline="false" @click="scroll(-1)"></el-link>
    </div>
</template>

<script lang="ts">
import BScroll from 'better-scroll'

export default {
    props: {
        imageList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            bs: null
        }
    },
    methods: {
        init() {
            this.bs = new BScroll(this.$refs.scroll, {
                scrollX: true,
                probeType: 3 // listening scroll event
            })
        },        
        scroll(direction) {
            let scroll = this.$refs.scroll
            let x = this.bs.x + direction * scroll.clientWidth
            if (x < this.bs.maxScrollX) {
                x = this.bs.maxScrollX
            } else if (x > this.bs.minScrollX) {
                x = this.bs.minScrollX
            }
            if (x == 0 && this.bs.x == 0) {
                this.$emit('onStart')
                return       
            }
            if (x == this.bs.maxScrollX && this.bs.x ==this.bs.maxScrollX) {
                this.$emit('onEnd')
                return       
            }
            this.bs.scrollTo(x, 0, 600)          
        },
        clickItem(item) {
            this.$emit('onClickItem', item)
            }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss">
.horizontal-container {
    .el-loading-mask {
        background-color: #8b0000c0;

        .el-loading-spinner {
            display: none;
        }
    }
}
</style>

<style lang="scss" scoped>
.horizontal-container {
    border: 1px solid red;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .scroll-button {
        font-size: 28px;
        margin: 10px;
    }
    .scroll-wrapper {
        border: 1px solid green;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        height: inherit;
        .scroll-content {
            display: inline-block;
            height: inherit;

            .scroll-item {
                margin-right: 5px;
                height: 92%;
                font-size: 24px;
                display: inline-block;
                text-align: center;
                padding: 10px 5px;

                .image {
                    /*TODO: 如果做成通用组件，这里高度不一定是150px，因此宽度的计算要更灵活*/
                    width: calc((150px - 10px * 2) / 4 * 3);
                    height: inherit;
                    object-fit: contain;
                    border-radius: 6px;
                    border: 3px solid transparent;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                }
                .selected-image {
                    border: 3px solid rgb(64, 158, 255) !important;
                    transform: scale(1.1);
                }
                .unMark-image {
                    border: 3px solid rgb(236,128,141);
                }
                .marked-image {
                    border: 3px solid rgb(107,223,146);
                }
            }
        }
    }
}
</style>
