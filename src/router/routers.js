import Main from '_c/main-new'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  自定义图标前必须加 '_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import ('@/view/login/login.vue')
  },
  {
    path: '/operationComponents',
    name: 'operationComponents',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'chooseTheProject',
        name: 'chooseTheProject',
        meta: {
          icon: '',
          title: '开单',
          hideInMenu: true
        },
        component: () => import('@/view/cuManagement/InformationEditing/operationComponents/chooseTheProject/chooseTheProject.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    meta: {
      access: ['yonghu_g'],
      icon: '_yonghu',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'message',
        name: 'message',
        meta: {
          access: ['renyuanxinxi_g'],
          icon: '_iconset0203',
          title: '人员信息'
        },
        component: () => import('@/view/userManagement/message.vue')
      },
      {
        path: 'adminJurisdiction',
        name: 'adminJurisdiction',
        meta: {
          access: ['quanxianfenpei_g'],
          icon: '_quanxian',
          title: '权限分配'
        },
        component: () => import('@/view/userManagement/jurisdiction/adminJurisdiction.vue')
      }
    ]
  },
  {
    path: '/makeAnAppointment',
    name: 'makeAnAppointment',
    meta: {
      access: ['yuyue_g'],
      icon: '_yuyue',
      title: '预约管理'
    },
    component: Main,
    children: [
      {
        path: 'InformationEditing',
        name: 'InformationEditing',
        meta: {
          access: ['gukexinxi_g'],
          icon: '_iconset0203',
          title: '顾客信息'
        },
        component: () => import('@/view/makeAnAppointment/InformationEditing/InformationEditing.vue')
      },
      {
        path: 'returnVisit',
        name: 'returnVisit',
        meta: {
          access: ['huifangguk_g'],
          icon: '_huifang',
          title: '回访顾客'
        },
        component: () => import('@/view/makeAnAppointment/returnVisit/visitCustomers.vue')
      }
    ]
  },
  {
    path: '/cuManagement',
    name: 'cuManagement',
    meta: {
      access: ['gukeguanli'],
      icon: '_iconset0203',
      title: '顾客管理'
    },
    component: Main,
    children: [
      {
        path: 'usManagement',
        name: 'usManagement',
        meta: {
          access: ['gukexinxi'],
          icon: '_xiangqing1',
          title: '顾客信息'
        },
        component: () => import('@/view/cuManagement/InformationEditing/InformationEditing.vue')
      }
    ]
  },
  {
    path: '/orderFormComponents',
    name: 'orderFormComponents',
    meta: {
      access: ['dindan'],
      icon: '_icondd1',
      title: '订单'
    },
    component: Main,
    children: [
      {
        path: 'orderForm',
        name: 'orderForm',
        meta: {
          access: ['dindanguanli'],
          icon: '_xiangqing',
          title: '订单管理'
        },
        component: () => import('@/view/orderForm/orderForm.vue')
      }
    ]
  },
  {
    path: '/projectAdminComponents',
    name: 'projectAdminComponents',
    meta: {
      access: ['xiangmu'],
      icon: '_project',
      title: '项目'
    },
    component: Main,
    children: [
      {
        path: 'projectAdmin',
        name: 'projectAdmin',
        meta: {
          access: ['gukexiangmuguanli'],
          icon: '_project',
          title: '顾客项目管理'
        },
        component: () => import('@/view/projectAdmin/projectAdmin.vue')
      }
    ]
  },
  {
    path: '/moneyManage',
    name: 'moneyManage',
    meta: {
      access: ['shouyinguanli'],
      icon: '_shoukuanguanli',
      title: '收银管理'
    },
    component: Main,
    children: [
      {
        path: 'moneyManagement',
        name: 'moneyManagement',
        meta: {
          access: ['shoukuanxiangqing'],
          icon: '_xiangqing1',
          title: '收款详情'
        },
        component: () => import('@/view/moneyManagement/moneyManagement.vue')
      },
      {
        path: 'cashierStatistics',
        name: 'cashierStatistics',
        meta: {
          access: ['shouyintongji'],
          icon: '_tongji',
          title: '收银统计'
        },
        component: () => import('@/view/moneyManagement/cashierStatistics.vue')
      },
      {
        path: 'dailyReport',
        name: 'dailyReport',
        meta: {
          access: ['shouyinbaobiao'],
          icon: '_baobiaoguanli',
          title: '收银结算报表'
        },
        component: () => import('@/view/moneyManagement/accountReport.vue')
      }
    ]
  },
  {
    path: '/productManagement',
    name: 'productManagement',
    meta: {
      access: ['chanpinguanli_z'],
      icon: '_chanpin',
      title: '仓库管理'
    },
    component: Main,
    children: [
      {
        path: 'productList',
        name: 'productList',
        meta: {
          access: ['chanpinliebiao_z'],
          icon: '_xiangqing',
          title: '入库'
        },
        component: () => import('@/view/productManagement/productList/productList.vue')
      },
      {
        path: 'proCateManage',
        name: 'proCateManage',
        meta: {
          access: ['chanpinleibie_z'],
          icon: '_leibieguanli',
          title: '仓库类别'
        },
        component: () => import('@/view/productManagement/proCateManage/proCateManage.vue')
      },
      {
        path: 'specification',
        name: 'specification',
        meta: {
          access: ['chanpinguige_z'],
          icon: '_leibieguanli',
          title: '仓库规格'
        },
        component: () => import('@/view/settings/specification.vue')
      },
      {
        path: 'supplier',
        name: 'supplier',
        meta: {
          access: ['gongyingshang_z'],
          icon: '_xiangqing1',
          title: '供应商'
        },
        component: () => import('@/view/settings/supplier.vue')
      },
      {
        path: 'unitManage',
        name: 'unitManage',
        meta: {
          access: ['danweiguanli_z'],
          icon: '_navicon-jldwz',
          title: '单位管理'
        },
        component: () => import('@/view/productManagement/unitManage/unitList.vue')
      },
      {
        path: 'exWarehouse',
        name: 'exWarehouse',
        meta: {
          access: ['chuku'],
          icon: '_cangku_zhongzhuanchuzhan_o',
          title: '出库'
        },
        component: () => import('@/view/inventoryManagement/exWarehouse.vue')
      }
    ]
  },
  {
    path: '/projectManagement',
    name: 'projectManagement',
    meta: {
      access: ['xiangmuguanli_z'],
      icon: '_xiangmu',
      title: '项目管理'
    },
    component: Main,
    children: [
      {
        path: 'projectList',
        name: 'projectList',
        meta: {
          access: ['xiangmuliebiao_z'],
          icon: '_xiangqing1',
          title: '项目列表'
        },
        component: () => import('@/view/projectManagement/projectList.vue')
      },
      {
        path: 'projectCateManage',
        name: 'projectCateManage',
        meta: {
          access: ['xiangmuleibieguanli_z'],
          icon: '_leimupinleifenleileibie',
          title: '项目类别管理'
        },
        component: () => import('@/view/projectManagement/projectCateList.vue')
      }
    ]
  },
  {
    path: '/mealManagement',
    name: 'mealManagement',
    meta: {
      access: ['taocanguanli_z'],
      icon: '_taocanyuliang',
      title: '套餐管理'
    },
    component: Main,
    children: [
      {
        path: 'mealList',
        name: 'mealList',
        meta: {
          access: ['taocanliebiao_z'],
          icon: '_xiangqing',
          title: '套餐列表'
        },
        component: () => import('@/view/mealManagement/mealList.vue')
      }
    ]
  },
  {
    path: '/shopManage',
    name: 'shopManage',
    meta: {
      access: ['dianpuguanli_z'],
      icon: '_dianpu',
      title: '店铺管理'
    },
    component: Main,
    children: [
      {
        path: 'shopList',
        name: 'shopList',
        meta: {
          access: ['mendianguanli_z'],
          icon: '_dianpu',
          title: '门店管理'
        },
        component: () => import('@/view/shopManage/shopList.vue')
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      access: ['xitongzhongxin_z'],
      icon: '_xitong',
      title: '系统中心'
    },
    component: Main,
    children: [
      {
        path: 'customerSource',
        name: 'customerSource',
        meta: {
          access: ['kehulaiyuan_z'],
          icon: '_icon-',
          title: '客户来源'
        },
        component: () => import('@/view/settings/customerSource.vue')
      },
      {
        path: 'payWay',
        name: 'payWay',
        meta: {
          access: ['zhifufangshi_z'],
          icon: '_zhifubao',
          title: '支付方式'
        },
        component: () => import('@/view/settings/payWay.vue')
      },
      {
        path: 'preStoreManage',
        name: 'preStoreManage',
        meta: {
          access: ['yucunleibie_z'],
          icon: '_navicon-jldw',
          title: '预存类别管理'
        },
        component: () => import('@/view/settings/preStoreManage.vue')
      },
      {
        path: 'discountManage',
        name: 'discountManage',
        meta: {
          access: ['zhekouguanli_z'],
          icon: '_zhekou',
          title: '折扣管理'
        },
        component: () => import('@/view/settings/discountManage.vue')
      },
      {
        path: 'consultingType',
        name: 'consultingType',
        meta: {
          access: ['zixunleibie_z'],
          icon: '_leibieguanli',
          title: '咨询类别'
        },
        component: () => import('@/view/settings/consultingType.vue')
      }
    ]
  },
  {
    path: '/inventoryManagement',
    name: 'inventoryManagement',
    meta: {
      access: ['kuchunguanli_g'],
      icon: '_cangku',
      title: '库存管理'
    },
    component: Main,
    children: [
      {
        path: 'theTotalInventory',
        name: 'TheTotalInventory',
        meta: {
          access: ['zongkucun'],
          icon: '_cangku_zhongzhuanchuzhan_o',
          title: '总库存'
        },
        component: () => import('@/view/inventoryManagement/theTotalInventory.vue')
      },
      {
        path: 'bePutInStorage',
        name: 'bePutInStorage',
        meta: {
          access: ['ruku'],
          icon: '_cangku_daozhan_o',
          title: '入库'
        },
        component: () => import('@/view/inventoryManagement/bePutInStorage.vue')
      },
      {
        path: 'placeAnOrder',
        name: 'placeAnOrder',
        meta: {
          access: ['xiadan'],
          icon: '_cangku_zhongzhuanchuzhan_o',
          title: '下单'
        },
        component: () => import('@/view/inventoryManagement/placeAnOrder.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
