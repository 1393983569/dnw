<template>
    <div>
      <Divider orientation="left">备注列表</Divider>
      <slot></slot>
      <editable-Tables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectShow="false" @filtrateClick='filtrateClick' @getPage='getPageNum'></editable-Tables>
    </div>
</template>
<script>
import editableTables from '_c/editableTables'
import { getPageCusRemark } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import clickImg from '_c/clickImg'
export default ({
  data () {
    return {
      columns: [
        {
          title: '创建人',
          key: 'cName'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '备注图片',
          key: 'rePic',
          render: (h, params) => {
            if (!params.row.rePic) {
              return h('div', [
                h(clickImg, {
                  props: {
                    rePic: params.row.rePic
                  }
                })
              ])
            } else {
              return h('div', '无图片')
            }
          }
        }
      ],
      pageTotal: 1,
      pageNum: 1,
      modal: false,
      img: '',
      dataList: []
    }
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
    memarkState: {
      type: Number,
      default: 1
    }
  },
  methods: {
    filtrateClick (e) {

    },
    getPageNum (e) {
      this.pageNum = e
    },
    cancel () {

    },
    gitList () {
      this.dataList = []
      getPageCusRemark(this.pageNum, this.userId).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          this.dataList.push({
            cName: item.cName,
            createTime: item.createTime.split('.')[0].substring(0, 16),
            remark: item.remark,
            rePic: item.rePic.split(',')
          })
        })
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  components: {
    editableTables,
    clickImg
  },
  mounted () {
    this.gitList()
  },
  watch: {
    'memarkState' (e) {
      this.pageNum = 1
      this.gitList()
    }
  }
})
</script>
<style>

</style>
