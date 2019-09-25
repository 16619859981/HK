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
      // 搜索框数据
      searchItem: {
        studentClassId: '',
        parentPersonId: '',
        keyvalue: '',
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
        parentSex:''
      },

      dialogVisible: false,

    }
  },
  methods: {
    // 查看按钮
    handleLook(row) {
      // console.log('点击查看')
      // console.log(row);
      this.$router.push('/classParentsListLook')
    },
    handleEdit(row) {
      this.$router.push('/classParentsListEditor')
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.currentPage = page;
      this.searchItem.sliceParams.pageNum = page
      this.handleList()
      // console.log(`当前页: ${val}`);
    },
    //点击创建学校按钮进行子组件的跳转
    createSchool() {
      this.$router.push('/creatSchool')
    },

    open7() {
      this.$confirm('此操作将改变教师状态', '警告', {
        cancelButtonText: '启用',
        cancelButtonText: '禁用',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '启用成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '禁用成功'
        });
      });
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

    handleList2() {
      this.currentPage = 1
      this.searchItem.sliceParams.pageNum = 1
      this.searchItem.studentClassId = this.$route.query.id
      if (this.searchItem.parentSex == 2) {
        this.searchItem.parentSex = ''
      }

      this.handleList()
    },
    handleList() {
      this.searchItem.studentClassId = this.$route.query.id
      this.$http.post(api.getSchool('/parent/selectparent'), this.searchItem).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            res.data.data.data[i].parentPhone = String(res.data.data.data[i].parentPhone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
            if (res.data.data.data[i].parentPhone == "null") {
              res.data.data.data[i].parentPhone = ""
            }
            if (res.data.data.data[i].parentSex == 0) {
              res.data.data.data[i].parentSex = '男'
            } else if (res.data.data.data[i].parentSex == 1) {
              res.data.data.data[i].parentSex = '女'
            }

          }
          this.total = res.data.data.total
          this.tableData = res.data.data.data

        }
      })
    },

    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    },

    lad () {
      this.loading = true
    },
    fushu () {
      if (this.searchItem.parentPersonId < 0) {
        this.searchItem.parentPersonId = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    download() {
      const params = qs.stringify(this.searchItem)
    
      window.open(`/school/parent/exportschoolparent?${params}`,"_self")


      
    }


  },
  mounted() {
    this.handleList()
  },

  created () {
    this.lad()
  }


}
