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
        parentName: '',
        parentPhone: '',
        studentName: '',
        schoolId: this.$route.query.id,
        sliceParams: {
          pageNum: 1,
          pageSize: 10,
        }
      },

      editStatus: {
        personId: '',
        personStatus: '',
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
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.from.sliceParams.pageNum = page
      this.currentPage = page
      this.handleList()
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
      this.$http.post(api.getPlatform('/parent/schoolParent'), this.from).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.total = Number(res.data.data.total)

        }
        this.tableData = res.data.data.data
      })
    },

    statueTrue(row) {
      this.editStatus.personId = row.personId
      if (row.personStatus == '启用') {
        this.editStatus.personStatus = 0
      } else if (row.personStatus == '禁用') {
        this.editStatus.personStatus = 1
      }
      this.dialogVisibleStatus = true
    },

    editStatUs () {
      this.$http.post(api.getPlatform('/person/eduitPersonStatus'), this.editStatus).then(res => {
        if (res.data.status === 200) {
          this.dialogVisibleStatus = false
          this.handleList()
          this.$message.success('状态修改成功！')
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
    fushu() {
      if (this.from.schoolid < 0) {
        this.from.schoolid = ''
        this.$message.error('不可以输入负数')
        return
      }
    },

    schoolTeacherList (item) {
      this.$router.push({
        path: '/schoolTeacherListLook',
        query: {
          id: item
        }
      })
    },

    goLookTeacherLT () {
      // this.$router.push('/lookTeacherLT')
      this.$router.push('/lookTeacherLT')

    },
    goSchoolManagement () {
      // this.$router.push('/schoolManagement')
      this.$router.push('/schoolManagement')

    },
  },
  mounted() {

  },
  created() {
    this.handleList()
    this.lad()
  }


}
