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
      styleTextBool: true,
      styleText: "更多条件",
      loading: true,
      active: false,
      searchText: '',
      currentPage: 0,
      // 搜索框数据
      searchItem: {
        // 查询编号
        serialNumber: '',
        // 关键字
        keyword: '',
        // 身份
        identity: '',
        // 地区
        region: '',
        // 状态
        state: '',
        // 类型
        type: '',
        // 创建时间
        operationTime: '',
        // 操作时间
        creatTime: '',
        // 审核时间
        auditTime: '',
        // 设备号
        deviceNumber: '',
        // 手机号
        phone: '',
        // 使用状态
        useState: '',
        //排序
        orderBy: '',
      },
      // 排序
      order: [],
      dialogVisibleStatus: false,
      from: {
        schoolName: '',
        schoolId: '',
        schoolStatus: '',
        positionId: '',
        area: [],
        sliceParams: {
          pageNum: 1,
          pageSize: 10,
        }
      },

      editStatus: {
        schoolId: '',
        schoolStatus: '',
      },

      //地区
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      options1: [

      ],
      options2: [

      ],
      options3: [

      ],
      options4: [

      ],
      areaArr: [],


      // 请求头
      headers: {
        id: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),


      }
    }
  },
  methods: {
    style() {
      console.log(1)
      if (this.styleText == '更多条件') {
        this.styleText = "关闭"
        this.active = true
        this.styleTextBool = false
      } else {
        this.styleText = "展开"
        this.active = false
      }

    },
    // 查看按钮
    handleLook(row) {
      // console.log(row)
      this.$router.push({
        path: '/lookSchool',
        query: {
          id: row
        }
      });

    },
    handleEdit(row) {
      this.$router.push({
        path: '/editorSchool',
        query: {
          id: row
        }
      })
    },

    lookTeacher() {
      this.$router.push('/lookTeacher')
    },

    lookParents() {
      this.$router.push('/lookParents')
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.from.sliceParams.pageNum = page
      this.currentPage = page
      this.handleList()
    },
    //点击创建学校按钮进行子组件的跳转
    createSchool() {
      this.$router.push('/creatSchool')
    },

    lookStudents() {
      this.$router.push('/lookStudents')
    },

    handleLookClass(item) {
      // alert(1)
      // console.log(item)
      // this.$router.push('/lookClass')
      this.$router.push({
        path: '/lookClass',
        query: {
          id: item
        }
      })
    },

    schoolTeacherList(item) {
      // this.$router.push('/schoolTeacherList')
      this.$router.push({
        path: '/schoolTeacherList',
        query: {
          id: item
        }
      })

    },

    schooStudentsList(item) {
      // this.$router.push('/schooStudentsList')
      this.$router.push({
        path: '/schooStudentsList',
        query: {
          id: item
        }
      })

    },

    schoolParentsList(item) {
      // this.$router.push('/schoolParentsList')
      this.$router.push({
        path: '/schoolParentsList',
        query: {
          id: item
        }
      })

    },

    schoolAlbum(item) {
      // this.$router.push('/schoolAlbum')
      this.$router.push({
        path: '/schoolAlbum',
        query: {
          id: item
        }
      })

    },
    lookRole() {
      this.$router.push('/lookRole')
    },
    //搜索
    handleList2() {
      // alert(678)
      this.currentPage = 1
      this.from.sliceParams.pageNum = 1
      this.handleList()
    },
    // 渲染列表
    handleList() {

      // console.log(window.location.href)
      var a =  window.location.href
      var s = a.indexOf('positionId')
      // console.log(s)
      if (s != -1) {
        var t = a.substring(s+11)
        this.from.positionId = t
      }
      // console.log(t)
      this.$http.post(api.getPlatform('/school/schoolSeach'), this.from).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].schoolStatus == "1") {
              res.data.data.data[i].schoolStatus = "启用"
            } else {
              res.data.data.data[i].schoolStatus = "禁用"
            }
            res.data.data.data[i].personCtime = formatDate(new Date(Number(res.data.data.data[i].personCtime)), 'yyyy-MM-dd hh:mm');
          }

        }
        this.tableData = res.data.data.data
      })
    },

    // 修改状态
    editStatUs() {

      this.$http.post(api.getPlatform('/school/modifyStatus'), this.editStatus).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          });
          this.handleList()
        }
      })

      this.dialogVisibleStatus = false

    },

    statueTrue(row) {
      this.editStatus.schoolId = row.schoolId
      if (row.schoolStatus == '启用') {
        this.editStatus.schoolStatus = 0
      } else if (row.schoolStatus == '禁用') {
        this.editStatus.schoolStatus = 1
      }
      this.dialogVisibleStatus = true
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


    // 四级联动
    areaList() {
      // alert(2)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: 1
      }).then(res => {
        // console.log(res.data.data)
        if (res.data.status == 200) {
          this.options1 = res.data.data

          // console.log(this.options1)
        }
      })
    },

    valu1(areaNumber) {
      this.areaArr = []
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
      // console.log(this.from)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options2 = res.data.data

        }
      })
    },

    valu2(areaNumber) {
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
      // console.log(this.from)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options3 = res.data.data

        }
      })
    },

    valu3(areaNumber) {
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
    },

    valu4(areaNumber) {
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
      // console.log(this.from)
    },


    lad() {
      this.loading = true
    },
    

    lookposition () {
      this.$router.push('/lookTeacherLT')      
    }

    



  },
  mounted() {

  },
  created() {
    this.handleList()
    this.areaList()
    this.lad()
  }


}
