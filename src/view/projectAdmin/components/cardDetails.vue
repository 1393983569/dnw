<template>
    <div>
      <Table stripe :columns="collumns" :data="dataList"></Table>
      <div style="margin-top: 10px">
        <Page :total="pageTotal * 10" @on-change="onChangePage" />
      </div>
    </div>
</template>
<script>
  import {getCusHkInfo} from '@/api/projectAdmin/components/cardDetails'
export default ({
  data () {
    return {
      collumns: [
        {
          title: '次数',
          key: 'sort'
        },
        {
          title: '开单人',
          key: 'kdName'
        },
        {
          title: '划卡人',
          key: 'name'
        },
        {
          title: '划卡时间',
          key: 'createTime'
        }
      ],
      dataList: [],
      pageNum: 1,
      pageTotal: 1,
      Ids: '',
      cusId: ''
    }
  },
  props: {
    idObj: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getList () {
      this.dataList = []
      getCusHkInfo(this.pageNum, this.Ids, this.cusId).then(res => {
        this.pageTotal = res.info.pageTotal
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error('暂无数据')
          return
        }
        res.info.data.forEach((item, index) => {
          this.dataList.push({
            kdName: item.kdName,
            name: item.name,
            createTime: item.createTime.split('.')[0].substring(0, 16),
            sort: item.sort
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 分页
    onChangePage (e) {
      this.pageNum = e
      this.getList()
    }
  },
  mounted () {

  },
  watch: {
    idObj(e) {
      if (!e) return
      if (e.idObj.state === 'S') {
        this.cusId = e.idObj.projectSelect.split('.')[0]
        this.Ids = e.idObj.pId
        this.getList()
      } else {
        this.Ids = e.idObj.id.projectId
        this.getList()
      }
    }
  }
})
</script>
<style>

</style>
