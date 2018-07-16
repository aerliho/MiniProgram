//app.js

var app = getApp();
var aldstat = require("./utils/ald-stat.js");
var utils = require('./utils/utils.js');
var QQMapWX = require('./utils/qqmap-wx-jssdk.js');

App({
  /**
   * @brief 先检查是否还处于登录状态，如果成功直接进入主页，否则进行登录流程
   */
  globalData: {
    // 手机信息，屏幕宽高
    windowWidth: '',
    windowHeight: '',

    // 身份id，对话id
    openid: '',
    sessionid: '',

    // 位置信息   
    latitude: 0.0,
    longitude: 0.0,

    // api信息
    qqmapsdk: {},


    category_foreign__to_china:{
      "food": 'restaurant',
      "parks": 'living_service',
      "travel": 'tourism',
      "building": 'hotel',
      "arts": 'entertainment',
      "shopes": 'mall',
      "nightlife" : 'nightlife'
    },
    
    rawData:{},
    
    
    checkins: [],
    
    
    qrcodeUrl: "",
    weatherCity:"",
    locationMap: {
      "房产小区": "resident",
      "教育学校": "school",
      "酒店宾馆": "hotel",
      "公司企业": "company",
      "购物": "mall",
      "美食": "restaurant",
      "娱乐休闲": "entertainment",
      "机构团体": "bureau",
      "银行金融": "bank",
      "生活服务": "living_service",
      "旅游景点": "tourism",
      "基础设施": "infra",
      "医疗保健": "hospital",
      "运动健身": "sports"
    },
    categoryDic:{},
    districtDict:{},
    placeDict:{},
    checkinLastTimeTable: new Array(),
    scores: 30,

    version:-1
  },
  
  editTabBar: function () {
    /*
    var tabbar = this.globalData.tabbar,
      currentPages = getCurrentPages(),
      _this = currentPages[currentPages.length - 1],
      pagePath = _this.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });*/
  },


  onLaunch: function () {
    var that = this;

    // 获取手机屏幕信息
    var sysInfo = wx.getSystemInfoSync();
    this.globalData.windowWidth = sysInfo.windowWidth;
    this.globalData.windowHeight = sysInfo.windowHeight;

  
    wx.setStorageSync('first_tabbar', 'yes')
    wx.setStorageSync('refresh_activity', 'yes')
    

    // 设置公共接口sdk
    this.globalData.qqmapsdk = new QQMapWX({
      key: 'A5EBZ-DCPK4-IFSU7-XIQGW-NJKPJ-2NFLM'
    });
    
    
    wx.request({
      url: 'https://40525433.fudan-mini-program.com/cgi-bin/Version',
      method: 'POST',
      
      data:{
        version_code:'0.97'
      },
      success: function (res) {
        console.log("[App] Launch ");
        console.log(res);
        
        if (res.data.status == 'OK'){
          if (res.data.version == 0){
            that.globalData.version = 0;
          }else if(res.data.version == 1){
            that.globalData.version = 1; 
          }
        }
        else{
          wx.showToast({
            title: '读取版本错误!',
          });
        }
      },
      fail: function(res){
        wx.showToast({
          title: '读取版本错误!',
        });
      }
    })
  },

  onShow: function (options) {
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }

})

