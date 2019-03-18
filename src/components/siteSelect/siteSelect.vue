<!-- 级联动 -->
<template>
    <Cascader @on-change='getSiteDate' :data="data" v-model="value" :load-data="loadData" style="width: 200px;display: inline-block;"></Cascader>
</template>
<script>
import { getProvinceList, getCityList, getAreaList } from '@/api/components/siteSelect.js'
import clonedeep from 'clonedeep'
export default {
  data () {
    return {
      data: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    // 初始化得到省
    getProvince () {
      return getProvinceList().then(res => {
        let data = []
        res.info.map(item => {
          let value = {}
          value.value = item.id
          value.label = item.name
          value.loading = false
          value.children = []
          value.state = '1'
          data.push(value)
        })
        this.data = clonedeep(data)
      }).catch(err => {
        console.log(err)
      })
    },
    getCity (id) {
      return getCityList(id).then(res => {
        let data = []
        res.info.map(item => {
          let value = {}
          value.value = item.id
          value.label = item.name
          value.loading = false
          value.children = []
          value.state = '2'
          data.push(value)
        })
        return clonedeep(data)
      }).catch(err => {
        console.log(err)
      })
    },
    getArea (id) {
      return getAreaList(id).then(res => {
        let data = []
        res.info.map(item => {
          let value = {}
          value.value = item.id
          value.label = item.name
          value.state = '3'
          data.push(value)
        })
        return clonedeep(data)
      }).catch(err => {
        console.log(err)
      })
    },
    loadData (item, callback) {
      // 省
      if (item.state === '1') {
        this.getCity(item.value).then(res => {
          item.loading = true
          item.children = res
          item.loading = false
          callback()
        }).catch(err => {
          console.log(err)
        })
      } else if (item.state === '2') {
        this.getArea(item.value).then(res => {
          item.loading = true
          item.children = res
          item.loading = false
          callback()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getSiteDate (e) {
      this.$emit('input', e)
    }
  },
  mounted () {
    this.getProvince()
  },
  watch: {

  }
}
</script>
<style>
</style>
