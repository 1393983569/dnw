/**
  dataList 渲染列表数据 @on-success 表单正确时触发
  <dynamicConditionFrom :dataList="dataListSymptom" @on-success="onSuccess"></dynamicConditionFrom>
  dataList 数据结构
   dataListSymptom: [
        // 输入框
        {
          // 类型
          type: 'i-input',
          // 初始值
          value: '',
          // 字段值
          name: 'name',
          // 标题
          label: '姓名',
          // 验证规则
          rule: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ]
        },
        {
          // 下拉选择
          type: 'i-select',
          value: '',
          name: 'site',
          label: '地址',
          children: [
            {
              type: 'i-option',
              list: [
                {value: '1212', text: '兰州'}
              ]
            },
            {
              type: 'i-option',
              list: [
                {value: '4544545', text: '青海'}
              ]
            }
          ]
        },
        {
          // 单选
          type: 'radioGroup',
          value: 0,
          label: '性别',
          name: 'sex',
          children: [
            {
              type: 'radio',
              list: [
                {label: 0, text: '男'},
                {label: 1, text: '女'}
              ]
            }
          ]
        },
        {
          // 多选
          type: 'checkboxGroup',
          value: [],
          label: '爱好',
          name: 'interest ',
          children: [
            {
              type: 'checkbox',
              list: [
                {label: 0, text: '看书'},
                {label: 1, text: '看电影'}
              ]
            }
          ]
        }
      ]
 */
<template>
    <Form
      ref="formValidateForm"
      v-if="Object.keys(formValidate).length"
      :label-width="50"
      label-position="left"
      :model="formValidate"
      :rules="rules"
    >
      <FormItem
        v-for="(item, index) in dataList"
        :label= "item.label"
        :prop="item.name"
        :key="`${index}_${_uid}`"
      >
        <comment
          :is="item.type"
          v-model="formValidate[item.name]"
        >
          <template v-if="item.children" v-for="(itemChildren, indexChildren) in item.children">
            <!-- 子集 -->
            <comment
              v-for="(listItem, listIndex) in itemChildren.list"
              :is="itemChildren.type"
              :value="listItem.value"
              :key="`${index}_${_uid}_${indexChildren}_${listIndex}`"
              :label="listItem.label"
            >
              {{listItem.text}}
            </comment>
          </template>
        </comment>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidateForm')">提交</Button>
      </FormItem>
    </Form>
</template>
<script>
export default ({
  data () {
    return {
      rules: {},
      formValidate: {}
    }
  },
  mounted () {
    this.setInitValue()
  },
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 初始化
    setInitValue () {
      let formValidateNew = {}
      let rulesNew = {}
      this.dataList.forEach(item => {
        formValidateNew[item.name] = item.value
        rulesNew[item.name] = item.rule
      })
      this.rules = rulesNew
      this.formValidate = formValidateNew
    },
    // 提交
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('on-success', this.formValidate)
        }
      })
    }
  }
})
</script>
<style>

</style>
