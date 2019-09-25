export default {
    data(){
        return {
            ruleForm: {
              title: 'banner标题名称',
              pages: '广播',
              linkType:'H5',
              link:'http://www.baidu.com',
              name:'赵大宝',
              createTime: '2019-09-09',
              imageUrl:'/static/logo.png',
            },
            rules: {
                title: [
                  { required: true, message: '请输入banner标题', trigger: 'blur' },
                //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                pages: [
                  { required: true, message: '请输入使用的页面', trigger: 'blur' }
                ],
              
                linkType: [
                  { required: true, message: '请输入链接类型', trigger: 'blur' }
                ],
                link: [
                  { required: true, message: '请输入链接', trigger: 'blur' }
                ],
                name:[
                  {required:true,meaasge:'请输入创建人姓名',trigger:'blur'}
                ]
               
  
  
  
              },
              

                 
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
            if (!isLt1M) {
              this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isJPG && isLt1M;
          },
     
        
    

    }
}