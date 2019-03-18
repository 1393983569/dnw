<template>
    <div style="width: 100%">
      <Button type="text" @click="clickPrimary = !clickPrimary" style="color: #2b85e4">高级筛选
        <Icon type="ios-arrow-down" :style="{transform:`rotate(${degValue}deg)`}" class="arrows" />
      </Button>
      <slot></slot>
      <div :style="{height: `${heightValue}px`}" class="showClass">
        <div ref="allHeight" >
          <div class="wrap-div" v-if="!showState.stateTIemDate">
            <div class="main-left">
              日期：
            </div>
            <div class="main-right">
              <selectTIemDate @sendValue="getValueObj"></selectTIemDate>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.stateProjectName">
            <div class="main-left">
              名称：
            </div>
            <div class="main-right">
              <selectProjectName @sendValue="getValueObj"></selectProjectName>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.statePriceRange">
            <div class="main-left">
              价格区间：
            </div>
            <div class="main-right">
              <selectPriceRange @sendValue="getValueObj"></selectPriceRange>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.stateProjectClassfiy">
            <div class="main-left">
              项目分类：
            </div>
            <div class="main-right">
              <selectProjectClassfiy @sendValue="getValueObj"></selectProjectClassfiy>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.shopClassfiy">
            <div class="main-left">
              产品分类：
            </div>
            <div class="main-right">
              <shopClassfiy @sendValue="getValueObj"></shopClassfiy>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.stateChannel">
            <div class="main-left">
              来源渠道：
            </div>
            <div class="main-right">
              <selectChannel @sendValue="getValueObj"></selectChannel>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.stateState">
            <div class="main-left">
              上/下线状态：
            </div>
            <div class="main-right">
              <select-state @sendValue="getValueObj"></select-state>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.stateSingleChoice">
            <div class="main-left">
              状态：
            </div>
            <div class="main-right">
              <selectSingleChoice @sendValue="getValueObj"></selectSingleChoice>
            </div>
          </div>

          <div class="wrap-div" v-if="!showState.stateMultipleChoice">
            <div class="main-left">
              顾客记录：
            </div>
            <div class="main-right">
              <stateMultipleChoice @sendValue="getValueObj"></stateMultipleChoice>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>
<script>
  import './main.less'
  // 状态
  import selectSingleChoice from './components/selectSingleChoice.vue'
  // 顾客记录
  import stateMultipleChoice from './components/stateMultipleChoice.vue'
  // 时间
  import selectTIemDate from './components/selectTIemDate.vue'
  // 上，下线状态
  import selectState from './components/selectState.vue'
  // 项目名称
  import selectProjectName from './components/selectProjectName.vue'
  // 项目分类
  import selectProjectClassfiy from './components/selectProjectClassfiy.vue'
  // 来源渠道
  import selectChannel from './components/selectChannel.vue'
  // 价格区间
  import selectPriceRange from './components/selectPriceRange.vue'
  // 产品分类
  import shopClassfiy from './components/shopClassfiy.vue'

  export default ({
    components: {
      selectSingleChoice,
      stateMultipleChoice,
      selectTIemDate,
      selectState,
      selectProjectName,
      selectProjectClassfiy,
      selectChannel,
      selectPriceRange,
      shopClassfiy
    },
    data() {
      return {
        clickPrimary: false,
        heightValue: 0,
        degValue: 0,
        sendList: [],
        mapList: new Map()
      }
    },
    props: {
      showState: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      getValueObj(e) {
        for (let key in e) {
          this.mapList.set(key, e[key])
        }
        this.sendList = []
        this.mapList.forEach((value, key, map) => {
          this.sendList.push({
            [key]: value
          })
        })
        this.$emit('sendDataList', this.sendList)
      }
    },
    mounted() {

    },
    watch: {
      'clickPrimary'(e) {
        if (e) {
          this.heightValue = this.$refs.allHeight.getBoundingClientRect().height
          this.degValue = -180
        } else {
          this.heightValue = 0
          this.degValue = 0
        }
      }
    }
})
</script>
<style>

</style>
