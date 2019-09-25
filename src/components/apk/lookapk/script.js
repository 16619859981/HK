import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {},

      programData: [],
      dialogVisiblePlay: false,
      id: this.$route.query.id,
      Url: '',
      Bool: false,
      onselectstart: '',
      total: 5,
      currentPage: 0,

      pageNum: 1,
      pageSize: 10,

      // Bool:false
      player: '',
      obj: {},
      tubImg: [],
      common: [],
      pageIndex: 1,



    };


  },
  created() {

  },
  methods: {
  
    //渲染专辑信息
    renderList() {

      axios.post(api.getPlatform('/package/query/id'), {
        id: this.$route.query.id
      }).then(res => {

        // console.log(res.data)
        // console.log(res.status)
        // console.log(res.data.status)


        if (res.data.status == 200) {

          // for (var i = 0; i < res.data.data.data.length; i++) {
            // this.total = res.data.data.total
            //类型的判断
            if (res.data.data.packageType == 1) {

              res.data.data.packageType = '红卡少年'
            } 
            if (res.data.data.packageUtype == 1) {
              res.data.data.packageUtype = '普通更新'
            }
            if (res.data.data.packageUtype == 2) {
              res.data.data.packageUtype = '推荐更新'
            }
            if (res.data.data.packageUtype == 3) {
              res.data.data.packageUtype = '强制更新'
            }
            


          // };

          this.tableData = res.data.data;




        }

      })
    },
   

    tabH() {
      return 'height: 50px'
    },

    tabP() {
      return 'padding: 10px 0px'
    },

    a() {
      this.$router.push('/albumManagement')
    },

  
    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    }








  },
  mounted() {
    //渲染专辑信息
    this.renderList();
    //渲染节目信息
    // this.renderProgram();


  },

}
