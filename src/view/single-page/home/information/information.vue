<template>
  <div>
    <Row :gutter="20">
      <i-col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <icon-card :iconStyle='infor.icon' :color='infor.color'>
          <div style="text-align: center;">
            <count-to :end="infor.count" count-class="count-style"/>
            <p style="font-size: 16px;">{{ infor.title }}</p>
          </div>
        </icon-card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import CountTo from '_c/count-to'
import iconCard from '../icon-card/icon-card.vue'
import { getCusCount } from '@/api/home/information/information.js'
export default({
  name: 'hello',
  data () {
    return {
      inforCardData: []
    }
  },
  methods: {
    getList(){
      getCusCount().then(res =>{
        this.inforCardData = []
        for(let key in res.info[0], res.info[1]){
          this.inforCardData.push({
            title: key,
            count: res.info[0][key],
            color: res.info[1][key],
            icon: 'md-person-add'
          })
        }
      }).catch(err =>{
        this.$Message.error(err)
      })
    }
  },
  components: {
    CountTo,
    iconCard
  },
  mounted () {
    this.getList()
  }
})
</script>
<style>
.cont{
  background-color: palegoldenrod;
}
</style>
