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
        positionId: '',
        positionName: '',
        managerPhone: '',
        positionStatus: '',
        sliceParams: {
          pageNum: 1,
          pageSize: 10,
        }
      },

      editStatus: {
        partnerId: '',
        status: '',
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
        path: '/authenticationLook',
        query: {
          id: row
        }
      });

    },
    handleEdit(row) {
      this.$router.push({
        path: '/editorSchool',
        query: {
          id: row.schoolId
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
          id: item.schoolPersonId
        }
      })
    },

    schoolTeacherList(item) {
      // this.$router.push('/schoolTeacherList')
      this.$router.push({
        path: '/schoolTeacherList',
        query: {
          id: item.schoolPersonId
        }
      })

    },

    schooStudentsList(item) {
      // this.$router.push('/schooStudentsList')
      this.$router.push({
        path: '/schooStudentsList',
        query: {
          id: item.schoolPersonId
        }
      })

    },

    schoolParentsList(item) {
      // this.$router.push('/schoolParentsList')
      this.$router.push({
        path: '/schoolParentsList',
        query: {
          id: item.schoolPersonId
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
      this.$http.post(api.getPlatform('/person/partnerSearch'), this.from).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].positionStatus == "1") {
              res.data.data.data[i].positionStatus = "启用"
            } else {
              res.data.data.data[i].positionStatus = "禁用"
            }
          }

        }
        this.tableData = res.data.data.data
      })
    },

    // 修改状态
    editStatUs() {

      this.$http.post(api.getPlatform('/person/updatePartnerAcountStat'), this.editStatus).then(res => {
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
      this.editStatus.partnerId	 = row.positionId
      if (row.positionStatus == '启用') {
        this.editStatus.status = 0
      } else if (row.positionStatus == '禁用') {
        this.editStatus.status = 1
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
      this.from.areaid = this.areaArr
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
      this.from.areaid = this.areaArr
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
      this.from.areaid = this.areaArr
    },

    valu4(areaNumber) {
      this.areaArr.push(areaNumber)
      this.from.areaid = this.areaArr
      // console.log(this.from)
    },
    handleChange(file) {

      // console.log("xuanzhong")
      // console.log(file)


      this.loading = true


    },
    handleChange1(event, file, fileList) {

      // console.log("shangchuan")
      // console.log(event)
      // console.log(file)
      // console.log(fileList)


      this.loading = true


    },
    // 导入
    handleSuccess(res) {

      this.loading = false
      // console.log(res)
      if (res.status == 200) {
        this.$http.post(api.getPlatform('/importschool'), { batch: res.data }).then(res => {
          console.log(res.data.status)
          if (res.data.status == 200) {
            // this.studentList()
            this.$message.success('导入成功')
            this.handleList()

          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (res.status == 402) {
        this.$message.error(res.msg)
      } else if (res.status == 500) {
        this.$message.error(res.msg)

      } else {
        this.$message.error(res.msg)
      }
    },
    lad() {
      this.loading = true
    },
    fushu() {
      if (this.from.schoolid < 0) {
        this.from.schoolid = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    download() {
      const params = qs.stringify(this.from)

      window.open(`/school/school/exportSchoollist?${params}`, "_self")



    },
    //下载模板
    downmodel() {
      window.open('/s1/d1/hongkaFiles/model/学校导入模板.zip')
    },
    //排序接口
    handelOrder() {
      this.$http.post(api.getPlatform('/order/query'), { type: 'school' }).then(res => {
        if (res.data.status == 200) {
          this.order = res.data.data
        }
      })

    },

    schoolManagement () {
      this.$router.push('/schoolManagement')
    },

    lookposition () {
      this.$router.push('/lookTeacherLT')      
    },


    handelEdit (id) {
      this.$router.push({
        path: '/authenticationRecord',
        query: {
          id: id
        }
      })
    }


    



  },
  mounted() {

  },
  created() {
    this.handleList()
    this.areaList()
    this.lad()
    this.handelOrder()
  }


}
