整体项目使用了react框架

使用的技术有redux,redux-saga,Javascript,axios,ant design

项目描述:
    1.项目整体使用的是ant design中的样式
    
    2.在对手机号的校验使用正则进行.

    3.验证码的倒计时是使用了setInterval进行设置state中的数据使之运行.

    4.对后台的数据交互和存储采用redux-saga与axios进行
        数据存储放置reducers中
        action的设置放置与actionCreators中
        对后台接口对接放置于mySagas中

项目代码的导入与使用

    下载源码后先使用cnpm install或npm install导入需要的包,再使用npm start运行

    项目的在线演示地址:http://106.52.27.87/login/index.html

    项目GitHub地址:https://github.com/1143581505/test.git

项目依旧存在的问题

    再请求验证码时有时成功,但经常报500或者超时.

    发送手机号时测试时经常报500或者超时,未测试成功,但能进行后台请求.