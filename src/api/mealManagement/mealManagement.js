import axios from '@/libs/api.request'

/**
 *
 * @param pageNum
 * @description 获取套餐列表
 */
export const getMealList=(pageNum)=>{
  let params = new URLSearchParams();
  params.append('pageNum', pageNum);
  return axios.request({
    url:'getPageSetMeal',
    params:params,
    method:'get'
  });
};

/**
 *
 * @param id
 * @description 获取套餐详情
 */
export const getMealDetail=(id)=>{
  let params = new URLSearchParams();
  params.append('id', id);
  return axios.request({
    url:'getSetMeal',
    params:params,
    method:'get'
  });
};

/**
 *
 * @param data
 * @description 添加套餐
 */
export const addMeal=(data)=>{
  let params = new URLSearchParams();
  for(let x in data){
     params.append(x,data[x]);
  }
  return axios.request({
    url:'addSetMeal',
    params:params,
    method: 'post'
  });
};

/**
 *
 * @param data
 * @description 修改套餐
 */
export const modifyMeal=(data)=>{
  let params = new URLSearchParams();
  let x;
  for(x in data){
    params.append(x,data[x]);
  }
  return axios.request({
    url:'updateSetMeal',
    params:params,
    method:'post'
  });
};


/**
 *
 * @param id
 * @description 删除套餐
 */
export const deleteMeal=(id)=>{
  let params = new URLSearchParams();
  params.append('id', id);
  return axios.request({
    url:'deleteSetMeal',
    params:params,
    method:'get'
  });
};

