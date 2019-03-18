<template>
  <div>
    <Button type="primary" style="margin-bottom: 10px" @click="add">添加支付渠道</Button>
    <Table :showSelect="false" :columns="columns" :data="values" width="600" :loading="loading"></Table>
  </div>
</template>

<script>
import {getPayWayList, addPayWay, deletePawWay} from '@/api/settings/setting'
export default {
  components: {},
  data: function () {
    return {
      columns: [
        {
          title: '渠道名称',
          key: 'name',
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
      loading: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      getPayWayList()
        .then(res => {
          this.values = res.info.data
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
          deletePawWay(item.id)
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
      this.$Modal.confirm({
        title: '添加支付渠道',
        render: (h) => {
          return h('Input', {
            props: {
              placeholder: '输入支付渠道',
              value: this.sourceName
            },
            style: {
              'width': '200px'
            },
            on: {
              input: (e) => {
                // console.log(e);
                this.sourceName = e
              }
            }
          })
        },
        onOk: () => {
          if (!this.sourceName) {
            this.$Message.error('不能为空')
            return
          }
          this.submit()
        }
      })
    },
    submit () {
      addPayWay(this.sourceName)
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
