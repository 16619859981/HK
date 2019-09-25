export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',

        desc: ''
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
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },




  }
}
