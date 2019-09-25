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
        activityId: this.$route.query.id,
        startDate: '',
        endDate: ''
      },
      activityForm: {},
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
      // 搜索框数据
      searchItem: {
        acitivtyId: '',
        activityName: '',
        activityStatus: '',
        activityArea: [],
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
      },
      status: '',
      id: '',
      dialogVisible: false,
      dialogVisibleToTop: false,
      dialogVisibleNoTop: false,
      dialogVisibleGo: false,
      dialogVisibleNoGo: false,
      dialogVisibleDel: false,
      val: '',
      dialogVisibleStatus: false,
      editStatus: '',
      toTopId: '',
      noTopId: '',
      dialogVisibleResason: false,
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
    // 查看按钮
    handleLook(row) {

      // if (row.activityType == '活动') {
      //   this.$router.push({
      //     path: '/lookPic',
      //     query: {
      //       id: row.activityId
      //     }
      //   });
      // } else {
      this.$router.push({
        path: '/lookVote',
        query: {
          id: row
        }
      });
      // }


    },

    //选择地区
    areaList2() {

      this.$http.post(api.getPlatform('/area'), {
        areaCode: 1
      }).then(res => {

        if (res.data.status == 200) {
          this.options1 = res.data.data


        }
      })
    },
    //选择的省份获取
    val1(per) {
      // alert(per)
      this.searchItem.activityArea = []
      this.searchItem.activityArea.push(per)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: per
      }).then(res => {

        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options2 = res.data.data

        }
      })
    },
    //获取选择的市区
    val2(city) {
      if (this.searchItem.activityArea.length == 2) {
        this.searchItem.activityArea.pop()
      }
      this.searchItem.activityArea.push(city)
      // alert(city)
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },
    //创建活动
    createActive() {
      // alert('创建活动')
      this.$router.push('/createActive')
    },
    //添加节目
    programData(row) {
      this.$router.push({
        path: '/activeDataVoice',
        query: {
          id: row
        }
      });
    },
    renderList2() {
      this.searchItem.sliceParams.pageNum = 1
      this.currentPage = 1


      this.renderList()
    },
    // 渲染列表
    renderList() {
      var date = new Date().getTime();
      this.nowTime = (new Date()).valueOf()
      // console.log(this.nowTime)
      this.$http.post(api.getPlatform('/activity/'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          // console.log(res.data.data.data[0].activityEtime)
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (this.nowTime < res.data.data.data[i].activityEtime) {
              res.data.data.data[i].activityEtime = '进行中'
            } else {
              res.data.data.data[i].activityEtime = '已结束'
            }
          };
          //  console.log('=========')
          // console.log(res.data.data.data)
          this.tableData = res.data.data.data;



        }


      })
    },
    // 活动置顶
    toTop(row) {
      this.toTopId = row
      this.dialogVisibleToTop = true
    },
    EditToTop() {
      // console.log(this.status)
      this.$http.post(api.getPlatform('/activity/to_top'), {
        activityId: this.toTopId,
      }).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message.success('活动已置顶!')
          this.dialogVisibleToTop = false
          this.tableData = []
          this.renderList()
        }
      })
    },
    // 活动取消置顶
    noTop(row) {
      this.noTopId = row
      this.dialogVisibleNoTop = true
    },
    EditNoTop() {
      // console.log(this.status)
      this.$http.post(api.getPlatform('/activity/no_top'), {
        activityId: this.noTopId,
      }).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message.success('活动已取消置顶!')
          this.dialogVisibleNoTop = false
          this.tableData = []
          this.renderList()
        }
      })
    },
    // 开始活动
    goAct(id) {
      this.endActiveTime = ''
      this.editFrom.endTime = ''
      this.editFrom.activityId = id
      this.editFrom.status = 1
      this.dialogVisibleGo = true
    },
    goActive() {
      this.editFrom.endTime = this.endActiveTime
      if (this.endActiveTime == '' || this.endActiveTime == null) {
        this.$message.error('必须选择结束时间!')
        return false
      }
      this.$http.post(api.getPlatform('/activity/isup'), this.editFrom).then(res => {
        if (res.data.status == 200) {
          this.$message.success('活动已开始!')
          this.dialogVisibleGo = false
          this.tableData = []
          this.renderList()
        }
      })
    },
    // 结束活动
    noGoAct(id) {
      this.endActiveTime = ''
      this.editFrom.activityId = id
      this.editFrom.status = 2
      this.dialogVisibleNoGo = true
      this.editFrom.endTime = new Date().getTime()

    },
    noGoActive() {
      this.$http.post(api.getPlatform('/activity/isup'), this.editFrom).then(res => {
        if (res.data.status == 200) {
          this.$message.success('活动已结束!')
          this.dialogVisibleNoGo = false
          this.tableData = []
          this.renderList()
        }
      })
    },
    // 删除活动
    delAct(id) {
      this.endActiveTime = ''
      this.editFrom.endTime = ''
      this.editFrom.activityId = id
      this.editFrom.status = 3
      this.dialogVisibleDel = true
    },
    delActive() {
      this.$http.post(api.getPlatform('/activity/isup'), this.editFrom).then(res => {
        if (res.data.status == 200) {
          this.$message.success('已删除该活动!')
          this.dialogVisibleDel = false
          this.tableData = []
          this.renderList()
        }
      })
    },

    //查看原因
    lookReason(row) {

      // console.log(row)
      this.val = row.activityCheckcontent
      this.dialogVisibleResason = true
    },
    //导出数据
    download() {
      const params = qs.stringify(this.searchItem)
      const heade = qs.stringify(this.headerss)
      window.open(`/content/activity/export?${params}&${heade}`, '_self')
    },
    tabH() {
      return 'height: 0'
    },
    tabP() {
      return 'padding: 10px 0px'
    },
    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    },
    fushu() {
      if (this.searchItem.id < 0) {
        this.searchItem.id = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    lad() {
      this.loading = true
    },
    jumpEditVote(id) {
      // if (activityUserName == '中少红卡') {
      //   activityUserName = 1
      // } else {
      //   activityUserName = 2
      // }
      // if (type == '投票活动') {
      // this.$router.push({
      //   path: '/editVote',
      //   query: {
      //     id: id,
      //     activityUserName: activityUserName
      //   }
      // });
      // } else if (type == '活动') {
      //   this.$router.push({
      //     path: '/editPic',
      //     query: {
      //       id: id,
      //       activityUserName: activityUserName
      //     }
      //   });
      // }

      this.$router.push({
        path: '/editVote',
        query: {
          id: id,
        }
      });
    },
    style() {
      this.active = true
      this.styleTextBool = false
    },
    handeleList () {
      this.$http.post(api.getPlatform('/report/home/oneactivity'), this.editFrom).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.activityForm = res.data.data
        }
      })
    },

    goActiveManagement () {
      this.$router.push('/activeManagement')
    }
  },
  mounted() {
    this.areaList2()
    this.renderList()
    this.handeleList()
  },
  created() {
    this.lad()
  }
}
