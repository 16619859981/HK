import axios from 'axios'
import api from '../api/index'



let Base64 = require('js-base64').Base64;
export default {
  data() {
    var Tel = (rule, value, callback) => {
      //          console.log(String(value).length)
      if (!value) {
        return callback(new Error('电话不能为空'));
      }
      setTimeout(() => {
        if (!Number(value)) {
          callback(new Error('请输入数字'));
        } else {
          if (!(/^((0\d{2,3}\d{7,8})|(1[23546789]\d{9}))$/.test(value))) {

            callback(new Error('请输入正确联系方式'));
          } else {
            callback();

          }

        }
      }, 0);
    };
    return {
      loginTitle:"中少红卡后台登录",
      dialogVisible:true,
      loginForm: {
        username: '',
        password: '',
        code: '',
        vtoken: '',
        mCode: ''
      },
      d: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
      },
      Form: {
        mobile: '',
        code: '',
        password: '',
        password1: '',
      },
      sendPhoneMobile: {
        mobile: '',
      },
      form1: {
        mobile: '',
        code: '',
        password: '',
      },
      checked: false,
      bool: 0,
      imgUrl: '',
      loginFormRule: {
        a: [{
          required: true,
          validator: Tel,
          trigger: 'blur'
        },],
        b: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        c: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        d: [{
          required: true,
          message: '请输入手机验证码',
          trigger: 'blur'
        }],

      },

      FormRule: {
        mobile: [{
          required: true,
          validator: Tel,
          trigger: 'change'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'change'
        }],
        password1: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'change'
        }]
      },

      content: '发送验证码',
      totalTime: 60,
      canClick: true
    }
  },





  methods: {


    handleLogin(formName) {
      // console.log(1)
      // 保存的账号
      var name = this.d.a;
      //保存的密码
      var pass = this.d.b;
      if (this.checked == true && this.d.a != '' && this.d.b != '') {
        //传入账号名，密码，和保存天数3个参数
        this.setCookie(name, pass, 7);
      }


      this.$refs[formName].validate((valid) => {

        // console.log(this.loginForm)
        if (valid) {
          this.loginForm.account   = this.d.a
          this.loginForm.password = this.d.b
          this.loginForm.code = this.d.c
          this.loginForm.verifyCode = this.d.d
          this.loginForm.platformType = 1

          this.loginForm.password = this.$md5(this.$md5(this.loginForm.password) + 'hongka')
          window.sessionStorage.setItem('mobile', this.loginForm.username)
          delete this.loginForm.mCode,
          delete this.loginForm.code,
          delete this.loginForm.vtoken
          delete this.loginForm.username
          console.log(this.loginForm)
          // this.clearCookie()
          this.$http.post(api.getPlatform('/platformLogin'), this.loginForm,

          )

            .then(res => {

              console.log(res);
              if (res.data.status == 200) {
                window.sessionStorage.setItem('orgType', res.data.data.orgType)
                window.sessionStorage.setItem('token', res.data.data.token)
                window.sessionStorage.setItem('orgIntro', res.data.data.intro)
                window.sessionStorage.setItem('id', res.data.data.id)
                window.sessionStorage.setItem('orgid', res.data.data.orgid)
                window.sessionStorage.setItem('name', res.data.data.nickname)
                window.sessionStorage.setItem('fileUrl', res.data.data.avatarUrl)
                window.sessionStorage.setItem('account', this.loginForm.account )


                //设置新版管理后台的cookie
                const expireHours = 24 * 7;
                const exdate = new Date();
                exdate.setHours(exdate.getHours() + expireHours);
                document.cookie = `token=${escape(res.data.data.token)};expires=${exdate.toGMTString()};domain=${window.location.host};path=/`;

                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.d.c = ''
                this.$router.push('/homePage')
              } else if (res.data.status == 1401) {
                this.$message.error(res.data.msg);
                this.d.b = ''
                this.d.c = ''
                this.d.d = ''
                this.loginForm.vtoken = ''
                this.yanzhengma()
              } else if (res.data.status == 1402) {
                this.$message.error(res.data.msg);
                this.d.c = ''
                this.d.d = ''
                this.loginForm.vtoken = ''
                this.yanzhengma()
              } else if (res.data.status == 1410) {
                this.$message.error(res.data.msg);
                this.d.d = ''
                this.yanzhengma()
              } else {
                this.$message.error(res.data.msg);
                this.d.a = ''
                this.d.b = ''
                this.d.c = ''
                this.d.d = ''
                this.loginForm.vtoken = ''
                this.yanzhengma()
              }
            })
        }

      })

    },

    handle(Form) {
      if (this.Form.password != this.Form.password1) {
        this.$message.error('两次密码不一致')
        this.Form.password = ''
        this.Form.password1 = ''
        return false
      }
      // delete this.Form.password1

      this.form1.mobile = this.Form.mobile
      this.form1.code = this.Form.code
      this.form1.password = this.Form.password
      this.form1.password = this.$md5(this.$md5(this.form1.password) + 'hongka')
      console.log(this.form1)
      this.$http.post(api.getPlatform('/resetpass'), this.form1).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.$message.success('修改成功！')
          this.Form.password = ''
          this.Form.mobile = ''
          this.Form.code = ''
          this.Form.password1 = ''
          this.bool = 0
        } else if (res.data.status == 1403) {
          this.$message.error(res.data.msg)
          this.Form.code = ''
        } else {
          this.$message.error(res.data.msg)
          this.Form.mobile = ''
          this.Form.code = ''
          this.Form.password = ''
          this.Form.password1 = ''
        }
      })

    },


    chongzhi() {
      this.bool++
    },


    fanhui() {
      this.bool = 0
    },

    yanzhengma() {


      this.$http.post(api.getPlatform('/getImage')).then(res => {
        // console.log(res)
        this.imgUrl = 'data:image/jpeg;base64,' + res.data.data.img;
        this.loginForm.vtoken = res.data.data.vtoken
        // console.log(this.loginForm.vtoken)
      })
    },

    kanbuqing() {
      this.yanzhengma()


    },


    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      // console.log(Base64.encode(c_pwd))
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userName1" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "userPwd1" + "=" + Base64.encode(c_pwd) + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName1') {
            this.d.a = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'userPwd1') {
            this.d.b = Base64.decode(arr2[1]);
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },

    sendPhone() {
      var re = /^1\d{10}$/
      if (this.d.d == '') {
        this.$message.error('请输入手机号!')
        return false
      }
      if (re.test(this.d.d)) {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) { //当倒计时小于0时清除定时器
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 10
            this.canClick = true
          }
        }, 1000)
        this.sjyzm()
      } else {
        this.$message.error('请输入手机号!')
        return false
      }
    },

    // PhoneCode() {
    //   this.$http.post(api.getPlatform('getmsg'),{ mobile: this.d.d }).then(res => {
    //     console.log(res)
    //     if (res.data.status == 200) {
    //       // var span=document.getElementById('let');
    //       // var left= span.innerText - 1;
    //       // this.$message.success('请查看手机验证码')
    //       // var yanzhengma = document.getElementsByClassName('yanzheng')[0]
    //       // yanzhengma.innerHTML = '重新获取验证码'
    //     } else {
    //       this.$message.error(res.data.msg)
    //       this.d.d = ''
    //     }



    //   })
    // }


    huoquyzm() {
      var re = /^1\d{10}$/
      if (this.d.a == '') {
        this.$message.error('请输入手机号')
        return false
      }
      if (re.test(this.d.a) == false) {
        this.$message.error('请输入正确的手机号')
        return false
      } else {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) { //当倒计时小于0时清除定时器
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true
          }
        }, 1000)
        this.sjyzm()
      }


    },


    sjyzm() {
      this.$http.post(api.getPlatform('/getVerifyCode'), {
        loginCode: this.d.a
      }).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          // var span=document.getElementById('let');
          // var left= span.innerText - 1;
          // this.$message.success('请查看手机验证码')
          // var yanzhengma = document.getElementsByClassName('yanzheng')[0]
          // yanzhengma.innerHTML = '重新获取验证码'
        } else {
          this.$message.error(res.data.msg)
          this.d.d = ''
        }



      })
    },
    down() {
      console.log('123')
      window.open("http://www.mydown.com/soft/421/472030921.shtml")
      // window.location.href="http://www.mydown.com/soft/421/472030921.shtml"
    },
    getLoginTitle() {
      this.$http.post(api.getPlatform('/api/system/info'), {
        "platform":"admin"
      }).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.loginTitle = res.data.data.name
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }

  },
  created() {
    // this.yanzhengma()
    this.getCookie()
    this.getLoginTitle()


  },
  computed: {
    isShowChromeTip() {

      const USER_AGENT = navigator.userAgent.toLowerCase()
      const isChrome = /.*(chrome)\/([\w.]+).*/
      console.log(isChrome.test(USER_AGENT))

      return !isChrome.test(USER_AGENT)
      // return true

    }
  },

  mounted: function() {

    // console.log(this.$md5(this.$md5("hongka1018")+"hongka"))
    var SEPARATION = 100,
      AMOUNTX = 50,
      AMOUNTY = 50;
    var container, stats;
    var camera, scene, renderer;
    var particles, particle, count = 0;
    var mouseX = 0,
      mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    // init();
    // animate();

    function init() {
      container = document.createElement('div');

      // console.log(document.getElementById('bannerBgc'))
      document.getElementById('bannerBgc').appendChild(container);
      // document.body.appendChild( container );
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene = new THREE.Scene();
      particles = new Array();
      var Tau = Math.PI * 2;
      var material = new THREE.SpriteCanvasMaterial({
        color: 0xffffff, // 球色
        // color:0xFF081D47,
        program: function(context) {
          context.beginPath();
          context.arc(0, 0, 0.5, 0, Tau, true)//球的形状
          context.fill();
        }
      });
      var i = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.Sprite(material);
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
          scene.add(particle);
        }
      }
      renderer = new THREE.CanvasRenderer();
      renderer.setClearColor(0x141D4F, 1) // 设置背景色
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      // stats = new Stats();
      // container.appendChild( stats.dom );
      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
      document.addEventListener('touchmove', onDocumentTouchMove, false);
      //
      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    }

    function onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    }
    //
    function animate() {
      if (window.sessionStorage.getItem('token')) {
        return
      }
      requestAnimationFrame(animate);
      render();
      // stats.update();
    }

    function render() {
      camera.position.x += (mouseX - camera.position.x) * .05;
      // camera.position.y += ( - mouseY - camera.position.y ) * .05;
      camera.position.y = 364;
      camera.lookAt(scene.position);
      var i = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
            (Math.sin((iy + count) * 0.5) * 50);
          particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
            (Math.sin((iy + count) * 0.5) + 1) * 4;
        }
      }
      renderer.render(scene, camera);
      count += 0.1;
    }
  },

}
