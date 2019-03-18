<template>
    <div style="margin-top: 5px">
      <template v-for="(item, index) in mealList">
        <div class="setMealStyle" @click="clickMeal(item.value)">{{ item.lable }} <span style="color: #d22e20">{{ item.time }}</span></div>
      </template>
    </div>
</template>
<script>
import {getCusSetMeal} from '@/api/projectAdmin/projectAdmin'
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
      getCusSetMeal(this.cusIdValue).then(res => {
        if (res.info === '暂无数据') return
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
    clickMeal (e) {
      this.$emit('clickMeal', {
        csmId: this.cusIdValue,
        pId: e
      })
    }
  },
  mounted () {
    this.getList()
  }
})
</script>
<style>
  .setMealStyle{
    display: inline-block;
    padding: 0 7px;
    box-sizing: border-box;
    font-size: 12px;
    color: #1890ff !important;
    border: 1px solid #91d5ff !important;
    background-color: #e6f7ff;
    border-radius: 3px;
    cursor: pointer;
    margin: 5px 5px;
  }
</style>
