  <template>
    <div>
      <p>优惠</p>
      <Input v-model="preferential" placeholder="请输入优惠金额" style="width: 100%" />
    </div>
  </template>
<script>
import { addPref } from '@/api/orderForm/orderForm'
export default ({
  data () {
    return {
      preferential: '',
      id: ''
    }
  },
  props: {
    subState: {
      type: String,
      default: ''
    },
    orderId: {
      type: String,
      required: true
    }
  },
  methods: {
    // 提交金额
    subData () {
      addPref(this.id, this.preferential).then(res => {
        this.$Message.success(res.info)
        this.$emit('subDataOvr')
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  mounted () {

  },
  watch: {
    'subState' () {
      this.subData()
    },
    'orderId' () {
      this.preferential = ''
      this.id = this.orderId.split('/')[0]
    }
  }
})
</script>
  <style>

  </style>
