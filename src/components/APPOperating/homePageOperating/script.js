import api from '../../api/index'
export default {
  data() {

    return {
      feedData: []
       
    }
  },
  created() {},

  methods: {
    getLists(type) {
      this.$router.push({
        path: '/APPoperatingLists',
        query: {
          type: type
        }
      })
    },
    getFeed() {

      this.$http.post(api.getPlatform('/home/recommend/feed')).then(res => {

        if (res.data.status == 200) {
         
          this.feedData = res.data.data
          // console.log(this.feedData.length)
          for (var i = 0; i < this.feedData.length; i++) {
            this.feedData.sort(this.getSort("location"));
            if (this.feedData.length == 1) {

              if (this.feedData[i].location == 1) {
                this.feedData[i]["frontText"] = ""
                this.feedData[i]["nextText"] = "2-100feed流"
              } else if (this.feedData[i].location == 100) {
                this.feedData[i]["frontText"] = "1-99feed流"
                this.feedData[i]["nextText"] = ""
              } else {
                var frontNumber = this.feedData[i].location - 1
                var nextNumber = this.feedData[i].location + 1
                this.feedData[i]["frontText"] = `1-` + frontNumber + `feed流`
                this.feedData[i]["nextText"] = nextNumber + `-100feed流`
              }

            } else {
              if (this.feedData[i].location == 1) {
                this.feedData[i]["frontText"] = ""
                var nextNumber2 = this.feedData[i + 1].location-1
                if (nextNumber2 > 2) {
                  this.feedData[i]["nextText"] = `2-` + nextNumber2 + `feed流`
                } else {
                  this.feedData[i]["nextText"] = ""
                }
                // console.log(nextNumber2)
              } else if (this.feedData[i].location == 100) {
                var frontNumber = this.feedData[i - 1].location+1
                if (frontNumber != 99) {
                  this.feedData[i]["frontText"] = frontNumber + `-99feed流`
                } else {
                  this.feedData[i]["frontText"] = ""
                }
                this.feedData[i]["nextText"] = ""
              } else {     
                // 190528013141075414746
                // 190530013150474546178
                if (i == 0) {
                  var fontNumber = 0
                  var fontNumber2 = this.feedData[i].location - 1
                  var nextNumber = this.feedData[i].location + 1
                  var nextNumber2 = this.feedData[i + 1].location
                  this.feedData[i]["frontText"] = fontNumber + `-` + fontNumber2 + `feed流`
                  this.feedData[i]["nextText"] = nextNumber + `-` + nextNumber2 + `feed流`
             
                } else if (i == this.feedData.length - 1) {
                  var fontNumber =this.feedData[i-1].location + 1
                  var fontNumber2 = this.feedData[i].location - 1
                  var nextNumber = this.feedData[i].location + 1
                  var nextNumber2 = 100
                  this.feedData[i]["frontText"] = fontNumber + `-` + fontNumber2 + `feed流`
                  this.feedData[i]["nextText"] = nextNumber + `-` + nextNumber2 + `feed流`
                } else {

                  var fontNumber = this.feedData[i-1].location+1
                  var fontNumber2 = this.feedData[i].location - 1
                  var nextNumber = this.feedData[i].location +1
                  var nextNumber2 = this.feedData[i + 1].location-1
                  // console.log(fontNumber,fontNumber2,this.feedData[i].location,nextNumber,nextNumber2)
                  if( fontNumber2<fontNumber) {
                    this.feedData[i]["frontText"] = ""
                  }else {
                    this.feedData[i]["frontText"] = fontNumber + `-` + fontNumber2 + `feed流`
                  }
                  if (nextNumber==nextNumber2  ) {
                 
                    this.feedData[i]["nextText"] = nextNumber + `-` + nextNumber2 + `feed流`
                  }else {
                    this.feedData[i]["nextText"] =""
                  }
                 if ( this.feedData[i].frontText == this.feedData[i-1].nextText) {
                  this.feedData[i-1].nextText=""
                  // this.feedData[i].frontText=""

                 }
        

                }
  
              }
       

            }
            // console.log(this.feedData[i])
          

          }
          console.log(this.feedData)
        }
      })

    },
    //排序函数
    getSort(name) {
      return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        } else {
          throw ("error");
        }
      }
    }




  },
  mounted() {
    this.getFeed()

  },
}
