<template>
  <div>
    <Tag closable color="#5f93e1" v-for="item in count" :key="item" :name="item" @on-close="handleClose2">标签{{ item + 1 }}</Tag>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: [],
      animal: '',
      value: [
        {
          title: '顾客来源',
          key: 'ueerLy',
          value: ['抖音', 'bilibili', 'xxxxxxxx']
        },
        {
          title: '顾客消费类型',
          key: 'ueerLy',
          value: ['抖音', 'bilibili', 'xxxxxxxx']
        }
      ]
    }
  },
  methods: {
    handleAdd () {
      if (this.count.length) {

      } else {

      }
    },
    handleClose2 (event, name) {
      const index = this.count.indexOf(name)
      this.count.splice(index, 1)
    }
  }
}
</script>
