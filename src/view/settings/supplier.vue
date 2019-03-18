<template>
  <div>
    <Button type="primary" style="margin-bottom: 10px" @click="add">添加供应商</Button>
    <Table :showSelect="false" :columns="columns" :data="values" width="600" :loading="loading"></Table>
  </div>
</template>

<script>
import {getListSupplier, addSpec, register} from '@/api/settings/supplier'
export default {
  components: {},
  data: function () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '电话',
          key: 'phone',
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
      sourceName: '',
      sourcePhone: '',
      loading: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      getListSupplier()
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
        content: `确定要删除<strong style="margin: 5px">${item.name}</strong>吗？`,
        onOk: function () {
          register(item.id)
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
      this.sourceName = ''
      this.sourcePhone = ''
      this.$Modal.confirm({
        title: '添加供应商',
        render: (h) => {
          return h('div', [
            h('Input', {
              props: {
                placeholder: '输入供应商',
                value: this.sourceName
              },
              style: {
                'width': '200px',
                'display': 'block'
              },
              on: {
                input: (e) => {
                  // console.log(e);
                  this.sourceName = e
                }
              }
            }),
            h('Input', {
              props: {
                placeholder: '输入电话',
                value: this.sourcePhone
              },
              style: {
                'width': '200px',
                'margin-top': '5px'
              },
              on: {
                input: (e) => {
                  // console.log(e);
                  this.sourcePhone = e
                }
              }
            })
          ])
        },
        onOk: () => {
          if (!this.sourceName) {
            this.$Message.error('姓名不能为空')
            return
            }
          this.submit()
        }
      })
    },
    submit () {
      addSpec(this.sourceName, this.sourcePhone)
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
