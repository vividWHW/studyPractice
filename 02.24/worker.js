//this代表当前分线程
//console.log(this);
//在分线程中，当主线程向分线程中发送数据，会触发分线程的onmessage事件
//this.onmessage或onmessage都可以
onmessage = function(e){
    //console.log(e.data);
    var num = 0;
    for(var i = 0; i <= e.data; i++){
        num += i;
        num += Math.sqrt(num);
    }
    //console.log(num);
    //向主线程中发送数据
    postMessage(num);
    //在分线程关闭自身
    close();
}