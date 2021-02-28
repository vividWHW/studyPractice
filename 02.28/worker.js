//this代表当前分线程，可写可不写
//接收主线程发来的数据
onmessage = function(e){
    //console.log(e.data)
    var num = 0;
    for (var i = 0; i < e.data.max; i++) {
        num += Math.sqrt(i)
    }
    //console.log(num);
    //向主线程发送数据
    postMessage({
        result: num
    })
    //在分线程关闭自身
    close();
}