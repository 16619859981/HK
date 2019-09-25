export default {
    data(){
        return {
            ruleForm: {
              name: '实验小学',
              type: '小学',
              region: '北京市朝阳区',
              address:'就爱上了的卡斯卡里的艰苦拉萨建档立卡是按时间到啦手机打开拉萨觉得阿萨大大',
              postal: 100000,
              phone: 13333333333,
              email: '12312312@163.com',
              profile: '阿萨大大实打实大苏打就ask领导吩咐静安寺按时交付和大数据开发哈萨克积分哈数据库的哈数据库的和按时到货即可按时打卡是',
              
            },
            rules: {
              name: [
                { required: true, message: '请输入专辑名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              region: [
                { required: true, message: '请输入专辑标签', trigger: 'blur' }
              ],
            
              desc: [
                { required: true, message: '请填写专辑简介', trigger: 'blur' }
              ],
              img: [
                { required: true, message: '请上传封面', trigger: 'blur' }
              ]
            },
            dialogVisible: false

                 
          };


    },
    methods:{
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
          upload(){
            this.dialogVisible=true
          }

        
    

    }
}