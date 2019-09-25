export default {
  data() {
    return {
      ruleForm: {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '上架中',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      },
      rules: {
        name: [{
            required: true,
            message: '请输入专辑名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
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
        }]
      },
      dialogVisible: false


    };


  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||'png' || 'jpg' || 'JPG' || 'JPEG' || 'PNG';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
    upload() {
      this.dialogVisible = true
    }




  }
}
