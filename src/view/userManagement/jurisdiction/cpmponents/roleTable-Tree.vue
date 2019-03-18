<template>
    <div>
      <Tree :data="dataTree" show-checkbox @on-check-change="getSelectTree" ref="Tree"></Tree>
    </div>
</template>
<script>
import clonedeep from 'clonedeep'
import { getModuleTree, getRoleMenu } from '@/api/userManagement/role'
import permissionSetting from '@/config/permissionSetting'
export default ({
  data () {
    return {
      dataTree: clonedeep(permissionSetting.jurisdiction),
      selectList: [],
      idValue: ''
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    getSelectTree (e) {
      let childrenListData = new Map()
      let fatherListData = new Map()
      let selectList = this.$refs.Tree.getCheckedAndIndeterminateNodes()
      selectList.forEach((item, index) => {
        if (item.children) {
          let {fatherList} = this.filteringData(item)
          fatherList.forEach(items => {
            fatherListData.set(items.value, items)
          })
        } else {
          childrenListData.set(item.value, item)
        }
      })
      this.$emit('selectUp', this.mergeList(fatherListData, childrenListData))
    },
    // 区分父子
    filteringData (item) {
      let fatherList = []
      let childrenList = []
      const handle = itemChildren => {
        if (itemChildren.children) {
          fatherList.push({
            checked: itemChildren.checked,
            indeterminate: itemChildren.indeterminate,
            nodeKey: itemChildren.nodeKey,
            title: itemChildren.title,
            value: itemChildren.value,
            id: itemChildren.id
          })
          itemChildren.children.forEach((childrenItem) => {
            handle(childrenItem)
          })
        } else {
          childrenList.push({
            checked: itemChildren.checked,
            indeterminate: itemChildren.indeterminate,
            nodeKey: itemChildren.nodeKey,
            title: itemChildren.title,
            value: itemChildren.value,
            id: itemChildren.id
          })
        }
        return {
          fatherList, childrenList
        }
      }
      return handle(item)
    },
    // 合并数组
    mergeList (fatherListData, childrenListData) {
      let childrenList = clonedeep(childrenListData)
      let fatherList = clonedeep(fatherListData)
      let dataList = []
      fatherList.forEach((fatherValue) => {
        childrenList.forEach((value, key) => {
          // 判断标识
          if (value.id === fatherValue.id) {
            if (fatherValue.children) fatherValue.children.push(value)
            else fatherValue.children = [].concat(value)
            childrenList.delete(key)
          }
        })
      })
      fatherList.forEach((fatherValue) => {
        dataList.push(fatherValue)
      })
      return dataList
    },
    // 合并已有
    mergeAlready (list, newList) {
      if (newList.length === 0) return clonedeep(permissionSetting.jurisdiction)
      let returnList = []
      // 原有数据
      let listData = clonedeep(list)
      // 循环数据
      let listFor = clonedeep(list)
      const recursionList = (n, i) => {
        if (!n) return n
        i.forEach((item, index) => {
          n.forEach(itemNew => {
            if (item.value === itemNew.value) {
              i[index] = itemNew
              if (item.children && itemNew.children) recursionList(itemNew.children, item.children)
            }
          })
        })
        return i
      }
      listFor.forEach((item, index) => {
        newList.forEach(itemNew => {
          if (item.value === itemNew.value) {
            if (!item.children && !itemNew.children) {
              listData[index].checked = itemNew.checked
              listData[index].id = itemNew.id
              listData[index].indeterminate = itemNew.indeterminate
              listData[index].nodeKey = itemNew.nodeKey
              listData[index].title = itemNew.title
              listData[index].value = itemNew.value
            } else {
              listData[index].checked = itemNew.checked
              listData[index].id = itemNew.id
              listData[index].indeterminate = itemNew.indeterminate
              listData[index].nodeKey = itemNew.nodeKey
              listData[index].title = itemNew.title
              listData[index].value = itemNew.value
              listData[index].children = recursionList(itemNew.children, item.children)
            }
          }
        })
      })
      return listData
    },
    // 得到已有权限
    getRoleMenuList (e) {
      getRoleMenu(e).then(res => {
        this.dataTree = this.mergeAlready(this.dataTree, clonedeep(res.info))
      }).catch(() => {
        console.log('得到已有权限 异常')
      })
    }
  },
  mounted () {

  },
  watch: {
    id (e) {
      this.idValue = e.split('.')[0]
      this.getRoleMenuList(this.idValue)
      this.dataTree = clonedeep(permissionSetting.jurisdiction)
    }
  }
})
</script>
<style>

</style>
