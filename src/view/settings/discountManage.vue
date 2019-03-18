<template>
  <div>
    <Button type="primary" style="margin-bottom: 10px" @click="add">添加折扣</Button>
    <Table :showSelect="false" :columns="columns" :data="values" width="600" :loading="loading"></Table>
  </div>
</template>

<script>
import {getDiscountList, addDiscount, deleteDiscount} from '@/api/settings/setting'
export default {
  components: {},
  data: function () {
    return {
      columns: [
        {
          title: '折扣',
          key: 'discountNum',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.delete(params.row)
                }
              }
            }, '删除')
          }
        }
      ],
      values: [],
      discountName: 0.0,
      loading: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      getDiscountList()
        .then(res => {
          this.values = res.info
          this.loading = false
        })
        .catch(e => {
          this.$Message.error('网络异常')
          this.loading = false
        })
    },
    delete (item) {
      let self = this
      this.$Modal.confirm({
        title: '提示',
        content: `确定要删除<strong style="margin: 5px">${item.discountNum}</strong>吗？`,
        onOk: function () {
          deleteDiscount(item.id)
            .then(res => {
              this.$Message.success('删除成功')
              self.getData()
            })
            .catch(e => {
              console.log(e)
              this.$Message.error('网络异常')
            })
        }
      })
    },
    add () {
      this.discountName = 0.0
      this.$Modal.confirm({
        title: '添加折扣',
        render: (h) => {
          return h('div', [
            h('p', '（0.0——1.0）'),
            h('InputNumber', {
              props: {
                placeholder: '折扣',
                value: this.discountName
              },
              style: {
                'width': '200px'
              },
              on: {
                input: (e) => {
                  console.log(e)
                  this.discountName = e
                }
              }
            })
          ])
        },
        onOk: () => {
          if (Number.parseFloat(this.discountName) <= 0 || Number.parseFloat(this.discountName) >= 1) {
            this.$Message.error('折扣格式错误')
            return
          }
          this.submit()
        }
      })
    },
    submit () {
      addDiscount(this.discountName)
        .then(res => {
          this.$Message.success('添加成功')
          this.getData()
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
