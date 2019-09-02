//js
//处理点击切换页面
//console.log($);
$(function(){
	$('.info-content').load('./pages/home.html');
	$('.info-left li').click(function(event){
		var text = $(this).text().trim();
		switch(text){
			case '首页':
			//加载页面
			$('.info-content').load('./pages/home.html');break;
			case '栏目管理':
			//加载页面
			$('.info-content').load('./pages/category.html');break;
			case '资讯管理':
			//加载页面
			$('.info-content').load('./pages/info.html');break;
			case '用户管理':
			//加载页面
			$('.info-content').load('./pages/user.html');break;
			default:break;
		}
	});
});