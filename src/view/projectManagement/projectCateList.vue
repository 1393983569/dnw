<template>
  <div>
    <Button type="primary" size="large" style="margin-bottom: 10px" @click="addProCate">添加项目类别</Button>
    <Table :columns="columns" :data="values" width="600"></Table>
  </div>
</template>

<script>
  import editableTables from '_c/editableTables/editableTables.vue'
  import {
    getProCateList,
    delProCateById,
    addProCate,
    modifyProCate
  } from '@/api/projectManagement/projectManagement.js'

  export default {
    components: {
      editableTables
    },
    data: function () {
      return {
        columns: [
          {
            title: '项目名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.modify(params.row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  'Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      'marginLeft': '5px'
                    },
                    on: {
                      click: () => {
                        this.deleteProCate(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ])
            }
          }
        ],
        values: [],
        cateName:null
      }
    },
    methods: {
      getCateList() {
        getProCateList()
          .then(res => {
            if (res.info.data instanceof Array) {
              this.values = res.info.data;
            } else {
              this.$Message.info('暂无数据');
              this.values = [];
            }
          })
          .catch(e => {
            console.log(e);
            this.$Message.error('网络异常');
          })
      },
      modify(item) {
        this.cateName = item.name;
        let self = this;
        this.$Modal.confirm({
          title:'编辑项目类别',
          render:(h,params)=>{
            return h('Input',{
              props:{
                placeholder: '请输入名称',
                value: this.cateName,
                clearable:true
              },
              on:{
                input:(e)=>{
                  this.cateName = e;
                }
              }
            });
          },
          onOk:function () {
            modifyProCate(item.id, self.cateName)
              .then(res=>{
                this.$Message.success('编辑成功');
                self.getCateList();
              })
              .catch(e=>{
                console.log(e);
                this.$Message.error('网络异常');
              })
          }
        });
      },
      deleteProCate(item) {
        let self = this;
        this.$Modal.confirm({
          title: '提示',
          content: `确定要删除<strong style="margin: 5px">${item.name}</strong>吗？`,
          onOk: function () {
            delProCateById(item.id)
              .then(res => {
                this.$Message.success('删除成功');
                self.getCateList();
              })
              .catch(e => {
                console.log(e);
                this.$Message.error('网络异常');
              })
          }
        });
      },
      addProCate(){
        let self = this;
        this.cateName = null;
        this.$Modal.confirm({
          title:'添加项目类别',
          render:(h,params)=>{
            return h('Input',{
              props:{
                placeholder: '请输入名称',
                value: this.cateName,
                clearable:true
              },
              on:{
                input:(e)=>{
                  this.cateName = e;
                }
              }
            });
          },
          onOk:()=>{
            if(!self.cateName){
              this.$Message.info("类别名称不能为空");
              return;
            }
            addProCate(self.cateName)
              .then(res=>{
                this.$Message.success('添加成功');
                self.getCateList();
              })
              .catch(e=>{
                console.log(e);
                this.$Message.error('网络异常');
              })
          }
        });
      }
    },
    mounted() {
      this.getCateList();
    }
  }
</script>

<style scoped>

</style>
