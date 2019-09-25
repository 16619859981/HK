import api from '../../api/index'
export default {
  data() {
    return {
      ruleForm: {
        studentPersonId: '',
        studentName: '',
        studentSex: '',
        studentPhone: ''
      },
      value: 'shanghai',
      rules: {
        name: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur'
        }, ],
        region: [{
          required: true,
          message: '请输入专辑标签',
          trigger: 'blur'
        }],

        desc: [{
          required: true,
          message: '请填写专辑简介',
          trigger: 'blur'
        }],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入联系方式',
          trigger: 'blur'
        }],
        adminAccount: [{
          required: true,
          message: '请输入管理员账号',
          trigger: 'blur'
        }],
        adminPassword: [{
          required: true,
          message: '请输入管理员密码',
          trigger: 'blur'
        }],
        gender: [{
          required: true,
          message: '请选择学生性别',
          trigger: 'blur'
        }],
      },
      imageUrl: ''
    };


  },
  methods: {


    submit() {
      this.ruleForm.studentPersonId = this.$route.query.id
      // console.log(this.ruleForm)
      this.$http.post(api.getSchool('/student/updatestudent'), this.ruleForm).then(res => {
        // console.log(res)
        this.$router.push('/schooStudentsList')
      })


    },

    del() {

      this.$router.push('/schooStudentsList')
    }


  },
  created() {
    // console.log(this.$route.query.id)
  }
}
