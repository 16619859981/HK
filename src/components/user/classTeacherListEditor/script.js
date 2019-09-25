import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      form: {

      },
    }
  },
  methods: {
    handlueList () {
      this.$http.post(api.getPlatform('/counselor/seeCounselor'), {counselorId : this.$route.query.id }).then(res => {
        if (res.data.status === 200) {
          console.log(res)
          // res.data.data.cTime = formatDate(new Date(Number(res.data.data.cTime)), 'yyyy-MM-dd hh:mm');
          res.data.data.counselorFileUrl = api.getUpload(res.data.data.counselorFileUrl)
          if (res.data.data.counselorSex == 1) {
            res.data.data.counselorSex = '男'
          }else {
            res.data.data.counselorSex = '女'
          }
          for (var i = 0; i < res.data.data.classList.length; i++) {
            switch (res.data.data.classList[i].counselorGrade) {
              case 1:
              res.data.data.classList[i].counselorGrade = '一年级';
              break;
              case 2:
              res.data.data.classList[i].counselorGrade = '二年级';
              break;
              case 3:
              res.data.data.classList[i].counselorGrade = '三年级';
              break;
              case 4:
              res.data.data.classList[i].counselorGrade = '四年级';
              break;
              case 5:
              res.data.data.classList[i].counselorGrade = '五年级';
              break;
              case 6:
              res.data.data.classList[i].counselorGrade = '六年级';
              break;
              case 7:
              res.data.data.classList[i].counselorGrade = '初一';
              break;
              case 8:
              res.data.data.classList[i].counselorGrade = '初二';
              break;
              case 19:
              res.data.data.classList[i].counselorGrade = '初三';
              break;
            }
          }
          this.form = res.data.data
          console.log(this.form)
        }
      })
    },

    goLookTeacherLT () {
      this.$router.push('/lookTeacherLT')
    },

    goSchoolManagement () {
      this.$router.push('/schoolManagement')
    },

    goLookClass () {
      // this.$router.push('/lookClass')
      this.$router.push({
        path: '/lookClass',
        query: {
          id: this.$route.query.id1
        }
      })
    },

    goClassTeacherList () {
      this.$router.push({
        path: '/classTeacherList',
        query: {
          id: this.$route.query.id2
        }
      })
    }

  },
  created () {
    this.handlueList()
  }
}