<template>
  <div>
    <Table stripe :columns="columns" :data="data"></Table>
    <div style="margin-top: 20px">
      <Page @on-change="onChangePage" :total="pageTotal * 10" />
    </div>
  </div>
</template>
<script>
  import clonedeep from 'clonedeep'
  export default ({
    data() {
      return {
        columns:[
          {
            title: '序号',
            key: 'index'
          },
          {
            title: '类别',
            key: 'name'
          },
          {
            title: '编号',
            key: 'goodsNum'
          },
          {
            title: '名称',
            key: 'goodsName'
          },
          {
            title: '规格',
            key: 'speciName'
          },
          {
            title: '数量',
            key: 'amount'
          },
          {
            title: '单位',
            key: 'unit'
          },
          {
            title: '金额',
            key: 'gPrice'
          },
          {
            title: '总金额',
            key: 'gTotalPrice'
          },
          {
            title: '批号',
            key: 'batchNum'
          },
          {
            title: '生产日期',
            key: 'produceTime'
          },
          {
            title: '到期日期',
            key: 'overTime'
          },
          {
            title: '条形码',
            key: 'barCode'
          },
          {
            title: '供应商',
            key: 'supplierName'
          },
        ]
      }
    },
    props: {
      data: {
        type: Array,
        default: () => ([])
      },
      pageTotal: {
        type: Number,
        default: 0
      }
    },
    methods: {
      onChangePage(e) {
        this.$emit('onChangePage', e)
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
