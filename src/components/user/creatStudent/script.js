import api from '../../api/index'
export default {
  data() {
    return {
      creatStudent: {
        student_name: '',
        student_sex: '',
        class_school_id: this.$route.query.id,
        class_grade: '',
        class_name: '',
        classId: '',
        studentUserId: window.sessionStorage.getItem('id')
      },
      rules: {
        student_name: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur'
        }, ],
        student_sex: [{
          required: true,
          message: '请输入班级名称',
          trigger: 'blur'
        }],
        class_grade: [{
          required: true,
          message: '请输入班级名称',
          trigger: 'blur'
        }],
        class_name: [{
          required: true,
          message: '请输入班级名称',
          trigger: 'blur'
        }],

      },
      imageUrl: ''
    };


  },
  methods: {
    // 创建学生
    submit() {
      // console.log(this.creatStudent)
      this.$http.post(api.getSchool('/student/addstudent'), this.creatStudent).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message({
            message: '创建学生成功',
            type: 'success'
          })
          this.$router.push('/lookClass')

        } else {
          this.$message({
            message: '创建学生失败',
            type: 'error'
          })
        }
        this.creatStudent.student_name = ''
        this.creatStudent.student_sex = ''

        this.$router.push('/schooStudentsList')

      })



    },

    del() {
      this.creatStudent.student_name = ''
      this.creatStudent.student_sex = ''

      this.$router.push('/schooStudentsList')

    }




  },
}
