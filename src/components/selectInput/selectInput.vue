<template>
    <div style="display: inline-block; margin-bottom: 5px">
      <Input class="clickBu" clearable v-model="valueInput" v-if="selectData.length > 1">
        <Select v-model="valueSelect" slot="prepend" style="width: 80px">
          <Option v-for="item in selectData" :value="item.key">{{ item.name }}</Option>
        </Select>
        <Button slot="append" icon="ios-search" @click="clickBu"></Button>
      </Input>
      <Input class="clickBu" search @on-search="clickBuOne" clearable v-else="selectData.length === 1" v-model="oneLenghtInput" :placeholder="`请输入${selectData[0].name}`" style="width: 300px">
        <Button slot="append" icon="ios-search" @click="clickBuOne"></Button>
      </Input>
    </div>
</template>
<script>
  import './selectInput.less'
  export default ({
    data() {
      return {
        valueInput: '',
        valueSelect: '',
        oneLenghtInput: ''
      }
    },
    props: {
      selectData: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      clickBu() {
        let data = {}
        if (!this.valueInput) {
          this.valueSelect = ''
          this.valueInput = ''
        }
        data.key = this.valueSelect
        data.value = this.valueInput
        this.$emit('subData', data)
      },
      clickBuOne() {
        let data = {}
        data.key = this.selectData[0].key
        data.value = this.oneLenghtInput
        this.$emit('subData', data)
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
