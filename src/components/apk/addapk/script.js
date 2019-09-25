import axios from 'axios'
import api from '../../api/index'

export default {

  data() {
    return {
      ruleForm: {
        version: '',
        versionName: '',
        types: '红卡少年',
        type: 1,
        uType: '',
        log: '',
        url: '',
        name: '',
        environment: this.$route.query.environment

      },


      rules: {
        version: [{
          required: true,
          message: '请输入版本号',
          trigger: 'blur'
        }


        ],
        uType: [{
          required: true,
          message: '请选择更新类型',
          trigger: 'blur'
        }
        ],

        log: [{
          required: true,
          message: '请填写更新日志',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 50,
          message: '长度在 3 到 50 个字符',
          trigger: 'blur'
        }
        ],
        url: [{
          required: true,
          message: '请上传安装包',
          trigger: 'blur'
        }]
      },
      imageUrl: '',
      dialogVisible: false,
      categoryId: '',
      label: '',
      dialogVisibleUpload: false,
      fileList: [],



    };


  },


  methods: {
    //上传
    fn(res, file, fileList) {

      this.ruleForm.url = res.data.realUrl;
      this.ruleForm.name = res.data.fileName;


    },


    beforeImageUpload(file) {
      const type = file.name.split(".")

      if (
        type[type.length - 1] == 'apk'
      ) {

      } else {
        this.$message.error('上传格式是apk格式!');
        return false
      }

    },
    upload() {
      this.dialogVisibleUpload = true
    },
    cancel2() {
      this.$refs.upload.clearFiles()
      this.dialogVisibleUpload = false
    },


    //提交按钮

    submit(form) {
      console.log(this.ruleForm)
      if (this.ruleForm.version == "") {
        this.$message.error('请填写版本号')
        return false
      }
      if (this.ruleForm.uType == "") {
        this.$message.error('请选择更新类型')
        return false
      }
      if (this.ruleForm.log == "") {
        this.$message.error('请填写更新日志')
        return false
      }
      if (this.ruleForm.log == "") {
        this.$message.error('请填写更新日志')
        return false
      }
      if (this.ruleForm.log.trim().length < 3 || this.ruleForm.log.trim().length > 50) {
        // alert(2)
        this.$message({
          message: '更新日志长度为3——50字',
          type: 'error'
        })
        return false
      }
      if (this.ruleForm.environment == 1 && this.ruleForm.url == "") {
        this.$message.error('请上传安装包')
        return false


      }
      this.dialogVisible = true

    },
    submitData() {
      axios({
        method: 'post',
        url: api.getPlatform('/package/add'),
        data: this.ruleForm
      }).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: '提交成功',
            type: 'success'

          })

          this.dialogVisible = false
          this.$refs['ruleForm'].resetFields()

          this.$router.push(window.history.go(-1))
        }
      })

    },
    //取消按钮
    cancel() {
      this.$router.push(window.history.go(-1))
    },






  },
  mounted() {



  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }

}
