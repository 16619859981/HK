
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {
        albumName: "我的任务",
        albumLabel: '任务',
        albumIntro: "简介"
      },

   
      dialogVisiblePlay: false,
    
      Url: '',
      Bool: false,
      onselectstart: '',
  


      // Bool:false
      player: '',
      obj: {},
      tubImg: [],
      common: [],
      pageIndex: 1,
      dialogVisiblePer: false,
      img:'',




    };


  },
  created() {

  },
  methods: {
   
    handleList () {
      // api.getContent('/activity/data')
      this.$http.post(api.getContent('/activity/data'),{ commentId: this.$route.query.commentId}).then( res => {
        console.log(res)
        
        if (res.data.status == 200) {
          // console.log(res.data.data.data[0].activityFileUrl)
          // if (res.data.data.data[0].activityFileUr==''||res.data.data.data[0].activityFileUr==[]) {
          //   this.img = res.data.data.data[0].activityFileUrl[0].file
          // }
        
          console.log(res.data.data.data[0])
          this.tableData = res.data.data.data[0]
          console.log(this.tableData)
          this.tableData.content = this.tableData.content.replace(/\+/,'')
          this.tableData.content = decodeURI(decodeURI(this.tableData.content))
        }
      } )
    }

  },
  mounted() {
    this.handleList()

  },

}
