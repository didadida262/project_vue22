<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="article-container">
    <div class="header flex-cb pd10 mgb10">
      <h1>Article List</h1>
      <div>
        <span class="article-container-timeTitle">Time:</span>
        <span class="article-container-timeContent">{{ currentTime }}</span>
      </div>
      <el-button type="primary" @click="addArticle">Write</el-button>
    </div>
    <diary-card :info="temp"/>
    <diary-card v-for="(item, index) in articleList" :key="index" :info="item" />
  </div>
</template>

<script>
import diaryCard from './components/diaryCard.vue'
import bus from '@/api/eventBus'

export default {
  name: 'Form',
  components: {
    diaryCard
  },
  data() {
    return {
      currentTime: null,
      RAF: null,
      temp: {
        title: '大清退位诏书',
        content: '大清宣统三年十二月二十五日（公元1912年2月12日），大清国皇帝颁布退位诏书，全文如下：朕钦奉隆裕太后懿旨：前因民军起事，各省响应，九夏沸腾，生灵涂炭，特命袁世凯遣员与民军代表讨论大局，议开国会，公决政体。两月以来，尚无确当办法，南北睽隔，彼此相指，商辍于途，士露于野，徒以国体一日不决，故民生一日不安。今全国人民心理多倾向共和，南中各省既倡议于前；北方诸将亦主张于后，人心所向，天命可知，予亦何忍因一姓之尊荣，拂兆民之好恶。用是外观大势，内审舆情，特率皇帝将统治权公之全国，定为共和立宪国体。近慰海内厌乱望治之心，远协古圣天下为公之义。袁世凯前经资政院选举为总理大臣，当兹新旧代谢之际，宣布南北统一之方，即由袁世凯以全权组织共和政府，与民军协商统一办法。总期人民安堵，海宇又安，仍合汉满蒙回藏五族完全领土为一大中华民国，予与皇帝得以退处宽闲，优游岁月，长受国民之优礼，亲见郅治之告成，岂不懿欤！钦此。'
      },
      timer: null,
      articleList: []
    }
  },
  created() {
    this.getData()
    this.updateTime()
  },
  beforeDestroy() {
    // clearInterval(this.timer)
    cancelAnimationFrame(this.RAF)
  },
  methods: {
    updateTime() {
      cancelAnimationFrame(this.RAF)
      this.RAF = requestAnimationFrame(() => {
        this.currentTime = (new Date()).toLocaleString()
        this.updateTime()
      })
    },
    async getData() {
      // const res = await this.$axios.getArticleList()
      // console.log('文章数据--->', res)
      // this.articleList = [
      //   ...res.data
      // ]
    },
    addArticle() {
      bus.$emit('click', '数据！！！！！！！！！！！')
      // this.$router.push({ name: 'createArticle' })
    }
  }
}
</script>

<style scoped lang="scss">
.article-container {
  .header {
    height: 50px;
  }
  &-timeTitle {
    color: #000;
    font-weight: bold;
    font-family: consolas;
    font-size: 30px;
  }
  &-timeContent{
    font-weight: bold;
    font-family: consolas;
    font-size: 30px;
    color: #650D65;
  }

}
</style>

