import axios from 'axios'
import api from '../../api/index'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        school_name: '',
        school_type: '',
        school_area: '',
        school_address: '',
        school_postcode: '',
        school_phone: '',
        school_email: '',
        school_intro: '',

        school_file_id: '',

        user_login_name: '',

        user_pass: '',

        school_user_id: '1',
      },
      value: 'shanghai',
      rules: {
        school_name: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur'
        }, ],

        region: [{
          required: true,
          message: '请输入专辑标签',
          trigger: 'blur'
        }],

        school_intro: [{
          required: true,
          message: '请填写学校简介',
          trigger: 'blur'
        }],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }],
        school_phone: [{
          required: true,
          message: '请输入联系方式',
          trigger: 'blur'
        }],
        user_login_name: [{
          required: true,
          message: '请输入管理员账号',
          trigger: 'blur'
        }],
        user_pas: [{
          required: true,
          message: '请输入管理员密码',
          trigger: 'blur'
        }],
      },
      imageUrl: ''
    };


  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.ruleForm.school_file_id = res.data.fileId
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
    submitSchool() {
      // console.log(this.ruleForm)
      this.ruleForm.user_pass = this.$md5(this.ruleForm.user_pass)
      // console.log(this.ruleForm)
      axios.post(api.getSchool('/school/addschool'), this.ruleForm).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        }
      })
    }




  }
}
