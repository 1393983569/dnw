<template>
  <!-- 渠道 -->
  <div>
    <CheckboxGroup v-model="selectChannels" @on-change="selectChannelValue">
      <Checkbox v-for="(item, index) in selectChannelList" :label="item.id">{{ item.name }}</Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
  import {getPageCusFrom} from '@/api/queryCondition/selectChannel'
  export default ({
    data() {
      return {
        selectChannels: [],
        selectChannelList: [],
        selectChannel: {}
      }
    },
    methods: {
      selectChannelValue(e) {
        this.$emit('sendValue', {
          cusFroms: e
        })
      }
    },
    mounted () {
      getPageCusFrom().then(res => {
        res.info.data.map(item => {
          this.selectChannelList.push({
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
