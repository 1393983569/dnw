<template>
    <div>
      <div style="display: inline-block" v-if="stateSelect">
        <Input v-model="valueInput" style="width: 300px">
          <Select v-model="model" @on-clear="clickEmpty" clearable slot="prepend" @on-change="onValue" style="width:80px">
            <Option v-for="item in selectOption" :disabled="item.value === '-1'" :value="item.value"  :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button slot="append" icon="ios-search" @click="update"></Button>
        </Input>
      </div>
      <div style="margin-top: 30px">
        <Table border :columns="list" :data="data"></Table>
      </div>
      <div style="margin-top: 20px">
        <Page :total="!totalPage ? totalPage = 10 : totalPage * 10" show-elevator @on-change="setPageNum"/>
      </div>
    </div>
</template>
<script>
import './tables.less'
export default ({
  data () {
    return {
      model: '',
      selectData: '',
      valueInput: ''
    }
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    selectOption: {
      type: Array,
      default: () => ([
        {
          value: '-1',
          label: '暂无数据'
        }
      ])
    },
    totalPage: {
      type: Number,
      default: 1
    },
    stateSelect: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onValue (e) {
      this.selectData = e
    },
    clickEmpty () {
      this.valueInput = ''
      this.$emit('sendEvent', 'empty')
    },
    clearSingleSelect (e) {
      console.log(e)
    },
    update () {
      if (this.selectData === '') {
        this.$Message.error('请选择筛选条件')
      } else {
        let data = {}
        data.selectData = this.selectData
        data.inputData = this.valueInput
        this.$emit('sendEvent', data)
      }
    },
    setPageNum (e) {
      this.$emit('getPageNum', e)
    }
  },
  mounted: function () {

  }
})
</script>
<style>

</style>
