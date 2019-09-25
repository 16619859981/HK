import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'

export default {
  data() {
    return {
      tableData: [],
      total: 12,
      searchText: '',
      loading: true,
      currentPage: 0,
      tgxs:false,
      radio: '',
      xzXS: [],
      rB: {
        studentClassId: '',
        applyName: '',
      },
      // 搜索框数据
      searchItem: {
        //  班级ID
        studentClassId: '',
        // 关键字
        keyvalue: '',
        // 状态
        status: '',
        // 申请开始时间
        startTime: '',
        // 申请结束时间
        endTime: '',
        // 操作开始时间
        ustartTime: '',
        // 操作结束时间
        uendTime: '',
        // 分页
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        }
      },

      id: '',


      dialogVisibleStatus: false,

      dialogVisibleStatus1: false,

      btgxx: false,

      tongguo: {
        userid1: '',
        status: 1,
        studentId: '',

      },

      butongguo: {
        userid1: '',
        status: 2,
        studentId: ''
      },

      numT: 0

    }
  },
  methods: {
    // 查看按钮
    handleLook(id,name,id1) {
      // console.log('点击查看')
      // console.log(row);
      // this.$router.push('/classStudentsListLook')
      this.radio = ''

      this.tongguo.studentId = id1
      this.rB.studentClassId = id
      this.rB.applyName = name
      // this.dialogVisibleStatus = true
      this.tgxs = true
      this.selectimportstudent()
    },
    handleEdit(id,name,id1) {
      this.radio = ''
      // this.$router.push('/classStudentsListEditor')
      this.butongguo.studentId = id1
      this.rB.studentClassId = id
      this.rB.applyName = name
      this.btgxx = true
      this.selectimportstudent()
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.handleList()
    },
    //点击创建学校按钮进行子组件的跳转
    createSchool() {
      this.$router.push('/creatSchool')
    },


    handleLookClass(item) {
      // alert(1)
      this.$router.push('/lookClass')
    },

    schoolManagement() {
      this.$router.push('/schoolManagement')
    },

    lookTeacher() {
      this.$router.push('/lookTeacher')
    },

    lookParents() {
      this.$router.push('/lookParents')
    },

    tabH() {
      return 'height: 0'
    },

    tabP() {
      return 'padding: 10px 0px'
    },

    editStatUs() {
      this.numT++
      if (this.numT > 1) {
        return false
      }
      // console.log(this.tongguo)
      this.$http.post(api.getSchool('/student/updateapply'), this.tongguo).then(res => {
        if (res.data.status == 200) {
          this.$message({
            type: 'success',
            message: '通过加入班级'
          })
          this.handleList()
          this.numT = 0
        }
      })
      this.dialogVisibleStatus = false
    },

    editStatUs1() {
      this.numT++
      if (this.numT > 1) {
        return false
      }
      // this.butongguo.studentId = this.status
      this.$http.post(api.getSchool('/student/updateapply'), this.butongguo).then(res => {
        if (res.data.status == 200) {
          this.$message({
            type: 'success',
            message: '未通过加入班级'
          })
          this.handleList()
          this.numT = 0
        }
      })

      this.dialogVisibleStatus1 = false

    },
    //搜索
    handleList2() {
      this.currentPage = 1
      this.searchItem.sliceParams.pageNum = 1
      if (this.searchItem.status == 3) {

        this.searchItem.status = ''
      }
      if (this.searchItem.startTime != '' && this.searchItem.endTime == '') {
        this.searchItem.endTime = new Date().getTime()

      }
      if (this.searchItem.endTime < this.searchItem.startTime) {
        this.$message.error('请选择正确的日期')
        return false

      }

      if (this.searchItem.ustartTime != '' && this.searchItem.uendTime == '') {
        this.searchItem.endTime = new Date().getTime()

      }
      if (this.searchItem.uendTime < this.searchItem.ustartTime) {
        this.$message.error('请选择正确的日期')
        return false

      }
      this.handleList()
    },

    handleList() {
      this.searchItem.studentClassId = this.$route.query.id
      this.$http.post(api.getSchool('/student/applystudent'), this.searchItem).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)

          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].sex == 0) {
              res.data.data.data[i].sex = '男'
            } else if (res.data.data.data[i].sex == 1) {
              res.data.data.data[i].sex = '女'
            }

            if (res.data.data.data[i].status == 0) {
              res.data.data.data[i].status = '待入班'
            } else if (res.data.data.data[i].status == 1) {
              res.data.data.data[i].status = '已入班'
            } else if (res.data.data.data[i].status == 2) {
              res.data.data.data[i].status = '未通过'
            }
            res.data.data.data[i].phone = String(res.data.data.data[i].phone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")

            res.data.data.data[i].cTime = formatDate(new Date(Number(res.data.data.data[i].cTime)), 'yyyy-MM-dd hh:mm');
            if (res.data.data.data[i].utime == 0) {
              res.data.data.data[i].utime = ''
            } else {
              res.data.data.data[i].utime = formatDate(new Date(Number(res.data.data.data[i].utime)), 'yyyy-MM-dd hh:mm');
            }


          }

          this.tableData = res.data.data.data
          // console.log(this.tableData)
        }
      })
    },

    searchList() {
      this.currentPage = 1

      if (this.searchItem) {
        this.searchItem.sliceParams.pageNum = 1
      }

      this.handleList()
    },

    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    },

    lad () {
      this.loading = true
    },
    download() {
      const params = qs.stringify(this.searchItem)
    
      window.open(`/school/student/exportapplystudent?${params}`,"_self")


      
    },

    selectimportstudent () {
      this.$http.post(api.getSchool('/student/selectimportstudent'),this.rB).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.xzXS = res.data.data.data
          // console.log(this.xzXS)
        }
      }) 
    },



    tgxsqd() {
      // console.log(this.radio)
      // if (this.radio == '') {
      //   this.$message.error('请选择学生')
      //   return false
        
      // }
      this.tongguo.userid1 = this.radio
      this.butongguo.userid1 = this.radio
      this.tgxs = false

      this.dialogVisibleStatus = true
    },


    btgxx1 () {
      // if (this.radio == '') {
      //   this.$message.error('请选择学生')
      //   return false        
      // }
      this.butongguo.userid1 = this.radio
      this.btgxx = false

      this.dialogVisibleStatus1 = true
    }




  },
  mounted() {
    this.handleList()
  },

  created () {
    this.lad()
    
  }


}
