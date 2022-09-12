//通过定时器不断移动
//给不同对象封装time定时器方之开辟过多的空间
//匀速运动
function animate(obj,target,step) { 
    //不断点击移动速度越来愈快，因为开启了太多的定时器，
    //解决方案是保证同一时间只有一个定时器运行‘
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
        } else {
            obj.style.left = obj.offsetLeft + step + 'px'
        }
    }, 30);
}


//缓动动画 速度越来越慢
//v=(目标值-现在的位置)/10
function slowanimate(obj,target,callback) { 
    //不断点击移动速度越来愈快，因为开启了太多的定时器，
    //解决方案是保证同一时间只有一个定时器运行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) > 0 ? Math.ceil((target - obj.offsetLeft) / 10) : Math.floor((target - obj.offsetLeft) / 10);//正值向上取整，负值向下取整
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 动画结束调用回调函数
            if (callback) { 
                callback();
            }
        } else {
            obj.style.left = obj.offsetLeft + step + 'px'
        }
    }, 15);


}