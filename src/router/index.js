import Vue from 'vue'
import Router from 'vue-router'
import VueUeditorWrap from 'vue-ueditor-wrap'

const Login = resolve => require(['@/components/login/login.vue'], resolve)
const Home = resolve => require(['@/components/home/home.vue'], resolve)
// 首页
const homePage = resolve => require(['@/components/homePage'], resolve)
// 专辑管理
const albumManagement = resolve => require(['@/components/content/albumManagement/albumManagement.vue'], resolve)
// 创建专辑
const createAlbum = resolve => require(['@/components/content/createAlbum'], resolve)
//查看专辑
const albumLook = resolve => require(['@/components/content/albumLook'], resolve)
//编辑专辑
const albumEdit = resolve => require(['@/components/content/albumEdit'], resolve)
// 创建音频
const createAudio = resolve => require(['@/components/content/createAudio'], resolve)
// 创建音频节目
const createAudioProgram = resolve => require(['@/components/content/createAudioProgram'], resolve)
// 创建视频
const createVideo = resolve => require(['@/components/content/createVideo'], resolve)
// 创建视频节目
const createVideoProgram = resolve => require(['@/components/content/createVideoProgram'], resolve)
// 专辑审核
const albumReview = resolve => require(['@/components/content/albumReview/albumReview.vue'], resolve)
const historyLook = resolve => require(['@/components/content/historyLook'], resolve)
// 音视频审核
const VAReview = resolve => require(['@/components/content/VAReview'], resolve)
//音视频审核历史记录
const albumLookProgram = resolve => require(['@/components/content/albumLookProgram'], resolve)
// 审核历史记录
const checkHistory = resolve => require(['@/components/content/checkHistory'], resolve)
const checkHistoryProgram = resolve => require(['@/components/content/checkHistoryProgram'], resolve)
//争章管理
const chapterManagement = resolve => require(['@/components/content/chapterManagement'], resolve)
// 创建争章
const createChapter = resolve => require(['@/components/content/createChapter'], resolve)
// 查看争章
const chapterLook = resolve => require(['@/components/content/chapterLook'], resolve)
// 编辑争章
const chapterEdit = resolve => require(['@/components/content/chapterEdit'], resolve)
//获取人数
const getNumber = resolve => require(['@/components/content/getNumber'], resolve)
//创建音频争章
const createAudioChapter = resolve => require(['@/components/content/createAudioChapter'], resolve)
//创建视频争章
const createVideoChapter = resolve => require(['@/components/content/createVideoChapter'], resolve)
// 运营组件引入
//App-推荐页
const apprecom = resolve => require(['@/components/operating/apprecom'], resolve)
//编辑模板
const editModel = resolve => require(['@/components/operating/editModel'], resolve)
//App-Banner
const appBanner = resolve => require(['@/components/operating/appBanner'], resolve)
//App-Banner-历史记录
const uploadHistory = resolve => require(['@/components/operating/uploadHistory'], resolve)
//创建banner
const createBanner = resolve => require(['@/components/operating/createBanner'], resolve)
//编辑banner信息
const appBannerEdit = resolve => require(['@/components/operating/appBannerEdit'], resolve)
//App学堂页
const appSchool = resolve => require(['@/components/operating/appSchool'], resolve)
//App学堂页-热门学堂
const hotSchool = resolve => require(['@/components/operating/hotSchool'], resolve)
//App学堂页-大V讲师
const VTeacher = resolve => require(['@/components/operating/VTeacher'], resolve)
//App活动页
const appActive = resolve => require(['@/components/operating/appActive'], resolve)
//专题活动页
const thematicActive = resolve => require(['@/components/operating/thematicActive'], resolve)
const activeMagData = resolve => require(['@/components/operating/activeMagData'], resolve)
//活动管理
const activeManagement = resolve => require(['@/components/operating/activeManagement'], resolve)
//查看活动
const lookPic = resolve => require(['@/components/operating/lookPic'], resolve)
const lookVoice = resolve => require(['@/components/operating/lookVoice'], resolve)
const lookVote = resolve => require(['@/components/operating/lookVote'], resolve)
//编辑活动
const editPic = resolve => require(['@/components/operating/editPic'], resolve)
const editVoice = resolve => require(['@/components/operating/editVoice'], resolve)
const editVote = resolve => require(['@/components/operating/editVote'], resolve)
//创建活动
const createActive = resolve => require(['@/components/operating/createActive'], resolve)
//创建图文活动
const createPic = resolve => require(['@/components/operating/createPic'], resolve)
//创建语音活动
const createVoice = resolve => require(['@/components/operating/createVoice'], resolve)
//创建投票活动
const createVote = resolve => require(['@/components/operating/createVote'], resolve)
//活动数据
const activeDataPic = resolve => require(['@/components/operating/activeDataPic'], resolve)
const activeDataVoice = resolve => require(['@/components/operating/activeDataVoice'], resolve)
const activeDataVote = resolve => require(['@/components/operating/activeDataVote'], resolve)
const graphic = resolve => require(['@/components/operating/graphic'], resolve)
const lookDataPic = resolve => require(['@/components/operating/lookDataPic'], resolve)
//活动审核
const activeCheck = resolve => require(['@/components/operating/activeCheck'], resolve)
//审核图文
const checkPic = resolve => require(['@/components/operating/checkPic'], resolve)
//审核语音
const checkVoice = resolve => require(['@/components/operating/checkVoice'], resolve)
//审核投票
const checkVote = resolve => require(['@/components/operating/checkVote'], resolve)
//审核历史记录
const activeHistory = resolve => require(['@/components/operating/activeHistory'], resolve)
//专题管理
const themeManagement = resolve => require(['@/components/operating/themeManagement'], resolve)
//专题查看
const voteActiveLook = resolve => require(['@/components/operating/voteActiveLook'], resolve)
//专题编辑
const voteActiveEdit = resolve => require(['@/components/operating/voteActiveEdit'], resolve)
//专题投票活动
const createVoteActive = resolve => require(['@/components/operating/createVoteActive'], resolve)
// --------------------------------------------------------------------------------------------------
// 用户管理组件引入
//创建学校
const creatSchool = resolve => require(['@/components/user/creatSchool'], resolve)
//学校管理
const schoolManagement = resolve => require(['@/components/user/schoolManagement'], resolve)
// 查看学校
const lookSchool = resolve => require(['@/components/user/lookSchool'], resolve)
// 编辑学校
const editorSchool = resolve => require(['@/components/user/editorSchool'], resolve)
// 查看班级
const lookClass = resolve => require(['@/components/user/lookClass'], resolve)
// 创建班级
const creatClass = resolve => require(['@/components/user/creatClass'], resolve)
// 创建班级里面的查看按钮跳转页面
const creatClassLookClass = resolve => require(['@/components/user/creatClassLookClass'], resolve)
// 创建班级里面的编辑按钮跳转页面
const creatClassEditorClass = resolve => require(['@/components/user/creatClassEditorClass'], resolve)
// 全部老师
const lookTeacher = resolve => require(['@/components/user/lookTeacher'], resolve)
// 全部老师里面的查看
const lookTeacherLT = resolve => require(['@/components/user/lookTeacherLT'], resolve)
// 全部家长
const lookParents = resolve => require(['@/components/user/lookParents'], resolve)
// 全部家长里面的查看
const lookParentsLP = resolve => require(['@/components/user/lookParentsLP'], resolve)
// 全部学生
const lookStudents = resolve => require(['@/components/user/lookStudents'], resolve)
// 教师角色
const lookRole = resolve => require(['@/components/user/lookRole'], resolve)
// 全部学生里面的查看
const lookStudentsLS = resolve => require(['@/components/user/lookStudentsLS'], resolve)
// 班级界面的编辑班级
const lookClassEC = resolve => require(['@/components/user/lookClassEC'], resolve)
// 班级里的老师列表
const classTeacherList = resolve => require(['@/components/user/classTeacherList'], resolve)
// 班级里的老师列表的查看
const classTeacherListLook = resolve => require(['@/components/user/classTeacherListLook'], resolve)
// 班级里老师列表的编辑
const classTeacherListEditor = resolve => require(['@/components/user/classTeacherListEditor'], resolve)
//  班级里的学生列表
const classStudentsList = resolve => require(['@/components/user/classStudentsList'], resolve)
// 班级里的学生列表的查看
const classStudentsListLook = resolve => require(['@/components/user/classStudentsListLook'], resolve)
// 班级里的学生列表的编辑
const classStudentsListEditor = resolve => require(['@/components/user/classStudentsListEditor'], resolve)
// 班级里面的家长列表
const classParentsList = resolve => require(['@/components/user/classParentsList'], resolve)
// 班级里面家长列表里的查看
const classParentsListLook = resolve => require(['@/components/user/classParentsListLook'], resolve)
// 班级里面家长列表里的编辑
const classParentsListEditor = resolve => require(['@/components/user/classParentsListEditor'], resolve)
// 班级里面的申请入班列表
const classApplyFor = resolve => require(['@/components/user/classApplyFor'], resolve)
// 学校里的老师列表
const schoolTeacherList = resolve => require(['@/components/user/schoolTeacherList'], resolve)
// 学校里的老师列表里的查看
const schoolTeacherListLook = resolve => require(['@/components/user/schoolTeacherListLook'], resolve)
// 学校里的老师列表里的编辑
const schoolTeacherListEditor = resolve => require(['@/components/user/schoolTeacherListEditor'], resolve)
// 学校里的学生列表
const schooStudentsList = resolve => require(['@/components/user/schooStudentsList'], resolve)
// 学校里的学生列表里的查看
const schooStudentsListEditor = resolve => require(['@/components/user/schooStudentsListEditor'], resolve)
// 学校里的学生列表里的编辑
const schooStudentsListLook = resolve => require(['@/components/user/schooStudentsListLook'], resolve)
// 学校里的家长列表
const schoolParentsList = resolve => require(['@/components/user/schoolParentsList'], resolve)
// 学校里的家长列表里的查看
const schoolParentsListLook = resolve => require(['@/components/user/schoolParentsListLook'], resolve)
// 学校里的家长列表里的编辑
const schoolParentsListEditor = resolve => require(['@/components/user/schoolParentsListEditor'], resolve)
// 学校里的查看专辑列表
const schoolAlbum = resolve => require(['@/components/user/schoolAlbum'], resolve)
// 学校里的查看专辑列表里的查看
const schoolAlbumLook = resolve => require(['@/components/user/schoolAlbumLook'], resolve)
// 企业管理列表
const enterprise = resolve => require(['@/components/user/enterprise'], resolve)
// 企业管理列表的查看
const enterpriseLook = resolve => require(['@/components/user/enterpriseLook'], resolve)
// 企业管理列表的编辑
const enterpriseEditor = resolve => require(['@/components/user/enterpriseEditor'], resolve)
// 企业管理的专辑
const enterpriseAlbum = resolve => require(['@/components/user/enterpriseAlbum'], resolve)
// 企业列表的创建企业
const creatEnterprise = resolve => require(['@/components/user/creatEnterprise'], resolve)
// 平台用户列表
const platform = resolve => require(['@/components/user/platform'], resolve)
// 平台用户列表创建用户
const creatPlatform = resolve => require(['@/components/user/creatPlatform'], resolve)
// 平台用户列表的查看
const platformLook = resolve => require(['@/components/user/platformLook'], resolve)
// 平台用户列表的编辑
const platformEditor = resolve => require(['@/components/user/platformEditor'], resolve)
// 平台用户的专辑列表
const platformAlbum = resolve => require(['@/components/user/platformAlbum'], resolve)
// 用户认证
const authentication = resolve => require(['@/components/user/authentication'], resolve)
// 用户认证的认证记录
const authenticationRecord = resolve => require(['@/components/user/authenticationRecord'], resolve)
// 用户认证列表的查看
const authenticationLook = resolve => require(['@/components/user/authenticationLook'], resolve)
// --------------------------------------------------------------------------------------------------
// 硬件组件引入
//硬件入库
const HardwareInventory = resolve => require(['@/components/hardware/HardwareInventory'], resolve)
//硬件列表
const hardwareList = resolve => require(['@/components/hardware/hardwareList'], resolve)
//硬件出库
const HardwareOut = resolve => require(['@/components/hardware/HardwareOut'], resolve)
//硬件入库明细
const HardwareInventoryMX = resolve => require(['@/components/hardware/HardwareInventoryMX'], resolve)
//硬件解绑
const HardwareUnbind = resolve => require(['@/components/hardware/HardwareUnbind'], resolve)
// --------------------------------------------------------------------------------------------------
// 权限管理组件引入
// 公司后台
const companyAdmin = resolve => require(['@/components/permissions/companyAdmin'], resolve)
// 公司后台创建员工
const companyAdminCreat = resolve => require(['@/components/permissions/companyAdminCreat'], resolve)
// 内容后台
const contentAdmin = resolve => require(['@/components/permissions/contentAdmin'], resolve)
// 学校后台
const schoolAdmin = resolve => require(['@/components/permissions/schoolAdmin'], resolve)
// 学校后台
const schoolAdminCreat = resolve => require(['@/components/permissions/schoolAdminCreat'], resolve)
// 公司后台的查看
const companyAdminLook = resolve => require(['@/components/permissions/companyAdminLook'], resolve)
// 公司后台的编辑
const companyAdminEdit = resolve => require(['@/components/permissions/companyAdminEdit'], resolve)
// 学校后台的查看
const schoolAdminLook = resolve => require(['@/components/permissions/schoolAdminLook'], resolve)
// 学校后台的编辑
const schoolAdminEdit = resolve => require(['@/components/permissions/schoolAdminEdit'], resolve)
// 内容平台的创建
const contentAdminCreat = resolve => require(['@/components/permissions/contentAdminCreat'], resolve)
// 内容平台的查看
const contentAdminLook = resolve => require(['@/components/permissions/contentAdminLook'], resolve)
// 内容平台的编辑
const contentAdminEdit = resolve => require(['@/components/permissions/contentAdminEdit'], resolve)
// ---------------------------------------------------------------------------
// 任务
// 任务列表
const taskList = resolve => require(['@/components/task/taskList'], resolve)
// 创建任务
const creatTask = resolve => require(['@/components/task/creatTask'], resolve)
// 创建阅读任务
const creatR = resolve => require(['@/components/task/creatR'], resolve)
// 创建完成任务
const creatO = resolve => require(['@/components/task/creatO'], resolve)
// 阅读任务列表
const readTask = resolve => require(['@/components/task/readTask'], resolve)
// 完成任务列表
const taskOver = resolve => require(['@/components/task/taskOver'], resolve)
//查看任务列表
const lookaudioR = resolve => require(['@/components/task/lookaudioR'], resolve)
const lookaudioO = resolve => require(['@/components/task/lookaudioO'], resolve)
const lookPicO = resolve => require(['@/components/task/lookPicO'], resolve)
// 通知管理--------------------------------------------------------------------------------------------------
const APPPush = resolve => require(['@/components/msg/APPPush'], resolve)
//创建通知
const createPush = resolve => require(['@/components/msg/createPush'], resolve)
//查看数据
const lookPush = resolve => require(['@/components/msg/lookPush'], resolve)
//创建通知列表
const msgList = resolve => require(['@/components/msg/msgList'], resolve)
//创建通知
const createmsg = resolve => require(['@/components/msg/createmsg'], resolve)
//查看数据
const lookMsgData = resolve => require(['@/components/msg/lookMsgData'], resolve)
//查看
const lookmsg = resolve => require(['@/components/msg/lookmsg'], resolve)
//安装包管理
//安装包列表
const apklist = resolve => require(['@/components/apk/apklist'], resolve)
const iosapklist = resolve => require(['@/components/apk/iosapklist'], resolve)
//新增安装包
const addapk = resolve => require(['@/components/apk/addapk'], resolve)
const lookapk = resolve => require(['@/components/apk/lookapk'], resolve)

const look = resolve => require(['@/components/report/look'], resolve)
const lookHistory = resolve => require(['@/components/report/lookHistory'], resolve)
const reportHistory = resolve => require(['@/components/report/reportHistory'], resolve)
const reportList = resolve => require(['@/components/report/reportList'], resolve)


//编辑
// import creatO from '@/components/task/creatO'
const editO = resolve => require(['@/components/task/editO'], resolve)
//奖章

const medalList = resolve => require(['@/components/medal/medalList'], resolve)
const medalData = resolve => require(['@/components/medal/medalData'], resolve)
const lookMedal = resolve => require(['@/components/medal/lookMedal'], resolve)
const creatMedal = resolve => require(['@/components/medal/creatMedal'], resolve)
const editMedal = resolve => require(['@/components/medal/editMedal'], resolve)

//小信封
const commentlist = resolve => require(['@/components/comments/commentlist'], resolve)
const commentDetail = resolve => require(['@/components/comments/commentDetail'], resolve)
const reply = resolve => require(['@/components/comments/reply'], resolve)


//专辑精选
const selected = resolve => require(['@/components/content/selected'], resolve)

//意见反馈
const feedlist = resolve => require(['@/components/feedback/feedlist'], resolve)
const lookfeed = resolve => require(['@/components/feedback/lookfeed'], resolve)


/**
 * *************************** 新版管理后台 ***************************
 * */

//活动
const template = resolve => require(['@/components/nextAdmin/activity/template'], resolve)
const templateCreate = resolve => require(['@/components/nextAdmin/activity/templateCreate'], resolve)
const activity = resolve => require(['@/components/nextAdmin/activity/activity'], resolve)
const activityCreate = resolve => require(['@/components/nextAdmin/activity/activityCreate'], resolve)
const accountUser = resolve => require(['@/components/nextAdmin/account/user'], resolve)
const accountOrg = resolve => require(['@/components/nextAdmin/account/org'], resolve)
const accountRole = resolve => require(['@/components/nextAdmin/account/role'], resolve)

//账户

/**
 * *************************** 新版管理后台 ***************************
 * */

// 运营管理
const homePageOperating = resolve => require(['@/components/APPOperating/homePageOperating'], resolve)
const APPoperatingLists = resolve => require(['@/components/APPoperating/APPoperatingLists'], resolve)
const createOperating = resolve => require(['@/components/APPoperating/createOperating'], resolve)
const historyApp = resolve => require(['@/components/APPoperating/historyApp'], resolve)
const lookApp = resolve => require(['@/components/APPoperating/lookApp'], resolve)


Vue.use(Router)
Vue.use(VueUeditorWrap)
const router = new Router({
  mode: "history",
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/albumManagement',
      component: albumManagement
    },
      {
        path: '/albumLook',
        component: albumLook
      },
      {
        path: '/albumEdit',
        component: albumEdit

      },
      {
        path: '/createAlbum',
        component: createAlbum
      },
      {
        path: '/homePage',
        component: homePage
      },
      {
        path: '/createAudio',
        component: createAudio
      },
      {
        path: '/createVideo',
        component: createVideo
      },
      {
        path: '/createAudioProgram',
        component: createAudioProgram
      }, {
        path: '/createVideoProgram',
        component: createVideoProgram
      },
      {
        path: '/albumReview',
        component: albumReview
      },
      {
        path: '/VAReview',
        component: VAReview
      },
      {
        path: '/checkHistory',
        component: checkHistory
      },
      {
        path: '/historyLook',
        component: historyLook
      },
      {
        path: '/checkHistoryProgram',
        component: checkHistoryProgram
      },
      {
        path: '/albumLookProgram',
        component: albumLookProgram
      },
      // {
      //   path: '/chapterManagement',
      //   component: chapterManagement
      // },
      // {
      //   path: '/createChapter',
      //   component: createChapter
      // },
      // {
      //   path: '/chapterLook',
      //   component: chapterLook
      // },
      // {
      //   path: '/chapterEdit',
      //   component: chapterEdit
      // },
      // {
      //   path: '/createAudioChapter',
      //   component: createAudioChapter
      // },
      // {
      //   path: '/createVideoChapter',
      //   component: createVideoChapter
      // },
      {
        path: '/getNumber',
        component: getNumber
      },
      // 运营组件
      // {
      //   path: '/apprecom',
      //   component: apprecom
      // },
      // {
      //   path: '/editModel',
      //   component: editModel
      // },
      // {
      //   path: '/appBanner',
      //   component: appBanner
      // },
      // {
      //   path: '/uploadHistory',
      //   component: uploadHistory
      // },
      // {
      //   path: '/createBanner',
      //   component: createBanner
      // },
      // {
      //   path: '/appBannerEdit',
      //   component: appBannerEdit
      // },
      // {
      //   path: '/appSchool',
      //   component: appSchool
      // },
      // {
      //   path: '/hotSchool',
      //   component: hotSchool
      // },
      // {
      //   path: '/VTeacher',
      //   component: VTeacher
      // },
      // {
      //   path: '/appActive',
      //   component: appActive
      // },
      // {
      //   path: '/thematicActive',
      //   component: thematicActive
      // },

      {
        path: '/activeManagement',
        component: activeManagement
      },
      {
        path: '/lookPic',
        component: lookPic
      },
      {
        path: '/lookVoice',
        component: lookVoice

      },
      {
        path: '/lookVote',
        component: lookVote
      },
      {
        path: '/editPic',
        component: editPic
      },
      {
        path: '/editVoice',
        component: editVoice

      },
      {
        path: '/editVote',
        component: editVote
      },
      {
        path: '/createActive',
        component: createActive
      },
      {
        path: '/createPic',
        component: createPic
      },
      {
        path: '/createVoice',
        component: createVoice
      },
      {
        path: '/createVote',
        component: createVote
      },
      {
        path: '/activeDataPic',
        component: activeDataPic
      },
      {
        path: '/activeDataVoice',
        component: activeDataVoice
      },
      {
        path: '/activeDataVote',
        component: activeDataVote
      },
      {
        path: '/graphic',
        component: graphic
      },
      {
        path: 'activeCheck',
        component: activeCheck
      },
      {
        path: 'activeHistory',
        component: activeHistory
      },
      // {
      //   path: 'themeManagement',
      //   component: activeFeatured
      // },
      {
        path: 'activeMagData',
        component: activeMagData
      },
      {
        path: 'createVoteActive',
        component: createVoteActive
      },
      {
        path: 'voteActiveLook',
        component: voteActiveLook
      },
      {
        path: 'voteActiveEdit',
        component: voteActiveEdit
      },
      {
        path: 'checkPic',
        component: checkPic
      }, {
        path: 'checkVote',
        component: checkVote
      }, {
        path: 'checkVoice',
        component: checkVoice
      },
      {
        path: 'lookDataPic',
        component: lookDataPic
      },
      // 硬件组件
      {
        path: '/HardwareInventory',
        component: HardwareInventory

      },
      {
        path: '/hardwareList',
        component: hardwareList
      },
      {
        path: '/HardwareOut',
        component: HardwareOut
      },
      {
        path: '/HardwareUnbind',
        component: HardwareUnbind
      },
      {
        path: '/HardwareInventoryMX',
        component: HardwareInventoryMX
      },
      // 用户组件
      {
        path: '/creatSchool',
        component: creatSchool
      },
      {
        path: '/schoolManagement',
        component: schoolManagement
      },
      {
        path: '/lookSchool',
        component: lookSchool
      },
      {
        path: '/editorSchool',
        component: editorSchool
      },
      {
        path: '/lookClass',
        component: lookClass
      },
      {
        path: '/creatClass',
        component: creatClass
      },
      {
        path: '/creatClassLookClass',
        component: creatClassLookClass
      },
      {
        path: '/creatClassEditorClass',
        component: creatClassEditorClass
      },
      {
        path: '/lookTeacher',
        component: lookTeacher
      },
      {
        path: '/lookTeacherLT',
        component: lookTeacherLT
      },
      {
        path: '/lookParents',
        component: lookParents
      },
      {
        path: '/lookParentsLP',
        component: lookParentsLP
      },
      {
        path: '/lookStudents',
        component: lookStudents
      },
      {
        path: '/lookStudentsLS',
        component: lookStudentsLS
      },
      {
        path: '/lookClassEC',
        component: lookClassEC
      },
      {
        path: '/classTeacherList',
        component: classTeacherList
      },
      {
        path: '/classTeacherListLook',
        component: classTeacherListLook
      },
      {
        path: '/classStudentsList',
        component: classStudentsList
      },
      {
        path: '/classStudentsListLook',
        component: classStudentsListLook
      },
      {
        path: '/classStudentsListEditor',
        component: classStudentsListEditor
      },
      {
        path: '/classTeacherListEditor',
        component: classTeacherListEditor
      },
      {
        path: '/classParentsList',
        component: classParentsList
      },
      {
        path: '/classParentsListEditor',
        component: classParentsListEditor
      },
      {
        path: '/classParentsListLook',
        component: classParentsListLook
      },
      {
        path: '/schoolTeacherList',
        component: schoolTeacherList
      },
      {
        path: '/schoolTeacherListLook',
        component: schoolTeacherListLook
      },
      {
        path: '/schoolTeacherListEditor',
        component: schoolTeacherListEditor
      },
      {
        path: '/schooStudentsList',
        component: schooStudentsList
      },
      {
        path: '/schooStudentsListEditor',
        component: schooStudentsListEditor
      },
      {
        path: '/schooStudentsListLook',
        component: schooStudentsListLook
      },
      {
        path: '/schoolParentsList',
        component: schoolParentsList
      },
      {
        path: '/schoolParentsListEditor',
        component: schoolParentsListEditor
      },
      {
        path: '/schoolParentsListLook',
        component: schoolParentsListLook
      },
      {
        path: '/schoolAlbum',
        component: schoolAlbum
      },
      {
        path: '/schoolAlbumLook',
        component: schoolAlbumLook
      },
      {
        path: '/enterprise',
        component: enterprise
      },
      {
        path: '/enterpriseAlbum',
        component: enterpriseAlbum
      },
      {
        path: '/enterpriseEditor',
        component: enterpriseEditor
      },
      {
        path: '/enterpriseLook',
        component: enterpriseLook
      },
      {
        path: '/classApplyFor',
        component: classApplyFor
      },
      {
        path: '/lookRole',
        component: lookRole
      },
      {
        path: '/creatEnterprise',
        component: creatEnterprise
      },
      {
        path: '/platform',
        component: platform
      },
      {
        path: '/creatPlatform',
        component: creatPlatform
      },
      {
        path: '/platformLook',
        component: platformLook
      },
      {
        path: '/platformEditor',
        component: platformEditor
      },
      {
        path: '/platformAlbum',
        component: platformAlbum
      },
      {
        path: '/authentication',
        component: authentication
      },
      {
        path: '/authenticationRecord',
        component: authenticationRecord
      },
      {
        path: '/authenticationLook',
        component: authenticationLook
      },
      // 通知
      {
        path: '/msgList',
        component: msgList
      },
      {

        path: '/createmsg',
        component: createmsg
      },
      {
        path: '/createPush',
        component: createPush
      },
      {
        path: '/lookPush',
        component: lookPush
      },
      {
        path: '/lookMsgData',
        component: lookMsgData
      },
      {
        path: '/APPPush',
        component: APPPush
      },
      {
        path: '/lookmsg',
        component: lookmsg
      },
      // 权限组件
      {
        path: '/companyAdmin',
        component: companyAdmin
      },
      {
        path: '/contentAdmin',
        component: contentAdmin
      },
      {
        path: '/schoolAdmin',
        component: schoolAdmin
      },
      {
        path: '/companyAdminCreat',
        component: companyAdminCreat
      },
      {
        path: '/companyAdminLook',
        component: companyAdminLook
      },
      {
        path: '/companyAdminEdit',
        component: companyAdminEdit
      },
      {
        path: '/schoolAdminCreat',
        component: schoolAdminCreat
      },
      {
        path: '/schoolAdminLook',
        component: schoolAdminLook
      },
      {
        path: '/schoolAdminEdit',
        component: schoolAdminEdit
      },
      {
        path: '/contentAdminCreat',
        component: contentAdminCreat
      },
      {
        path: '/contentAdminLook',
        component: contentAdminLook
      },
      {
        path: '/contentAdminEdit',
        component: contentAdminEdit
      },
      // 任务
      {
        path: '/taskList',
        component: taskList
      },
      {
        path: '/creatTask',
        component: creatTask
      },
      {
        path: '/creatR',
        component: creatR
      },
      {
        path: '/creatO',
        component: creatO
      },
      {
        path: '/editO',
        component: editO
      },
      {
        path: '/readTask',
        component: readTask
      },
      {
        path: '/taskOver',
        component: taskOver
      },
      {
        path: '/lookaudioR',
        component: lookaudioR
      },
      {
        path: '/lookaudioO',
        component: lookaudioO
      },
      {
        path: '/lookPicO',
        component: lookPicO
      },

      {
        path: '/apklist',
        component: apklist
      },
      {
        path: '/iosapklist',
        component: iosapklist
      },
      {
        path: '/addapk',
        component: addapk
      },
      {
        path: '/lookapk',
        component: lookapk
      },
      {
        path: '/look',
        component: look
      },
      {
        path: '/lookHistory',
        component: lookHistory
      },
      {
        path: '/reportHistory',
        component: reportHistory
      },
      {
        path: '/reportList',
        component: reportList
      },
      //奖章
      {
        path: '/medalList',
        component: medalList
      },
      {
        path: '/medalData',
        component: medalData
      },
      {
        path: '/lookMedal',
        component: lookMedal
      },
      {
        path: '/creatMedal',
        component: creatMedal
      },
      {
        path: '/editMedal',
        component: editMedal
      },
      {
        path: '/commentlist',
        component: commentlist
      },
      {
        path: '/commentDetail',
        component: commentDetail
      },
      {
        path: '/reply',
        component: reply
      },
      //专辑精选
      {
        path: '/selected',
        component: selected
      }, {

        path: '/feedlist',
        component: feedlist
      }, {
        path: '/lookfeed',
        component: lookfeed
      },
      {
        path: "/activeTemplateCreate",
        component: templateCreate
      },
      //首页运营
      {
        path: "homePageOperating",
        component: homePageOperating
      },
      {
        path: "APPoperatingLists",
        component: APPoperatingLists
      },
      {
        path: "createOperating",
        component: createOperating

      },
      {
        path: "historyApp",
        component: historyApp

      },
      {
        path: "lookApp",
        component: lookApp
      },
      // 活动管理
      {
        path: "/activity",
        component: activity
      },
      // 创建活动
      {
        path: "/activity/create",
        component: activityCreate
      },
      // 模版管理
      {
        path: "/activity/template",
        component: template
      },
      // 创建模版
      {
        path: "/activity/template/create",
        component: templateCreate
      },
      // 用户管理
      {
        path: "/account/user",
        component: accountUser,
      },
      // 组织管理
      {
        path: "/account/org",
        component: accountOrg
      },
      // 角色管理
      {
        path: "/account/role",
        component: accountRole
      },
    ]
  },
    {
      path: '/login',
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  const {
    path
  } = to
  if (path !== '/login') {
    // 如果请求的不是/login 则校验登录状态
    // const token = window.sessionStorage.getItem('token')
    const id = window.sessionStorage.getItem('id')

    if (!id) {
      // 如果没有 token 则让其跳转到 /login
      next('/login')
    } else {
      // 有token 让其通过
      next()
    }
  } else {
    // 如果请求的就是 /login 则直接调用 next() 放心
    next()
  }
})
export default router
