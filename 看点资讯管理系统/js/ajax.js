//ajax的封装
var baseUrl = 'http://134.175.154.93:8099';
function getAjax(url,method,data,successFun,errorFun){
	$.ajax({
		url:baseUrl+url,
		method:method,
		data:data,
		success:successFun,
		error:errorFun,
	});
}

