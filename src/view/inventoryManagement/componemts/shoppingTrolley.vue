<template>
    <div>
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
  import clonedeep from 'clonedeep'
  export default ({
    data() {
      return {
        columns:[
          {
            title: '商品名称',
            key: 'goodsName'
          },
          {
            title: '商品价格',
              key: 'shopPrice'
          },
          {
            title: '库存',
              key: 'stock'
          },
          {
            title: '单位',
              key: 'unit'
          },
          {
            title: '规格',
              key: 'speciName'
          },
          {
            title: '类别',
              key: 'catName'
          },
          {
            title: '数量',
            key: 'amount',
            width: 100,
            render: (h, params) => {
              let dataList = ''
              return h('div', [
                h('inputNumber', {
                  props: {
                    min: 0,
                    value: params.row.amount
                  },
                  on: {
                    'on-change': (e)=> {
                      dataList = clonedeep(this.data)
                      dataList[params.index].amount = e
                    },
                    'on-blur': () => {
                      this.$emit('amountChange', dataList)
                    }
                  }
                })
              ])
            }
          },
          {
            title: '操作',
              key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
            let showAdd = false
            return h('div', [
              h('Button',{
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emit('delete', params.row.id)
                  }
                }
              },'删除')
            ])
          }
        }
      ]
      }
    },
    props: {
      data: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {

    },
    mounted () {

    }
  })
</script>
<style>

</style>
