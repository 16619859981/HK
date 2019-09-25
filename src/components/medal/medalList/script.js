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

      // 搜索框数据
      searchItem: {
        businessId: '',
        medalName: '',
        userName: '',
        state: '',
        medalNumDesc: "",

        sliceParams: { //分页
          pageNum: 1,
          pageSize: 10
        },

      },

      //修改状态
      resourceId: "",
      states: "",
      dialogVisible: false,
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
    creatMedal() {
      this.$router.push('/creatMedal')
    },
    // 查看数据
    handleData(id) {
      this.$router.push({
        path: '/medalData',
        query: {
          id: id
        }
      });

    },
    //查看奖章
    lookMedal(id) {
      console.log(id)
      this.$router.push({
        path: '/lookMedal',
        query: {
          id: id
        }
      });
    },
    //编辑
    editMedal(id) {
      this.$router.push({
        path: '/editMedal',
        query: {
          id: id
        }
      });
    },
    //排序
    sortChange(column, prop, order) {
      console.log(column.prop); //prop标签 => nickname
      console.log(column.order); //descending降序、ascending升序
      //调排序接口
      if (column.order == "ascending") {
        this.searchItem.medalNumDesc = "asc"
      } else if (column.order == "descending") {
        this.searchItem.medalNumDesc = "desc"
      }

      this.renderList2()


    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },

    renderList2() {

      if (this.searchItem.state == 0) {
        this.searchItem.state = ""
      }


      if (this.searchItem) {
        this.searchItem.sliceParams.pageNum = 1
      }

      this.renderList()
    },
    // 渲染列表
    renderList() {
      // console.log('执行')
      this.$http.post(api.getPlatform('/medal/meMedalGroup/list4Json'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false

          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {

            if (res.data.data.data[i].state == 1) {
              res.data.data.data[i].state = '进行中'
            } else if (res.data.data.data[i].state == 2) {
              res.data.data.data[i].state = '已结束'
            }

          };
          this.tableData = res.data.data.data;
        }
      })
    },
    //修改状态
    handleState(businessId, state) {
      this.businessId = businessId
      if (state == '已结束') {
        this.states = 1
      } else if (state == '进行中') {
        this.states = 2
      }
      this.dialogVisible = true
    },
    editState() {
      this.$http.post(api.getPlatform('/medal/meMedalGroup/medalStatus'), {
        businessId: this.businessId,
        state: this.states
      }).then(res => {
        if (res.data.status == 200) {
          this.$message.success('修改成功')
          this.renderList()
        } else {
          this.$message.error(res.data.msg)
        }
        this.dialogVisible = false
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


  },

  mounted() {
    this.renderList();

  },
  created() {
    this.lad()
  }
}
