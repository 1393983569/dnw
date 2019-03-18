<template>
    <div style="margin-top: 5px">
      <template v-for="(item, index) in mealList">
        <div class="projectListStyle" @click="clickProject(item.value)">{{ item.lable }}<span style="color: #d22e20">{{ item.time }}</span></div>
      </template>
    </div>
</template>
<script>
import {getCusProject} from '@/api/projectAdmin/projectAdmin'
export default ({
  data () {
    return {
      mealList: []
    }
  },
  props: {
    cusIdValue: {
      type: String,
      require: true
    }
  },
  methods: {
    getList () {
      this.mealList = []
      getCusProject(this.cusIdValue).then(res => {
        this.mealList = []
        if (res.info === '暂无数据') {
          return
        }
        res.info.map(item => {
          this.mealList.push({
            lable: item.title,
            value: item.id,
            time: item.time.split('.')[0]
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    clickProject (e) {
      this.$emit('clickProject', {
        projectId: e,
        cusId: this.cusIdValue
      })
    }
  },
  mounted () {
    this.getList()
  }
})
</script>
<style>
  .projectListStyle{
    display: inline-block;
    padding: 0 7px;
    box-sizing: border-box;
    font-size: 12px;
    color: #46b54f !important;
    border: 1px solid #9fcdb3 !important;
    background-color: #e6fffb;
    border-radius: 3px;
    cursor: pointer;
    margin: 5px 5px;
  }
</style>
