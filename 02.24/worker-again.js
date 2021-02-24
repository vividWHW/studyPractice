this.onmessage = function(e){
    console.log(e.data);
    //获取现在的时间
    var startTime = Date.now();
    //执行计算
    var result = e.data.calculate(e.data.max);
    //计算执行完计算的用时
    var time = Date.now - startTime;
    //向主线程发送数据
    postMessage({
        result: result,
        time: time
    });
    //在分线程关闭自身
    close();
}