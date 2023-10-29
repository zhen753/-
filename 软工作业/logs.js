Page({
    data: {
        username: '',
        password: '',
        userId: null,
        code: null
    },
    bindUsernameInput: function (e) {
        this.setData({
            username: e.detail.value,
        });
    },
    bindPasswordInput: function (e) {
        this.setData({
            password: e.detail.value,
        });
    },
    login: function () {
        var that = this;
        if(that.data.username.length == 0 || that.data.password.length == 0){
            wx.showToast({  
                icon: 'none',
                title: 'the input should not be none',
                duration: 2000,
            });
            return;
        }
        wx.request({  
            url: 'mysql://localhost:3306/le_database', 
            method: "get",
            data: {
                username: this.data.username, 
                password: this.data.password,
            },
            success: function (res) { 
                if(res.data.code == 200){ 
                    that.setData({
                        userId: res.data.data, 
                        code: res.data.code,    
                    });
                    wx.showToast({
                        title: 'success',
                    });
                    wx.setStorageSync('userId', that.data.userId); 
                    wx.redirectTo({
                        url: '/pages/seat/seat.wxml',  
                    });
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: 'fault',
                    });
                }    
            },
            fail: function(error) {
                console.log(error);
                wx.showToast({
                    icon: 'none',
                    title: 'defeat',
                });
            }
        }); 
    } 
})
