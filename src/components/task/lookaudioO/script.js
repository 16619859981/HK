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
      id: this.$route.query.id,
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

      mp3: [],
      img: []




    };


  },
  created() {

  },
  methods: {

    handleList() {
      this.$http.post(api.getContent('/medal/data/done'), {
        actionId: this.$route.query.actionId,
        taskId: this.$route.query.taskId
      }).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.tableData = res.data.data.data[0]

          for (var i = 0; i < this.tableData.fileUrls.length; i++) {
            // console.log(this.tableData.fileUrls[i].url.substring(this.tableData.fileUrls[i].url.indexOf('.') + 1))
            if (this.tableData.fileUrls[i].url.substring(this.tableData.fileUrls[i].url.indexOf('.') + 1) == 'mp3') {
              this.mp3.push(this.tableData.fileUrls[i].url)
            } else {
              this.img.push(this.tableData.fileUrls[i].url)
            }
          }
          console.log(this.mp3)
          console.log(this.img)
        }
      })
    }

  },
  mounted() {
    this.handleList()

  },

}
