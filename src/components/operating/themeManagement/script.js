import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      tableData: [],
      editFrom: {
        activityId: '',
        status: '',
        endTime: ''
      },
      nowTime: '',
      active: false,
      endActiveTime: '',
      styleTextBool: true,
      total: 5,
      searchText: '',
      currentPage: 1,
      a: '',
      loading: true,
      inputVisible: false,
      inputValue: '',
      activityId1: '',
      // 搜索框数据
      searchItem: {
        activityId: '',
        activityName: '',
        activityPattern: '',
        searchOrgType: '',
        isChoice: '',
        publishOrgName: '',
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
      },
      status: '',
      id: '',
      dialogVisible: false,
      val: '',
      editStatus: '',
      toTopId: '',
      noTopId: '',
      kaifazhong: false,
      // 请求头
      headerss: {
        useid: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),
      },
      //地区
      value1: "",
      value2: '',
      options1: [{
        // areaNumber: "11000000",
        // areaName: "北京市"
      }, ],
      options2: [{
        // areaNumber: "11000000",
        // areaName: "北京市"
      }, ],
    }
  },
  methods: {
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },

    renderList2() {
      this.renderList()
    },
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/activity/operation_send'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          console.log(res)
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].activityType == 1) {
              res.data.data.data[i].activityType = '打卡'
            } else if (res.data.data.data[i].activityType == 2) {
              res.data.data.data[i].activityType = '闯关'
            } else if (res.data.data.data[i].activityType == 3) {
              res.data.data.data[i].activityType = '投票'
            }

            if (res.data.data.data[i].nowBelongType == 1) {
              res.data.data.data[i].nowBelongType = '红广平台'
            } else if (res.data.data.data[i].nowBelongType == 2) {
              res.data.data.data[i].nowBelongType = '学校'
            } else if (res.data.data.data[i].nowBelongType == 3) {
              res.data.data.data[i].nowBelongType = '班级'
            } else if (res.data.data.data[i].nowBelongType == 7) {
              res.data.data.data[i].nowBelongType = '红广号'
            } else if (res.data.data.data[i].nowBelongType == 10) {
              res.data.data.data[i].nowBelongType = '基地'
            }

            if (res.data.data.data[i].isChoice == 1) {
              res.data.data.data[i].isChoice = '已精选'
            } else if (res.data.data.data[i].isChoice == 0) {
              res.data.data.data[i].isChoice = '未精选'
            }
          }

          this.tableData = res.data.data.data
        }


      })
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
    lad() {
      this.loading = true
    },
    style() {
      this.active = true
      this.styleTextBool = false
    },
    editStatUs(id) {
      this.activityId1 = id
      this.dialogVisible = true
    },
    EditStat() {
      this.$http.post(api.getPlatform('/activity/choiceness/add'), {
        activityId: this.activityId1
      }).then(res => {
        if (res.data.status == 200) {
          this.$message.success('该活动已精选！')
          this.dialogVisible = false
          this.renderList();

        } else {
          this.$message.error(res.data.msg)
          this.dialogVisible = false

        }
      })
    },
    handleLook(id) {
      this.$router.push({
        path: '/lookVote',
        query: {
          id: id
        }
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
