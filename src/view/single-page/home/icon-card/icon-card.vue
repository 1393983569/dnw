<template>
  <div>
    <Row>
      <Col class="styleIcon" span="6" class-name="backgroundColor">
        <div class="iconDiv" :style="{background: color}">
          <Icon style="display: table-cell; vertical-align: middle;" :type="iconStyle" size='20' />
        </div>
      </Col>
      <Col span="16">
        <div class="styleSlot">
          <slot></slot>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default({
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {

    },
    props: {
      iconStyle: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#2d8cf0'
      }
    },
    components:{

    },
    mounted(){
    }
  })
</script>
<style lang="less">
.styleSlot{
  font-size: 30px;
  display: table;
  height: 120px;
  border-radius: 5px;
  border-right : 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  padding: 5px 5px;
  div{
    display: table-cell;
    vertical-align: middle;
  }
}
.styleIcon{
  .iconDiv{
    display: table;
    height: 120px;
    border-radius: 5px 0 0 5px;
    width: 100%;
    text-align: center;
  }
}
</style>
