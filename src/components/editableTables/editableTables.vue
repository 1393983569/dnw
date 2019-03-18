<template>
  <div>
    <div style="display: inline-block; margin-bottom: 10px;vertical-align:top" v-if="stateSelect">
      <div style="display: inline-block;" v-if="selectShow">
        <Input v-model="selectValueInput" style="width: 300px;">
          <Select v-model="modelSelect" @on-clear="clickEmpty" clearable slot="prepend" @on-change="onValue" style="width:80px">
            <Option v-for="item in selectOption" :disabled="item.value === '-1'" :value="item.value"  :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button slot="append" icon="ios-search" @click="update"></Button>
        </Input>
      </div>
      <div style="display: inline-block;">
        <slot name='customSelect'></slot>
      </div>
      <div style="display: inline-block; vertical-align:top">
        <slot></slot>
      </div>
    </div>
    <Table ref="selection" stripe :columns="processingLolumns" :data="value" @on-selection-change="selectionChange" :loading="progress"></Table>
    <slot name='statistics'></slot>
    <Page :total="pageTotal * 10" show-elevator @on-change='emitPage' @on-page-size-change='emitPage' style="margin-top: 20px" />
  </div>
</template>
<script>
import clonedeep from 'clonedeep'
export default ({
  data () {
    return {
      editableId: '',
      processingLolumns: [],
      inputValue: '',
      selectValueInput: '',
      modelSelect: '',
      progress: false
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    width: {
      default: '100%'
    },
    value: {
      type: Array,
      default: () => ([])
    },
    selectOption: {
      type: Array,
      default: () => ([])
    },
    stateSelect: {
      type: Boolean,
      default: true
    },
    pageTotal: {
      default: '1'
    },
    selectShow: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    selectSatae: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 点击编辑
    handleClick ({row, column, index}) {
      if (`${column.key}_${index}` === this.editableId) {
        // 深拷贝
        let tableData = clonedeep(this.value)
        tableData[index][column.key] = this.inputValue
        if (this.inputValue) this.$emit('input', tableData)
        this.editableId = ''
        this.inputValue = ''
      } else {
        // 写入标识
        this.editableId = `${column.key}_${index}`
      }
    },

    // 写入数据触发
    handleInput (newValue) {
      this.inputValue = newValue
    },

    // 可编辑数据初始化
    compileInit () {
      // 初始化表格
      const processingLolumns = this.columns.map(item => {
        // 判断是否有可编辑数据 是否有render
        if (item.editable && !item.render) {
          // row当前行数据 当前列数据column 当前列索引index
          item.render = (h, {row, column, index}) => {
            // 比较状态
            const isEditable = this.editableId === `${column.key}_${index}`
            return (
              <div>
                {isEditable ? <i-input on-input={this.handleInput} value={row[column.key]} style="width: 50px" /> : <span>{row[column.key]}</span>}
                <i-button on-click={this.handleClick.bind(this, {row, column, index})}>{isEditable ? '保存' : '编辑'}</i-button>
              </div>
            )
          }
          // 返回编辑数据
          return item
          // 返回原数据
        } else return item
      })
      // 这里要使用新的columns
      this.processingLolumns = processingLolumns
    },

    // 清空筛选条件
    clickEmpty () {
      let data = {}
      data.selectValueInput = ''
      data.modelSelect = ''
      this.$emit('filtrateClick', data)
    },
    // 清空筛选
    selectEmpty () {
      this.selectValueInput = ''
      this.modelSelect = ''
    },
    // 选中事件
    onValue (e) {
      // 清空输入框数据
      this.selectValueInput = ''
      this.$emit('onChange', e)
    },

    // 提交选择内容事件
    update (e) {
      let data = {}
      data.selectValueInput = this.selectValueInput ? this.selectValueInput : ''
      data.modelSelect = this.modelSelect ? this.modelSelect : ''
      if (this.modelSelect) {
        this.$emit('filtrateClick', data)
      } else {
        this.$Message.error('请输入要搜索的字段')
      }
    },

    // 改变 page
    emitPage (e) {
      this.$emit('getPage', e)
    },
    selectionChange (selection) {
      this.$emit('selectionChange', selection)
    }
  },
  mounted () {
    // 初始化编辑
    this.compileInit()
  },
  watch: {
    isLoading: function (newValue) {
      this.progress = newValue
    },
    'selectSatae' () {
      this.selectEmpty()
    }
  }
})
</script>
<style>
</style>
