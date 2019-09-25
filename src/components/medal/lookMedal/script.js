import axios from 'axios'
import api from '../../api/index'
import {
  formatDate
} from '../../../date'
export default {

  data() {
    return {
      ruleForm: {},
      medalImg: [{
        url: "",
        name: "",
      }, {
        url: "",
        name: "",
      }],
      businessId: this.$route.query.id
    }
  },
  created() {
    // this.getParams()s

  },

  methods: {
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/medal/meMedal/medalList'), {
        businessId: this.businessId
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res.data.data) //组织类型
          // if (res.data.data.medal.userType == 1) {
          //   res.data.data.medal.userType = "平台/中少红卡"
          // } else if (res.data.data.medal.userType == 2) {
          //   res.data.data.medal.userType = "学校"
          // } else
          // if (res.data.data.medal.userType == 3) {
          //   res.data.data.medal.userType = "班级 "
          // } else if (res.data.data.medal.userType == 7) {
          //   res.data.data.medal.userType = "红广号/大咖"
          // } else
          // if (res.data.data.medal.userType == 10) {
          //   res.data.data.medal.userType = "基地/少年宫"
          // }
          res.data.data.medal.createTime = formatDate(new Date(res.data.data.medal.createTime), 'yyyy-MM-dd hh:mm');          
          for (var i = 0; i < res.data.data.medalImage.length; i++) {

            res.data.data.medalImage[i].fileUrl = api.getUpload(res.data.data.medalImage[i].fileUrl)
          }
          this.ruleForm = res.data.data.medal
          console.log(this.ruleForm)
          this.medalImg = res.data.data.medalImage
          console.log(this.medalImg)

        }
      })
    },




  },
  mounted() {

    this.renderList()

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }

}
