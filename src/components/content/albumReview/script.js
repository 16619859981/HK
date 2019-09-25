import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      active: false,
      styleTextBool: true,
      styleText: "更多条件",
      tableData: [],
      loading: true,
      total: 0,
      currentPage: 1,
      a: '',
      selectedOptions3: [],
      inputVisible: false,
      inputValue: '',
      // 搜索框数据
      searchItem: {
        orgName: '', 
        publishOrgName: '', 
        resourceId: null, //专辑编号
        beginTitle: null, //专辑名称
        resourceType: null, //类型

        sliceParams: { //分页
          pageNum: 1,
          pageSize: 10
        },

      },

      //点击查看的type和url
      type: "",
      url: "",
      dialogVisiblePlay: false,
      //通过和不通过的id
      dialogVisiblePass:false,
      resourceId:'',
      auditStatus:"",
    }
  },
  created() {},
  methods: {
    //搜索展开关闭按钮
    style() {
      if (this.styleText == '更多条件') {
        this.styleText = "关闭"
        this.active = true
        this.styleTextBool = false
      } else {
        this.styleText = "展开"
        this.active = false
      }

    },
    //操作记录
    checkHistory() {
      this.$router.push('/checkHistory')
    },
    // 查看节目
    handleLook(url, type) {
      this.url = url
      this.type = type
      this.dialogVisiblePlay = true
    },
    //通过
    handlePass(resourceId) {
      this.resourceId = resourceId
      this.auditStatus = 3
      this.dialogVisiblePass = true
    },
    //不通过
    handleNoPass(resourceId) {
      this.resourceId = resourceId
      this.auditStatus = 4
      this.dialogVisiblePass = true

    },
    //弹窗关闭
    closeDialog() {
      document.getElementById("media").pause();
      this.dialogVisiblePlay = false
    },
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },

    renderList2() {

     
      if (this.searchItem.resourceType == 0) {
        this.searchItem.resourceType = null
      }

      if (this.searchItem) {
        this.searchItem.sliceParams.pageNum = 1
      }

      this.renderList()
    },
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/material/operation_send/confirm'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {

            //类型
            if (res.data.data.data[i].resourceType == 1) {
              res.data.data.data[i].resourceType = "音频"
            } else if (res.data.data.data[i].resourceType == 2) {
              res.data.data.data[i].resourceType = "视频"
            }
            //组织类型
            if (res.data.data.data[i].applyOrgType == 1) {
              res.data.data.data[i].applyOrgType = "平台/中少红卡"
            } else if (res.data.data.data[i].applyOrgType == 2) {
              res.data.data.data[i].applyOrgType = "学校"
            } else
            if (res.data.data.data[i].applyOrgType == 3) {
              res.data.data.data[i].applyOrgType = "班级 "
            } else if (res.data.data.data[i].applyOrgType == 7) {
              res.data.data.data[i].applyOrgType = "红广号/大咖"
            } else
            if (res.data.data.data[i].applyOrgType == 10) {
              res.data.data.data[i].applyOrgType = "基地/少年宫"
            }
            res.data.data.data[i].resourceReferenceId = api.getUpload(res.data.data.data[i].resourceReferenceId)
          };
          this.tableData = res.data.data.data;
         
        }
      })
    },
  
    //导出数据
    download() {
      const params = qs.stringify(this.searchItem)
      const heade = qs.stringify(this.headerss)
      window.open(`/content/album/export?${params}&${heade}`, '_self')
    },
    tabH() {
      return 'height: 65px'
    },
    tabP() {
      return 'padding: 0; width:100px; color: #606266;'
    },
    getRowClass() {
      return 'background:#F5F7FA; color: #909399; font-weight: 400; height: 50px;'
    },
    upload() {
      document.getElementById("btn_file").click();
    },
    fushu() {
      console.log(1)
      if (this.searchItem.id < 0) {
        this.searchItem.id = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    lad() {
      this.loading = true
    },
    //下载模板
    downmodel() {
      window.open('/s1/d1/hongkaFiles/model/公司专辑节目导入模板.zip')
    },
    handleChange(file) {
      this.loading = true
    },
    handleChange1(event, file, fileList) {
      this.loading = true
    },
    // 导入
    handleSuccess(res) {
      this.loading = true
      this.loading = false
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.renderList()
      } else {

        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    //弹窗确认按钮
    pass() {
      this.$http.post(api.getPlatform('/material/operation_send/audit'),{auditStatus:this.auditStatus,resourceId:this.resourceId}).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.renderList()
        } else {
  
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
        this.dialogVisiblePass = false
      })

  }
  
  },

  mounted() {
    this.renderList();

  },
  created() {
    this.lad()
  }
}
