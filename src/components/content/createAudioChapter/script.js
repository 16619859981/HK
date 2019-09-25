export default {
    data(){
        return {
            ruleForm: {
              name: '',
              region: '',
          
              desc: '',
             
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
            dialogVisible: false,
             imageUrl:''

                 
          };


    },
    methods:{
        //图片上传
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'||'png';
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