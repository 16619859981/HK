import {
  formatDate
} from '../../../date'
import api from '../../api/index'
export default {
  data() {
    return {
      ruleForm: {},


    };


  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      // console.log(file.name.split("."))

      const isLt1M = file.size / 1024 / 1024 < 1;



      const type = file.name.split(".")
      // console.log(type[type.length - 1])
      if (
        type[type.length - 1] == 'bmp' || 
        type[type.length - 1] == 'dib' || 
        type[type.length - 1] == 'jpg' || 
        type[type.length - 1] == 'tif' || 
        type[type.length - 1] == 'png' || 
        type[type.length - 1] == 'tga' || 
        type[type.length - 1] == 'pic' || 
        type[type.length - 1] == 'jpeg'||
        type[type.length - 1] == 'BMP' || 
        type[type.length - 1] == 'DIP' || 
        type[type.length - 1] == 'JPG' || 
        type[type.length - 1] == 'TIF' || 
        type[type.length - 1] == 'PNG' || 
        type[type.length - 1] == 'TGA' || 
        type[type.length - 1] == 'PIC' || 
        type[type.length - 1] == 'JPEG'
      ) {

      } else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }


      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        return false

      }

      var _this = this;
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.onload = function () {
            var width = this.width;
            var height = this.height;
            if (width != height) {
              _this.$message.error('图片宽高必须相等')
              reject();
            }
            // if (height != 360) { 
            //     _this.$message.error('图片宽高必须是360*360')

            //     reject(); 
            // } 
            resolve();
          };
          image.src = event.target.result;
        }
        reader.readAsDataURL(file);
      });

    },
    upload() {
      this.dialogVisible = true
    },


    handleList() {
      this.$http.post(api.getSchool('/person/seeperson'), {
        personId: this.$route.query.id
      }).then(res => {

        

        // console.log(res)
        if (res.data.status == 200) {

              

          // if (res.data.data[0].personType == 6) {
          //   res.data.data[0].personType = '企业'
          // } 
          if (res.data.data[0].personType == 10) {
            res.data.data[0].personType = '基地风采'
          } 
          // else if (res.data.data[0].personType == 5) {
          //   res.data.data[0].personType = '名师'
          // } 
          else if (res.data.data[0].personType == 7) {
            res.data.data[0].personType = '大咖'
            if (res.data.data[0].personSex == 0) {
              res.data.data[0].personSex = '男'
            } else if (res.data.data[0].personSex == 1) {
              res.data.data[0].personSex = '女'
            }
          } 
          // else if (res.data.data[0].personType == 8) {
          //   res.data.data[0].personType = '主播'
          // }
          // res.data.data[0].personPhone = String(res.data.data[0].personPhone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
          this.ruleForm = res.data.data[0]
        }
      })
    }




  },
  mounted() {
    this.handleList()
  }

}
