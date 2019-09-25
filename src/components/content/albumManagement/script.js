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
        orgName: '', //所属组织
        albumCategory: [], //分类

        albumId: null, //专辑编号
        albumName: null, //专辑名称
        // area: null,
        albumStatus: null, //状态
        createTimeBeginTime: null, //创建开始时间
        createTimeEndTime: null, //创建结束时间
        sliceParams: { //分页
          pageNum: 1,
          pageSize: 10
        },
        direction: null,
        orderBy: null,
      },


      options: [],
      areaCode: 1,
      status: '',
      id: '',
      dialogVisible: false,
      val: '',
      dialogVisibleStatus: false,
      dialogVisiblePopout: false,
      //删除
      dialogVisibleDel: false,
      delId: '',
      arr: [],
      // 请求头
      headers: {
        id: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),
      },
      // 请求头
      headerss: {
        useid: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),
      }
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
    sortChange(column, prop, order) {
      console.log(column.prop); //prop标签 => nickname
      console.log(column.order); //descending降序、ascending升序
      //调排序接口
      if (column.order == "ascending") {
        this.searchItem.direction = "asc"
      } else if (column.order == "descending") {
        this.searchItem.direction = "desc"
      }
      if (column.prop == "albumUpcount") {
        this.searchItem.orderBy = "album_upcount"
      } else if (column.prop == "albumOpencount") {
        this.searchItem.orderBy = "album_opencount"
      }
      this.renderList2()


    },
    // 查看按钮
    handleLook(row, type) {

      // const {href} = this.$router.resolve({
      //   path: '/albumLook',
      //   query: {
      //     id: row,
      //     type: type
      //   }
      // })
      // window.open(href , "_blank")
      this.$router.push({
        path: '/albumLook',
        query: {
          id: row,
          type: type
        }
      });
    },
    handleEdit(row, type) {
      this.dialogVisible = false
      this.$router.push({
        path: '/albumEdit',
        query: {
          id: row,
          type: type
        }
      });
    },
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },
    //点击创建专辑按钮进行子组件的跳转
    createAlbum() {
      // alert('创建专辑')
      this.$router.push('/createAlbum')
    },
    //添加节目
    creatProgram(row) {
      if (row.albumType == "音频") {
        this.$router.push({
          path: '/createAudioProgram',
          query: {
            id: row.albumId
          }
        });
      } else if (row.albumType == "视频") {

        this.$router.push({
          path: '/createVideoProgram',
          query: {
            id: row.albumId
          }
        });
      }

    },
    renderList2() {
      // console.log('执行')
      this.currentPage = 1,
        this.searchItem.albumCategory = this.selectedOptions3
      if (this.searchItem.albumStatus == 0) {
        this.searchItem.albumStatus = null
      }
      if (this.searchItem.albumType == 0) {
        this.searchItem.albumType = null
      }
      if (this.searchItem.createTimeBeginTime != null && this.searchItem.createTimeEndTime == null) {

        this.searchItem.createTimeEndTime = (new Date()).getTime()
        // console.log(new Date())
      }
      if (this.searchItem.cTimeEndTime < this.searchItem.createTimeBeginTime) {
        this.$message.error('请选择正确日期')
        return false
      }
      if (this.searchItem) {
        this.searchItem.sliceParams.pageNum = 1
      }

      this.renderList()
    },
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/album/query'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {
            //状态
            if (res.data.data.data[i].albumIsup == 1) {
              res.data.data.data[i].albumIsup = '上架中'
            } else if (res.data.data.data[i].albumIsup == 2) {
              res.data.data.data[i].albumIsup = '已下架'
            } else {
              res.data.data.data[i].albumIsup = '-'
            };
            if (res.data.data.data[i].albumType == "1") {
              res.data.data.data[i].albumType = "音频"
            } else if (res.data.data.data[i].albumType == "2") {
              res.data.data.data[i].albumType = "视频"
            }
          };
          this.tableData = res.data.data.data;
        }
      })
    },
    //修改
    change(row) {
      if (row.albumIup == "已下架" && row.albumUpcount == 0) {
        this.$message.error('此专辑没有节目，禁止上架')
        return false
      }
      this.id = row.albumId,
        this.status = row.albumIsup,
        this.dialogVisibleStatus = true
      // this.dialogVisibleStatus = true
    },
    //修改状态
    changeStatus() {
      if (this.status == "已下架") {
        this.status = 1
      } else if (this.status == "上架中") {
        this.status = 2
      }
      this.$http.post(api.getPlatform('/album/update/isup'), {
        albumId: this.id,
        isUp: this.status,
        recycle: "",
      }).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].albumId === this.id) {
              if (this.status == 1) {
                this.tableData[i].albumIsup = "上架中"
              } else {
                this.tableData[i].albumIsup = "已下架"
              }
            }
          }
          this.dialogVisibleStatus = false
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

    //删除
    handleDel(row) {
      this.delId = row
      this.dialogVisibleDel = true
    },
    DelAlbum() {
      this.$http.post(api.getPlatform('/album/update/isup'), {
        albumId: this.delId,
        recycle: 2
      }).then(res => {

        if (res.data.status == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })


          this.renderList();

          this.dialogVisibleDel = false


        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          this.renderList();
          this.dialogVisibleDel = false
        }

      })

    },
    cate() {
      this.$http.post(api.getPlatform('/album/getComCategoryAll')).then(res => {

        if (res.data.status == 200) {
          this.options = res.data.data
        }
      })
    },

  },

  mounted() {
    this.renderList();
  },
  created() {
    this.lad()
    this.cate()
  }
}
