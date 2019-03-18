<template>
    <div>
      <!-- 取保后台返回数据后渲染 -->
      <div v-if="showAdd">
        <!-- 套餐 -->
        <div>
          <combo  @onChangeCombo="onChangeCombo" :adminList="adminList" ></combo>
        </div>
        <!-- 项目 -->
        <div>
          <project @onChangeProject="onChangeProject" :adminList="adminList" :classifyProject="classifyProject"></project>
        </div>
        <!-- 产品 -->
        <div>
          <product @onChangeProduct="onChangeProduct" :adminList="adminList" :classifyProduct="classifyProduct" :pageGoodsUnit="pageGoodsUnit"></product>
        </div>
      </div>
      <Divider orientation="left" style="color: #5f5e5e">结 算</Divider>
      <!-- 结算 -->
      <div style="height: 50px; width: 100%">
        <div style="float: right">
          <div>
            <span style="font-size: 16px;">总金额：</span>
            <span style="font-size: 23px; color: #ae2743">
            <Icon type="logo-yen" />
            <count-to style="display: inline-block" :decimals="2" :end="discountTotal"></count-to>
          </span>
            <Icon type="logo-yen" />
            <span style="text-decoration:line-through; font-size: 16px">
            {{ totalDate }}
          </span>
          </div>
        </div>
      </div>
      <div style="height: 50px;">
        <div style="float: right">
          <Button type="success" style="margin-left: 10px" @click='cardigan' :loading="loading">开单</Button>
        </div>
      </div>
    </div>
</template>
<script>
import combo from './components/combo'
import project from './components/project'
import product from './components/product'
import {getPageGoodsCategory, getPageTsProjectCategory, getPageGoodsUnit, addCusSetMeal, getAdminsInfo} from '@/api/cuManagement/InformationEditing/InformationEditing'
import countTo from '_c/count-to'
export default({
  data () {
    return {
      comboData: {},
      productData: {},
      projectData: {},
      // 产品
      classifyProduct: [],
      // 产品价格
      productPrice: 0,
      discountPrice: 0,
      // 项目价格
      productProject: 0,
      discountProject: 0,
      // 套餐
      producCombo: 0,
      discountCombo: 0,
      // 项目
      classifyProject: [],
      pageGoodsUnit: [],
      // 折前总价
      totalDate: 0,
      // 折后总价
      discountTotal: 0,
      showAdd: false,
      dataCombo: [],
      dataProduct: [],
      dataProject: [],
      loading: false,
      adminList: []
    }
  },
  props: {
    cusId: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 开单
    cardigan () {
      this.loading = true
      let data = {}
      // 套餐
      data.cusSetMealObj = this.dataCombo
      // 项目
      data.cusProjectObj = this.dataProject
      // 产品
      data.cusGoodsObj = this.dataProduct
      // 顾客id
      data.cusId = this.$route.params.userId
      // 折前总价
      data.money = this.totalDate
      // 折后总价
      data.disPrice = this.discountTotal
      addCusSetMeal(data).then(res => {
        this.$Message.success(res.info)
        this.loading = false
        this.$router.push({name: 'usManagement'})
      }).catch(err => {
        this.$Message.success(err)
      })
    },
    // 套餐
    onChangeCombo (e) {
      let original = 0
      let discount = 0
      this.dataCombo = []
      // 原价
      e.map(item => {
        this.dataCombo.push(item)
        original += parseInt(item.accountsPayable * 100) / 100
        discount += parseInt(item.finalPrice * 100) / 100
      })
      this.producCombo = original
      this.discountCombo = discount
      this.imputedPrice()
    },
    // 产品
    onChangeProduct (e) {
      let original = 0
      let discount = 0
      this.dataProduct = []
      // 原价
      e.map(item => {
        this.dataProduct.push(item)
        original += parseInt(item.accountsPayable * 100) / 100
        discount += parseInt(item.finalPrice * 100) / 100
      })
      this.productPrice = original
      this.discountPrice = discount
      this.imputedPrice()
    },
    // 项目
    onChangeProject (e) {
      let original = 0
      let discount = 0
      this.dataProject = []
      // 原价
      e.map(item => {
        this.dataProject.push(item)
        original += parseInt(item.accountsPayable * 100) / 100
        discount += parseInt(item.finalPrice * 100) / 100
      })
      this.productProject = original
      this.discountProject = discount
      this.imputedPrice()
    },
    // 商品分类
    gitClassifyProduct () {
      getPageGoodsCategory().then(res => {
        res.info.data.map(item => {
          this.classifyProduct.push(item)
        })
        this.examineState()
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目分类
    gitClassifyProject () {
      getPageTsProjectCategory().then(res => {
        res.info.data.map(item => {
          this.classifyProject.push(item)
        })
        this.examineState()
      }).catch(err => {
        console.log(err)
      })
    },
    // 商品单位
    shopUnit () {
      getPageGoodsUnit().then(res => {
        res.info.data.map(item => {
          this.pageGoodsUnit.push(item)
        })
        this.examineState()
      }).catch(err => {
        console.log(err)
      })
    },
    // 检查状态
    examineState () {
      if (this.classifyProject.length === 0 || this.classifyProduct.length === 0 || this.pageGoodsUnit.length === 0 || this.adminList === 0) {
        this.showAdd = false
      } else {
        this.showAdd = true
      }
    },
    // 计算价格
    imputedPrice () {
      this.totalDate = (parseInt(this.productPrice * 100) + parseInt(this.productProject * 100) + parseInt(this.producCombo * 100)) / 100
      this.discountTotal = (parseInt(this.discountPrice * 100) + parseInt(this.discountProject * 100) + parseInt(this.discountCombo * 100)) / 100
    },
    // 无分页得到管理员
    getAdmin () {
      getAdminsInfo().then(res => {
        res.info.map(item => {
          this.adminList.push({
            value: item.accountId,
            label: item.accountTitle
          })
        })
        this.examineState()
      }).catch(err => {

      })
    }
  },
  components: {
    combo,
    project,
    product,
    countTo
  },
  mounted () {
    if (!this.$route.params.userId) {
      // 无id回跳
      this.$router.back()
    }
    // 获取各类别
    this.gitClassifyProduct()
    this.gitClassifyProject()
    // 获取各单位
    this.shopUnit()
    // 得到管理员列表,用于推荐人
    this.getAdmin()
  }
})
</script>
<style>

</style>
