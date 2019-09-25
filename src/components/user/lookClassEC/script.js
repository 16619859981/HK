import api from '../../api/index'

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        classId: '',
      },
      dialogVisible: false,
      value: '',
      rules: {
        name: [{
          required: true,
          message: '请输入班级',
          trigger: 'blur'
        }, ],
      },
      imageUrl: ''
    };


  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||'png' || 'jpg' || 'JPG' || 'JPEG' || 'PNG';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submit() {
      // console.log(this.ruleForm.region)
      // console.log(this.$route.query.id)
      this.ruleForm.classId = this.$route.query.id
      for (var key in this.ruleForm) {
        if (String(this.ruleForm[key]).trim() == '') {
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          })
          return false
        }

      }
      // console.log(this.ruleForm)
      this.$http.post(api.getSchool('/class/updateclass'), this.ruleForm).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          // this.$router.push('/lookclass')
          window.history.go(-1)
        }
      })
    },

    handelDel() {
      // this.$router.push('/lookclass')
      window.history.go(-1)

    }



  }
}
