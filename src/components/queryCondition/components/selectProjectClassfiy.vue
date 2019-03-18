<template>
  <!-- 项目分类 -->
  <div>
    <CheckboxGroup v-model="catIdsValue" @on-change="selectBox">
      <Checkbox v-for="(item, index) in classfiyList" :label="item.id">{{ item.name }}</Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
  import {getPageTsProjectCategory} from '@/api/queryCondition/selectProjectClassfiy'
  export default ({
    data() {
      return {
        classfiyList: [],
        catIdsValue: []
      }
    },
    methods: {
      selectBox(e) {
        this.$emit('sendValue', {
          catIds: e
        })
      }
    },
    mounted () {
      this.classfiyList = []
      getPageTsProjectCategory().then(res => {
        this.classfiyList = []
        res.info.data.map(item => {
          this.classfiyList.push({
            name: item.name,
            id: item.id
          })
        })
      }).catch(err => {

      })
    }
  })
</script>
<style>

</style>
