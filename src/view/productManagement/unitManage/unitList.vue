<template>
  <div>
    <Button type="primary" size="large" style="margin-bottom: 10px" @click="addUnit">添加单位</Button>
    <Table :columns="columns" :data="values" width="400"></Table>
  </div>
</template>

<script>
  import {
    getUnitList,
    addUnit,
    deleteUnit
  } from '@/api/unitManage/unitManage'

  export default {
    data: function () {
      return {
        columns: [
          {
            title: '名称',
            key: 'unityname',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteUnits(params.row);
                  }
                }
              }, '删除');
            }
          }
        ],
        values: [],
        unitName:null
      }
    },
    methods: {
      getData() {
        getUnitList()
          .then(res => {
            this.values = res.info.data;
          })
          .catch(e => {
            console.log(e);
            this.$Message.error('网络异常');
          });
      },
      deleteUnits(item) {
        this.$Modal.confirm({
          title: '提示',
          content: `确定要删除<strong style="margin: 5px">${item.unityname}</strong>吗？`,
          onOk: () => {
            deleteUnit(item.id).then(res => {
              this.$Message.success('删除成功');
              this.getData();
            })
              .catch(e => {
                console.log(e);
                this.$Message.error('网络异常');
              });
          }
        });
      },
      addUnit() {
        this.$Modal.confirm({
          title:'添加单位',
          render:(h,params)=>{
            return h('Input',{
             props:{
               size:'large',
               placeholder:'请输入名称'
             },
              on:{
               input:(e)=>{
                 this.unitName = e;
               }
              }
            });
          },
          onOk:()=>{
            if(!this.unitName){
              this.$Message.info('名称不能为空');
              return;
            }
            addUnit(this.unitName)
              .then(res=>{
                this.$Message.success('添加成功');
                this.getData();
              })
              .catch(e=>{
                console.log(e);
                this.$Message.error('网络异常');
              });
          }
        });
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
