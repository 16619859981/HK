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
      // 排序
      order: [],
      dialogVisibleStatus: false,
      from: {
        parentName: '',
        parentPhone: '',
        studentName: '',
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
      this.$http.post(api.getPlatform('/parent/allparent'), this.from).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.total = Number(res.data.data.total)

        }
        this.tableData = res.data.data.data
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
    

    lookposition () {
      this.$router.push('/lookTeacherLT')      
    },

    lookSchool () {
      this.$router.push('/schoolManagement')      
    }

    



  },
  mounted() {

  },
  created() {
    this.handleList()
    this.lad()
  }


}
