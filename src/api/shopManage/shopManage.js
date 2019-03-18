import axios from '@/libs/api.request'

/**
 *
 * @param data 查询的条件
 * @description 分页查询店铺列表
 */
export const getShopList=(data)=>{
  let params = new URLSearchParams();
  let x;
  for(x in data){
    params.append(x,data[x]);
  }
  return axios.request({
    url:'getPageShop',
    data:params,
    method:'post'
  });
};

/**
 *
 * @param id
 * @description 获取店铺详情
 */
export const getShop=(id)=>{
  let params = new URLSearchParams();
  params.append('id',id);
  return axios.request({
    url:'getShop',
    data:params,
    method:'post'
  });
};

/**
 *
 * @param data 数据
 * @description 添加店铺
 */
export const addShop=(data)=>{
  let params = new URLSearchParams();
  let x;
  for(x in data){
    params.append(x,data[x]);
  }
  return axios.request({
    url:'addShop',
    data:params,
    method:'post'
  });
};

/**
 * @param id id
 * @param data 数据
 * @description 修改店铺
 */
export const modifyShop=(id,data)=>{
  let params = new URLSearchParams();
  let x;
  params.append('id',id);
  for(x in data){
    if(data[x]===null||typeof data[x]==='object'||data[x]===undefined)
      continue;
    params.append(x,data[x]);
  }
  return axios.request({
    url:'updateShop',
    data:params,
    method:'post'
  });
};

/**
 * @param id id
 * @param status 状态
 * @description 开启或关闭店铺
 */
export const openOrCloseShop=(id,status)=>{
 let params = new URLSearchParams();
 params.append('id', id);
 params.append('state', status);

 return axios.request({
   url:'editShop',
   data:params,
   method:'post'
 });
};

/**
 * 不分页获取所有管理员信息
 */
export const getAdminsInfo=()=>{
  return axios.request({
    url:'getAdminsInfo',
    method:'post'
  });
};
