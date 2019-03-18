<template>
    <div>
      <Button v-if="!stateEcho" type="primary" @click="modalValue = !modalValue">添加顾客</Button>
      <Button :size='size' v-else type="primary" @click="echoData">修改</Button>
      <Modal
          v-model="modalValue"
          title="添加顾客信息"
          :loading="loading"
          width="800">
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">重置</Button>
            <Button type="primary" size="large" @click="modalOk">确定</Button>
          </div>
            <Row class="m_left">
              <Col span="11">
                <div>
                  <span>姓名:  </span><Input v-model="cusName" placeholder="顾客姓名" style="width:   200px" />
                </div>
                <div>
                  <span>性别:  </span>
                  <RadioGroup v-model="cusGender">
                    <Radio label="0">男</Radio>
                    <Radio label="1">女</Radio>
                  </RadioGroup>
                </div>
                <div>
                  <span>微信:  </span><Input v-model="cusWechat" placeholder="顾客微信" style="width: 200px"/>
                </div>
                <div>
                  <span> QQ:  </span><Input v-model="cusQq" placeholder="顾客QQ" style="width:   200px"/>
                </div>
                <div>
                  <span>来源渠道:  </span>
                  <Select v-model="cusFrom" style="width:  200px">
                    <Option v-for="(item, index) in sourcesList" :value="item.id + ''" :key="index" >{{ item.name }}</Option>
                  </Select>
                </div>
                <div>
                  <span>咨询类别:  </span>
                  <Select v-model="consultType" style="width:  200px">
                     <Option value="测试数据" >测试数据</Option>
                  </Select>
                </div>
                <div>
                  <span>预约状态:  </span>
                  <Select v-model="orderState" style="width:  200px">
                     <Option value="0" >已预约</Option>
                     <Option value="1" >未预约</Option>
                  </Select>
                </div>
                <div>
                  <span>所在区域:  </span>
                  <siteSelect v-model='city'></siteSelect>
                </div>
                <div>
                  <span>总消费:  </span><InputNumber v-model="pay" placeholder="总消费" style="width:   200px;"/>
                </div>
              </Col>
              <Col span="2"></Col>
              <Col span="11">
                <div>
                  <span>年龄:  </span><InputNumber v-model="cusAge" placeholder="顾客年龄" style="width:   200px" />
                </div>
                <div>
                  <span>生日:  </span><DatePicker v-model="cusBirthday" placeholder="顾客生日" style="width:   200px; margin-bottom:   0;"></DatePicker>{{' '+constellation}}
                </div>
                <div>
                  <span>电话1:  </span><Input v-model="cusPhone1" placeholder="家庭电话" style="width:   200px" />
                </div>
                <div>
                  <span>电话2:  </span><Input v-model="cusPhone2" placeholder="私人电话" style="width:   200px" />
                </div>
                <div>
                  <span>预约号:  </span><Input v-model="orderNum" placeholder="预约号" style="width:   200px;"/>
                </div>
                <div>
                  <span>客户端:  </span>
                  <Select v-model="client" style="width:  200px">
                     <Option value="pc" >pc</Option>
                     <Option value="安卓" >安卓</Option>
                     <Option value="苹果" >苹果</Option>
                  </Select>
                </div>
                <div>
                  <span>所属美容师:  </span>
                  <Select v-model="accountId" style="width:  200px">
                    <Option value="1" >测试数据</Option>
                  </Select>
                </div>
                <div>
                  <span>顾客备注: </span><Input v-model="remark" placeholder="备注" style="width: 200px;"/>
                </div>
                <div>
                  <span>是否会员:  </span>
                  <RadioGroup v-model="vip">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                  </RadioGroup>
                </div>
              </Col>
            </Row>
      </Modal>
    </div>
</template>
<script>
import { addCustomer, getCustomer, updateCustomer } from '@/api/makeAnAppointment/InformationEditing/InformationEditing.js'
import { getPageCusFrom } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import siteSelect from '@/components/siteSelect/siteSelect'
export default({
  data () {
    return {
      modalValue: false,
      modalModifyValue: false,
      // 添加用户信息
      loading: true,
      cusName: '',
      cusAge: 0,
      cusBirthday: '',
      cusPhone1: '',
      cusPhone2: '',
      cusGender: '',
      constellation: '',
      cusWechat: '',
      cusQq: '',
      cusFrom: '',
      client: '',
      orderNum: '',
      consultType: '',
      orderState: '',
      dealState: '',
      city: [],
      accountId: '',
      shopId: '',
      remark: '',
      vip: '',
      pay: 0,
      echoDataState: false,
      sourcesList: []
    }
  },
  props: {
    stateEcho: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large'
    },
    userId: {
      type: String,
      default: ''
    }
  },
  methods: {
    modalOk () {
      if (this.cusName) {
        let data = {}
        data.cusName = this.cusName
        data.cusAge = this.cusAge
        this.cusBirthday ? data.cusBirthday = new Date(this.cusBirthday).Format('yyyy-M-d') : data.cusBirthday = ''
        data.cusPhone1 = this.cusPhone1
        data.cusPhone2 = this.cusPhone2
        data.cusGender = this.cusGender
        data.cusWechat = this.cusWechat
        data.cusQq = this.cusQq
        data.cusFrom = this.cusFrom
        data.client = this.client
        data.orderNum = this.orderNum
        data.consultType = this.consultType
        data.orderState = this.orderState
        data.dealState = this.dealState
        data.city = this.city[2]
        data.accountId = this.accountId
        data.shopId = this.shopId
        data.remark = this.remark
        data.vip = this.vip
        data.pay = this.pay
        data.constellation = this.getConstellation(this.cusBirthday)
        this.restoration()
        this.modalValue = false
        if (this.echoDataState) {
          this.upUser(data)
        } else {
          this.addUser(data)
        }
      } else {
        this.modalValue = true
        this.$Message.error('请完善信息')
        this.city = []
      }
    },
    getConstellation (cusBirthday) {
      let array1 = new Date(cusBirthday).Format('yyyy-M-d').split('-')
      let month = array1[1]
      let day = array1[2]
      let s = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'
      return s.substr(month * 2 - (day < '102223444433'.charAt(month - 1) - -19) * 2, 2)
    },
    modalCancel () {
      this.restoration()
    },
    // 复位
    restoration (data) {
      this.cusName = ''
      this.cusAge = 0
      this.cusBirthday = ''
      this.cusPhone1 = ''
      this.cusPhone2 = ''
      this.cusGender = ''
      this.cusWechat = ''
      this.cusQq = ''
      this.cusFrom = ''
      this.client = ''
      this.orderNum = ''
      this.consultType = ''
      this.shopTime = ''
      this.orderState = ''
      this.dealState = ''
      this.city = []
      this.accountId = ''
      this.shopId = ''
      this.remark = ''
      this.vip = ''
      this.constellation = ''
      this.pay = 0
    },
    // 添加顾客
    addUser (data) {
      addCustomer(data).then(res => {
        this.restoration()
        this.$Message.success(res.info)
        this.accomplish()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 修改顾客
    upUser (data) {
      updateCustomer(data, this.userId).then(res => {
        this.restoration()
        this.$Message.success(res.info)
        this.accomplish()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 回显
    echoDataValue (data, msg) {
      this.cusName = data.cusName
      this.cusAge = data.cusAge
      this.cusBirthday = data.cusBirthday
      this.cusPhone1 = data.cusPhone1
      this.cusPhone2 = data.cusPhone2
      this.cusGender = data.cusGender + ''
      this.cusWechat = data.cusWechat
      this.cusQq = data.cusQq
      this.cusFrom = data.cusFrom
      this.client = data.client
      this.orderNum = data.orderNum
      this.consultType = data.consultType
      this.shopTime = data.shopTime
      this.orderState = data.orderState + ''
      this.dealState = data.dealState
      this.city = [msg.provinceId, msg.cityId, msg.id]
      this.accountId = data.accountId + ''
      this.shopId = data.shopId
      this.remark = data.remark
      this.vip = data.vip + ''
      this.pay = data.pay
    },
    // 修改信息
    echoData () {
      this.modalValue = !this.modalValue
      getCustomer(this.userId).then(res => {
        this.echoDataValue(res.info, res.msg)
        this.echoDataState = true
      }).catch(err => {

      })
    },
    // 发送完成事件
    accomplish () {
      if (this.echoDataState) {
        this.$emit('accomplish', true)
      } else {
        this.$emit('accomplish')
      }
    },
    // 获取来源渠道
    gitSources () {
      getPageCusFrom().then(res => {
        this.sourcesList = []
        res.info.data.map(item => {
          this.sourcesList.push({
            id: item.id + '',
            name: item.name
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    siteSelect
  },
  watch: {
    'cusBirthday' (e) {
      console.log(e)
      this.constellation = this.getConstellation(e)
    }
  }
})
</script>
<style>
  .dataList div{
    margin-bottom:   10px;
  }
  .m_left div {
    margin-bottom:   5px;
  }
</style>
