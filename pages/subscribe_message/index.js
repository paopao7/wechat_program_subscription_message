// pages/my/subscribe_message/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_open: false, //是否开启消息订阅
        subscribe_message_list: [], //订阅消息数组
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this;
        that.get_list();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        that.get_setting();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
       
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 获取订阅消息模板列表
    get_list: function () {
        var that = this;
        //获取本地存储的用户id
        var user_id = wx.getStorageSync('user_id');

        var request_data = {
            user_id: user_id
        };

        /*
            此处调用网络请求获取用户相关的订阅信息
            此处省略网络请求
            如果获取成功则将对应的数据置到前台
        */
        that.setData({
                subscribe_message_list: response
            })
        } else {
            util.toast_with_txt(message);
        }
            
    },
    // 获取订阅信息设置开关
    get_setting: function () {
        var that = this;

        wx.getSetting({
            withSubscriptions: true,
            success(res) {
                console.log(res);

                that.setData({
                    is_open: res.subscriptionsSetting.mainSwitch
                })
            }
        })
    },
    // 订阅消息并追加次数
    subscribe_msg: function (e) {
        var that = this;
        console.log(e);

        var is_open = that.data.is_open;
        var id = e.currentTarget.id;
        var template_id = e.currentTarget.dataset.template_id;
        var index = e.currentTarget.dataset.index;
        var user_id = wx.getStorageSync('user_id');
        var subscribe_message_list = that.data.subscribe_message_list;

        if (is_open == false){
            //此处为自己封装的toast，可修改为系统自带的
            util.toast_with_txt("您已关闭消息订阅，请开启后再进行操作");
        }else{
            wx.requestSubscribeMessage({
                tmplIds: [template_id],
                success(res) {
                    console.log(res)
                    var type = res[template_id];

                    //接受
                    if (type == "accept") {
                        var request_data = {
                            user_id,
                            subscribe_message_id: id
                        };

                        /*
                            此处为调用网络请求，该部分省略
                            请求成功后将对应下标的值修改为服务器返回的值
                        */
                        
                        console.log(res);
                        const { status, code, message, response } = res;

                        if (code == 10000) {
                            subscribe_message_list[index]['num'] = response['num'];

                            that.setData({
                                subscribe_message_list
                            })
                        } else {
                            //此处为自己封装的toast，可修改为系统自带的
                            util.toast_with_txt(message);
                        }
                           
                    }
                },
                fail(err) {
                    console .log(err)
                    var errCode = err.errCode;
                    if(errCode == 20004){
                        wx.showModal({
                            title: '提示',
                            content: '您已拒绝接受订阅消息，请开启',
                            confirmColor: '#fcd94d',
                            confirmText: '好',
                            cancelColor: '#666666',
                            cancelText: '拒绝',
                            success(res) {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success(res) {
                                            console.log(res);
                                        }
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                }
            })
        }
    },
    //跳转到设置页面
    setting_subscribe_msg: function () {
        wx.openSetting({
            success(res) {
                console.log(res);
            }
        })
    }
})