<template>
  <div>
    <Tabs @on-click="clickTabs" v-model="currentTab" value="name1" style="margin-top:30px">
        <TabPane label="收款单" name="name1"><receipt :userDataId="userId"></receipt></TabPane>
        <TabPane label="预存单" name="name2"><prestore :prestoreId="prestoreCusId" :userDataId="prestoreUserId"></prestore></TabPane>
        <TabPane label="退款单" name="name3"><refundOrder :userDataId="refundUserId"></refundOrder></TabPane>
        <TabPane label="还款单" name="name4"><bills :userDataId="billsUserId" :prestoreId="billCusId"></bills></TabPane>
    </Tabs>
  </div>
</template>
<script>
import receipt from './cashReceipt/receipt.vue'
import prestore from './cashReceipt/prestore.vue'
import refundOrder from './cashReceipt/refundOrder.vue'
import bills from './cashReceipt/bills.vue'
export default {
  data () {
    return {
      userId: '',
      customerId: '',
      prestoreCusId: '',
      prestoreUserId: '',
      receiptUserId: '',
      billsUserId: '',
      billCusId: '',
      refundUserId: '',
      currentTab: '',
      name: 'name1'
    }
  },
  props: {
    ordersId: {
      type: String,
      required: true
    },
    cusId: {
      type: String,
      required: true
    }
  },
  components:{
    receipt,
    prestore,
    refundOrder,
    bills
  },
  methods:{
    clickTabs(name) {
      this.currentTab = name
      if (this.currentTab === 'name1') {
        this.userId = this.userId + '/' + new Date() + ''
      }
      if (this.currentTab === 'name2') {
        this.prestoreCusId = this.customerId + '/' + new Date() + ''
        this.prestoreUserId = this.userId + '/' + new Date() + ''
      }
      if (this.currentTab === 'name3') {
        this.refundUserId = this.userId + '/' + new Date() + ''
      }
      if (this.currentTab === 'name4') {
        this.billsUserId = this.userId + '/' + new Date() + ''
        this.billCusId = this.customerId + '/' + new Date() + ''
      }
    }
  },
  //监听
  watch: {
    'ordersId'(e) {
      this.userId = e
    },
    'cusId'(e) {
      this.currentTab = 'name1'
      this.customerId = e
    }
  }
}
</script>
