<template>
    <div>
      <Button v-if="!stateEcho" type="primary" @click="modalValue = true, showAddData = true, getShopList(), getConsult(), gitSources()">添加顾客</Button>
      <Button :size='size' v-else type="primary" @click="echoData(), getShopList(), getConsult(), gitSources()">详情</Button>
      <div v-if="showAddData">
        <Modal
          v-model="modalValue"
          title="添加顾客信息"
          :loading="loading"
          @on-cancel="cancel"
          width="800">
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">重 置</Button>
            <Button type="primary" size="large" @click="modalOk">确定</Button>
          </div>
            <Row class="m_left">
              <Col span="11">
                <div>
                  <span>姓名:  </span><Input v-model="cusName" placeholder="顾客姓名" style="width:   200px" />
                  <div style="display: inline-block; line-height: 32px; height: 32px;">
                    <div style="color: red; font-size: 20px;">*</div>
                  </div>
                </div>
                <div>
                  <span>性别:  </span>
                  <RadioGroup v-model="cusGender">
                    <Radio label="0">男</Radio>
                    <Radio label="1">女</Radio>
                  </RadioGroup>
                  <div style="display: inline-block; line-height: 32px; height: 32px;">
                    <div style="color: red; font-size: 20px;">*</div>
                  </div>
                </div>
                <div>
                  <span>微信: </span><Input v-model="cusWechat" placeholder="顾客微信" style="width: 200px"/>
                </div>
                <div>
                  <span>QQ: </span><Input v-model="cusQq" placeholder="顾客QQ" style="width: 200px"/>
                </div>
                <div>
                  <span>来源渠道:  </span>
                  <Select v-model="cusFrom" style="width:  200px">
                    <Option v-for="(item, index) in sourcesList" :value="item.id + ''" :key="index" >{{ item.name }}</Option>
                  </Select>
                  <div style="display: inline-block; line-height: 32px; height: 32px;">
                    <div style="color: red; font-size: 20px;">*</div>
                  </div>
                </div>
                <div>
                  <span>咨询类别:  </span>
                  <Select v-model="consultType" style="width:  200px">
                     <Option v-for="(item, index) in consultList" :key="index" :value="item.id + ''" >{{ item.name }}</Option>
                  </Select>
                  <div style="display: inline-block; line-height: 32px; height: 32px;">
                    <div style="color: red; font-size: 20px;">*</div>
                  </div>
                </div>
                <div>
                  <span>所在区域:  </span>
                  <siteSelect v-model='city'></siteSelect>
                </div>
                <div>
                  <span>是否发送短信:  </span>
                  <Select v-model="isMessage" style="width:  200px">
                     <Option value="0" >否</Option>
                     <Option value="1" >是</Option>
                  </Select>
                </div>
                <div v-if="this.$store.state.user.access.indexOf('admin') !== -1">
                  <span>分配店铺:  </span>
                  <Select v-model="modelShop" filterable style="width:200px">
                    <Option v-for="(item, index) in shopList" :value="item.id" :key="index">{{ item.shopName }}</Option>
                  </Select>
                  <div style="display: inline-block; line-height: 32px; height: 32px;">
                    <div style="color: red; font-size: 20px;">*</div>
                  </div>
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
                  <div style="display: inline-block; line-height: 32px; height: 32px;">
                    <div style="color: red; font-size: 20px;">*</div>
                  </div>
                </div>
                <div>
                  <span>电话2:  </span><Input v-model="cusPhone2" placeholder="私人电话" style="width:   200px" />
                </div>
                <!--<div>-->
                  <!--<span>预约号:  </span><Input v-model="orderNum" placeholder="预约号" style="width:   200px;"/>-->
                <!--</div>-->
                <div>
                  <span>预约时间:  </span>
                  <DatePicker v-model="valueData" type="date" placeholder="请选择日期" style="width: 120px"></DatePicker>
                  <TimePicker v-model="valueTime" placeholder="请选择时间" style="width: 150px; margin-left: 5px"></TimePicker>
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
                  <span>
                    顾客回访:
                  </span>
                  <DatePicker type="date" v-model="visitTime" placeholder="请输入回访时间" style="width: 200px"></DatePicker>
                </div>
              <div>
                <span>顾客状态:  </span>
                <RadioGroup v-model="consumeState">
                  <Radio label="初诊">初诊</Radio>
                  <Radio label="复诊">复诊</Radio>
                  <Radio label="再消费">再消费</Radio>
                </RadioGroup>
              </div>
              <div>
                <span>到店状态:  </span>
                <RadioGroup v-model="isShop">
                  <Radio label="1">已到</Radio>
                  <Radio label="0">未到</Radio>
                </RadioGroup>
              </div>
              </Col>
            </Row>
            <div v-if="!stateEcho">
              <span>顾客备注:  </span><Input v-model="remark" placeholder="备注" type="textarea" style=" display: inline-block"/> <qiniuImg @updateImg="updateImg">上传图片</qiniuImg>
              <div>
                <clickImg :rePic="rePic"></clickImg>
              </div>
            </div>
            <div v-if="stateEcho">
              <remark :userId="this.userId" :memarkState="remarkAddState">
                <div style="margin-bottom: 5px">
                  <span>顾客备注:  </span></br><Input v-model="remark" placeholder="备注" type="textarea" style="display: inline-block"/>
                  <div style="margin-top: 10px">
                    <qiniuImg @updateImg="updateImg">上传图片</qiniuImg>
                    <Button type="primary" size="small" style="margin-left: 5px" @click="remarkAdd">添加备注</Button>
                  </div>
                </div>
                <div>
                  <clickImg :rePic="rePic"></clickImg>
                </div>
              </remark>
            </div>
          </Modal>
      </div>
    </div>
</template>
<script>
import { addCustomer, getCustomer, updateCustomer, addCusRemark, getListShop, getPageConsult, getPageCusFrom } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import siteSelect from '@/components/siteSelect/siteSelect'
import qiniuImg from '_c/qiniu-img'
import remark from './remark.vue'
import clickImg from '_c/clickImg'
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
      //      orderNum: '',
      consultType: '',
      dealState: '',
      city: [],
      shopId: '',
      remark: '',
      vip: '',
      pay: 0,
      echoDataState: false,
      isMessage: '',
      valueTime: '',
      valueData: '',
      // 预约时间
      dataTime: '',
      rePic: [],
      appointTime: '',
      showAddData: false,
      remarkAddState: 1,
      modelShop: '',
      shopList: [],
      consultList: [],
      visitTime: '',
      sourcesList: [],
      consumeState: '初诊',
      isShop: '1'
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
      if (!this.cusName) {
        this.$Message.error('姓名不能为空')
        return
      } else if (!this.cusGender) {
        this.$Message.error('请选择性别')
        return
      } else if (!this.cusFrom) {
        this.$Message.error('来源渠道不能为空')
        return
      } else if (!this.consultType) {
        this.$Message.error('咨询类别不能为空')
        return
      }else if (!this.cusPhone1) {
        this.$Message.error('电话1不能为空')
        return
      }
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
        //        data.orderNum = this.orderNum
        data.consultType = this.consultType
        data.dealState = this.dealState
        data.city = this.city[2]
        data.shopId = this.shopId
        data.remark = this.remark
        data.vip = this.vip
        data.pay = this.pay
        data.isMessage = this.isMessage
        data.rePic = this.rePic
        data.shopId = this.modelShop
        data.consumeState = this.consumeState
        data.isShop = this.isShop
        this.visitTime ? data.visitTime = new Date(this.visitTime).Format('yyyy-M-d') : data.visitTime = ''
        data.constellation = this.getConstellation(this.cusBirthday)
        if (this.valueData && this.valueTime) {
          data.appointTime = new Date(this.valueData).Format('yyyy-M-d') + ' ' + this.valueTime
        }
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
      if (!cusBirthday) {
        return ''
      }
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
      //      this.orderNum = ''
      this.consultType = ''
      this.shopTime = ''
      this.dealState = ''
      this.city = []
      this.shopId = ''
      this.remark = ''
      this.vip = ''
      this.constellation = ''
      this.pay = 0
      this.isMessage = ''
      this.modelShop = ''
      this.consumeState = '初诊'
      this.isShop = '1'
      this.visitTime = ''
      this.rePic = []
      this.valueData = ''
      this.valueTime = ''
      this.appointTime = ''
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
      //      this.orderNum = data.orderNum
      this.consultType = data.consultType
      this.shopTime = data.shopTime
      this.dealState = data.dealState
      this.city = [msg.provinceId, msg.cityId, msg.id]
      this.shopId = data.shopId
      this.remark = data.remark
      this.vip = data.vip + ''
      this.pay = data.pay
      this.rePic = []
      this.isMessage = data.isMessage
      this.modelShop = data.shopId
      this.consumeState = data.consumeState
      this.isShop = data.isShop
      this.visitTime = data.visitTime
      this.valueData = data.appointTime.split(' ')[0]
      this.valueTime = data.appointTime.split(' ')[1]
    },
    // 修改信息
    echoData () {
      this.modalValue = !this.modalValue
      this.showAddData = true
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
    // 取消弹出
    cancel () {
      this.showAddData = false
      this.modalValue = false
      this.restoration()
    },
    updateImg (e) {
      this.rePic.push(e)
    },
    // 添加备注
    remarkAdd () {
      if (!this.userId || !this.rePic) {
        this.$Message.error('请填写备注')
        return
      }
      addCusRemark(this.userId, this.remark, this.rePic).then(res => {
        this.$Message.success(res.info)
        this.rePic = []
        this.remark = ''
        this.remarkAddState++
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 获取店铺id
    getShopList () {
      this.shopList = []
      getListShop().then(res => {
        res.info.map(item => {
          this.shopList.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取咨询类别
    getConsult () {
      this.consultList = []
      getPageConsult().then(res => {
        res.info.data.map(item => {
          this.consultList.push(item)
        })
      }).catch(err => {

      })
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
    siteSelect,
    qiniuImg,
    remark,
    clickImg
  },
  watch: {
    'cusBirthday' (e) {
      this.constellation = this.getConstellation(e)
    }
  },
  mounted () {
    this.restoration()
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
