<template>
    <div>
      <Button type="primary" size="large" @click="showModel">添加类别</Button>
      <Table :columns="columns" :data="values" width="600" style="margin-top: 20px;"></Table>
      <Modal title="添加类别" v-model="show" class-name="vertical-center-modal">
        <div>
          <Input placeholder="请输入类别名称" clearable long v-model="cateName"></Input>
        </div>
        <div slot="footer">
          <Button type="primary" @click="add">保存</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
import './proCateManage.less'
import {getCateList, addCate, deleteCate, modifyCate} from '@/api/productManagement/productManagement.js'
export default {
  data: function () {
    return {
      columns: [
        {
          title: '类别名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modify(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  'marginLeft': '5px'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      values: [],
      show: false,
      cateName: ''
    }
  },
  methods: {
    getData () {
      getCateList()
        .then(res => {
          if (res.info.data instanceof Array) {
            this.values = res.info.data
          } else {
            this.$Message.info('暂无数据')
          }
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
        })
    },
    showModel () {
      this.cateName = null
      this.show = true
    },
    add () {
      if (!this.cateName) {
        this.$Message.info('名称不能为空')
        return
      }
      addCate(this.cateName)
        .then(res => {
          this.$Message.success('添加成功')
          this.getData()
          this.show = false
        })
        .catch(e => {
          this.$Message.error('网络异常')
          this.show = false
        })
    },
    delete (item) {
      this.$Modal.confirm({
        title: '提示',
        content: `确定要删除<strong style="margin: 5px">${item.name}</strong>`,
        onOk: () => {
          deleteCate(item.id)
            .then(res => {
              this.$Message.success('删除成功')
              this.getData()
            })
            .catch(e => {
              this.$Message.error('网络异常')
            })
        }
      })
    },
    modify (item) {
      this.cateName = item.name
      this.$Modal.confirm({
        title: '修改提示',
        render: (h, params) => {
          return h('div', [
            h('Input', {
              props: {
                placeholder: '请输入名称',
                value: this.cateName
              },
              on: {
                input: (e) => {
                  this.cateName = e
                }
              }
            }, item.name)
          ])
        },
        onOk: () => {
          modifyCate(item.id, this.cateName)
            .then(res => {
              this.$Message.success('删除成功')
              this.getData()
            })
            .catch(e => {
              console.log(e)
              this.$Message.error('网络异常')
            })
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
