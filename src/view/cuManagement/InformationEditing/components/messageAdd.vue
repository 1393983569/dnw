<template>
    <div>
      <Button v-if="!stateEcho" type="primary" @click="modalValue = true, showAddData = true, restoration(), getShopList(), getConsult(), gitSources()">添加顾客</Button>
      <Button :size='size' v-else type="primary" @click="restoration(), echoData(), getShopList(), getConsult(), gitSources()">详情</Button>
      <div v-if="showAddData">
        <Modal
          v-model="modalValue"
          :title= 'stateEcho ? "查看顾客详情" : "添加顾客信息"'
          :mask-closable="false"
          :loading="loading"
          width="800"
        >
          <Form ref="customInfo" :model="customInfo" :rules="ruleCustom">
            <Row>
              <Col span="11">
                <FormItem label="姓名" prop="cusName">
                  <div>
                    <Input v-model="customInfo.cusName" placeholder="顾客姓名" style="width:   200px" />
                  </div>
                </FormItem>
                <FormItem label="性别" prop="cusGender">
                  <RadioGroup v-model="customInfo.cusGender">
                    <Radio label="0">男</Radio>
                    <Radio label="1">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="微信">
                  <Input v-model="customInfo.cusWechat" placeholder="顾客微信" style="width: 200px"/>
                </FormItem>
                <FormItem label="QQ">
                  <Input v-model="customInfo.cusQq" placeholder="顾客QQ" style="width: 200px"/>
                </FormItem>
                <FormItem label="来源渠道" prop="cusFrom">
                  <Select v-model="customInfo.cusFrom" style="width:  200px">
                    <Option v-for="(item, index) in sourcesList" :value="item.id + ''" :key="index" >{{ item.name }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="咨询类别" prop="consultType">
                  <Select v-model="customInfo.consultType" style="width:  200px">
                    <Option v-for="(item, index) in consultList" :key="index" :value="item.id + ''" >{{ item.name }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="所在区域">
                  <siteSelect v-model='customInfo.city'></siteSelect>
                </FormItem>
                <FormItem label="是否发送短信">
                  <Select v-model="customInfo.isMessage" style="width:  200px">
                    <Option value="0" >否</Option>
                    <Option value="1" >是</Option>
                  </Select>
                </FormItem>
                <FormItem label="分配店铺" prop="modelShop"  v-if="this.$store.state.user.access.indexOf('admin') !== -1">
                  <div>
                    <Select v-model="customInfo.modelShop" style="width:  200px">
                      <Option v-for="(item, index) in shopList" :value="item.id + ''" :key="index">{{ item.shopName }}</Option>
                    </Select>
                  </div>
                </FormItem>
              </Col>
              <Col span="2"></Col>
              <Col span="11">
                <FormItem label="年龄">
                  <InputNumber v-model="customInfo.cusAge" placeholder="顾客年龄" style="width:   200px" />
                </FormItem>
                <FormItem label="生日">
                  <DatePicker v-model="customInfo.cusBirthday" placeholder="顾客生日" style="width:   200px; margin-bottom:   0;"></DatePicker>{{customInfo.constellation}}
                </FormItem>
                <FormItem label="电话1" prop="cusPhone1">
                  <Input v-model="customInfo.cusPhone1" placeholder="家庭电话" style="width:   200px" />
                </FormItem>
                <FormItem label="电话2">
                  <Input v-model="customInfo.cusPhone2" placeholder="私人电话" style="width:   200px" />
                </FormItem>
                <!--<div>-->
                  <!--<span>预约号:  </span><Input v-model="orderNum" placeholder="预约号" style="width:   200px;"/>-->
                <!--</div>-->
                <FormItem label="预约时间">
                  <DatePicker v-model="customInfo.valueData" type="date" placeholder="请选择日期" style="width: 120px"></DatePicker>
                  <TimePicker v-model="customInfo.valueTime" placeholder="请选择时间" style="width: 150px; margin-left: 5px"></TimePicker>
                </FormItem>
                <FormItem label="客户端">
                  <Select v-model="customInfo.client" style="width:  200px">
                    <Option value="pc" >pc</Option>
                    <Option value="安卓" >安卓</Option>
                    <Option value="苹果" >苹果</Option>
                  </Select>
                </FormItem>
                <FormItem label="顾客回访">
                  <DatePicker type="date" v-model="customInfo.visitTime" placeholder="请输入回访时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="顾客状态">
                  <RadioGroup v-model="customInfo.consumeState">
                    <Radio label="初诊">初诊</Radio>
                    <Radio label="复诊">复诊</Radio>
                    <Radio label="再消费">再消费</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="到店状态">
                  <RadioGroup v-model="customInfo.isShop">
                    <Radio label="1">已到</Radio>
                    <Radio label="0">未到</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <div v-if="!stateEcho">
              <FormItem label="顾客备注">
                <Input v-model="remark" placeholder="备注" type="textarea" style=" display: inline-block"/> <qiniuImg @updateImg="updateImg">上传图片</qiniuImg>
                <div>
                  <clickImg :rePic="rePic"></clickImg>
                </div>
              </FormItem>
            </div>
            <div v-if="stateEcho">
              <FormItem label="顾客备注">
                <remark :userId="this.userId" :memarkState="remarkAddState">
                  <div style="margin-bottom: 5px">
                    </br><Input v-model="remark" placeholder="备注" type="textarea" style="display: inline-block"/>
                    <div style="margin-top: 10px">
                      <qiniuImg @updateImg="updateImg">上传图片</qiniuImg>
                      <Button type="primary" size="small" style="margin-left: 5px" @click="remarkAdd">添加备注</Button>
                    </div>
                  </div>
                  <div>
                    <clickImg :rePic="rePic"></clickImg>
                  </div>
                </remark>
              </FormItem>
            </div>
          </Form>
          <div style="margin-top:10px;margin-left:600px;" slot="footer">
            <Button v-if="!stateEcho" type="text" size="large" @click="modalCancel('customInfo')">重置</Button>
            <Button v-else type="text" size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large" @click="modalOk('customInfo')">确定</Button>
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
      customInfo: {
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
        consultType: '',
        modelShop: '',
        isShop: '1',
        visitTime: '',
        city: [],
        isMessage: '',
        valueTime: '',
        valueData: '',
        consumeState: '初诊',
      },
      //      orderNum: '',
      dealState: '',
      shopId: '',
      remark: '',
      vip: '',
      pay: 0,
      echoDataState: false,
      // 预约时间
      dataTime: '',
      rePic: [],
      appointTime: '',
      showAddData: false,
      remarkAddState: 1,
      shopList: [],
      consultList: [],
      sourcesList: [],
      ruleCustom: {
        cusName:[{required: true, message: '顾客姓名不能为空', trigger: 'blur'}],
        cusGender:[{required: true, message: '顾客性别不能为空', trigger: 'blur'}],
        cusFrom:[{required: true, message: '来源渠道不能为空', trigger: 'blur'}],
        consultType:[{required: true, message: '咨询类别不能为空', trigger: 'blur'}],
        // modelShop:[{required: true, message: '分配店铺不能为空', trigger: 'blur'}],
        cusPhone1: [{required: true, message: '电话号码不能为空', trigger: 'blur'}]
      }
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
    modalOk (e) {
      this.$refs[e].validate(valid => {
        console.log(valid, '==========================')
        if(valid) {
          try {
          let data = {}
          data.cusName = this.customInfo.cusName
          data.cusAge = this.customInfo.cusAge
          this.customInfo.cusBirthday ? data.cusBirthday = new Date(this.customInfo.cusBirthday).Format('yyyy-M-d') : data.cusBirthday = ''
          data.cusPhone1 = this.customInfo.cusPhone1
          data.cusPhone2 = this.customInfo.cusPhone2
          data.cusGender = this.customInfo.cusGender
          data.cusWechat = this.customInfo.cusWechat
          data.cusQq = this.customInfo.cusQq
          data.cusFrom = this.customInfo.cusFrom
          data.client = this.customInfo.client
          // data.orderNum = this.orderNum
          data.consultType = this.customInfo.consultType
          data.dealState = this.dealState
          if (this.customInfo.city) data.city = this.customInfo.city[2]
          data.shopId = this.shopId
          data.remark = this.remark
          data.vip = this.vip
          data.pay = this.pay
          data.isMessage = this.customInfo.isMessage
          data.rePic = this.rePic
          data.shopId = this.customInfo.modelShop
          data.consumeState = this.customInfo.consumeState
          data.isShop = this.customInfo.isShop
          this.customInfo.visitTime ? data.visitTime = new Date(this.customInfo.visitTime).Format('yyyy-M-d') : data.visitTime = ''
          data.constellation = this.getConstellation(this.customInfo.cusBirthday)
          if (this.customInfo.valueData && this.customInfo.valueTime) {
            data.appointTime = new Date(this.customInfo.valueData).Format('yyyy-M-d') + ' ' + this.customInfo.valueTime
          }
          this.restoration()
          this.modalValue = false
          console.log(data)
          if (this.echoDataState) {
            this.upUser(data)
          } else {
            this.addUser(data)
          }
          } catch (e) {
            console.log(e)
          }
        }else{
          this.$Message.error('Fail')
        }
      })
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
    modalCancel (e) {
      this.$refs[e].resetFields()
      this.restoration()
    },
    // 复位
    restoration (data) {
      this.customInfo.cusName = ''
      this.customInfo.cusAge = 0
      this.customInfo.cusBirthday = ''
      this.customInfo.cusPhone1 = ''
      this.customInfo.cusPhone2 = ''
      this.customInfo.cusGender = ''
      this.customInfo.cusWechat = ''
      this.customInfo.cusQq = ''
      this.customInfo.cusFrom = ''
      this.customInfo.client = ''
      //      this.orderNum = ''
      this.customInfo.consultType = ''
      this.shopTime = ''
      this.dealState = ''
      this.customInfo.city = []
      this.shopId = ''
      this.remark = ''
      this.vip = ''
      this.customInfo.constellation = ''
      this.pay = 0
      this.customInfo.isMessage = ''
      this.customInfo.modelShop = ''
      this.customInfo.consumeState = '初诊'
      this.customInfo.isShop = '1'
      this.customInfo.visitTime = ''
      this.rePic = []
      this.customInfo.valueData = ''
      this.customInfo.valueTime = ''
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
      this.customInfo = {}
      try {
      this.customInfo.cusName = data.cusName
      this.customInfo.cusAge = data.cusAge
      this.customInfo.cusBirthday = data.cusBirthday
      this.customInfo.cusPhone1 = data.cusPhone1
      this.customInfo.cusPhone2 = data.cusPhone2
      this.customInfo.cusGender = data.cusGender + ''
      this.customInfo.cusWechat = data.cusWechat
      this.customInfo.cusQq = data.cusQq
      this.customInfo.cusFrom = data.cusFrom
      this.customInfo.client = data.client
      //      this.orderNum = data.orderNum
      this.customInfo.consultType = data.consultType
      this.customInfo.shopTime = data.shopTime
      this.dealState = data.dealState
      this.shopId = data.shopId
      this.remark = data.remark
      this.vip = data.vip + ''
      this.pay = data.pay
      this.rePic = []
      this.customInfo.isMessage = data.isMessage
      this.customInfo.modelShop = data.shopId
      this.customInfo.consumeState = data.consumeState
      this.customInfo.isShop = data.isShop
      this.customInfo.visitTime = data.visitTime
      this.customInfo.valueData = data.appointTime.split(' ')[0]
      this.customInfo.valueTime = data.appointTime.split(' ')[1]
      this.customInfo.constellation = data.cusConstellation
      if (msg) this.customInfo.city = [msg.provinceId, msg.cityId, msg.id]
      } catch (e) {
        console.log(e)
      }
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
    'customInfo.cusBirthday' (e) {
      this.customInfo.constellation = this.getConstellation(e)
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
