<template>
  <div>
    <Button type="primary" style="margin-bottom: 10px" @click="add">添加规格</Button>
    <Table :showSelect="false" :columns="columns" :data="values" width="600" :loading="loading"></Table>
  </div>
</template>

<script>
import {getListSpec, addSpec, register} from '@/api/settings/specification'
export default {
  data: function () {
    return {
      columns: [
        {
          title: '规格名称',
          key: 'specName',
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
      specName: '',
      loading: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      getListSpec()
        .then(res => {
          if (res.info === '暂无数据') {
            this.$Message.error('暂无数据')
            return
          }
          this.values = res.info
          this.loading = false
        })
        .catch(e => {
          this.$Message.error('网络异常')
          this.loading = false
        })
    },
    delete (item) {
      console.log(item)
      let self = this
      this.$Modal.confirm({
        title: '提示',
        content: `确定要删除<strong style="margin: 5px">${item.specName}</strong>吗？`,
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
      this.specName = ''
      this.$Modal.confirm({
        title: '添加规格',
        render: (h) => {
          return h('div', [
            h('Input', {
              props: {
                placeholder: '输入规格单位',
                value: this.specName
              },
              style: {
                'width': '200px',
                'display': 'block'
              },
              on: {
                input: (e) => {
                  // console.log(e);
                  this.specName = e
                }
              }
            })
            // h('Input', {
            //   props: {
            //     placeholder: '输入规格值',
            //     value: this.specName
            //   },
            //   style: {
            //     'width': '200px',
            //     'margin-top': '5px'
            //   },
            //   on: {
            //     input: (e) => {
            //       // console.log(e);
            //       this.specName = e
            //     }
            //   }
            // })
          ])
        },
        onOk: () => {
          console.log(this.specName)
          if (!this.specName) {
            this.$Message.error('规格名称不能为空')
            return
          }
          this.submit()
        }
      })
    },
    submit () {
      addSpec(this.specName)
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
