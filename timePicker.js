class TimePicker{
    // 构造函数
    constructor(param){
        this.config = param;
        this.rootNode = null;
        this.ul = null;
        this.lis = null;
        this.init();
    }
    
    // 初始化函数
    init(){
        // 获取相关的DOM元素
        this.rootNode = document.getElementById(this.config.rootContainer);
        this.ul = document.getElementById(this.config.root_ul)
        this.lis = document.querySelectorAll(".scroll_li");
        this.liHeight = this.lis[0].clientHeight; // 获取一个li的高度
        // 默认选中第一个li
        this.changeStyle(1);
    }

    // 监听ul的停止滑动事件
    end(){
        let ulScrollTop = this.ul.scrollTop; // 获取ul元素的scrollTop
        let newHeght = this.getHeight(ulScrollTop, this.liHeight);
        $('ul').animate({scrollTop: newHeght}, "slow");
        let nowNum = newHeght / this.liHeight + 1;
        this.changeStyle(nowNum);
    }

    // 监听ul的滑动事件
    move(){
        let ulScrollTop = this.ul.scrollTop; // 获取ul元素的scrollTop
        let newHeght = this.getHeight(ulScrollTop, this.liHeight); // 获取到目前的滚动高度，计算出当前的li
        let nowNum = newHeght / this.liHeight + 1;
        this.changeStyle(nowNum); // 改变当前li，以及li上下两个li的样式
    }

    // 计算滑动的距离
    getHeight(num, liHeight){
        // 利用循环和li的高度，计算每一个区间
        for(var i=0; i<11; i++){
            let height_one = liHeight/2+ liHeight*i;
            let height_two = liHeight/2+ liHeight*(i+1);
            if(num > liHeight/2 + liHeight*10){
                return liHeight*11;
            }
            if(num > height_one && num < height_two){
                return liHeight*(i+1);
            }
            if(num < height_one){
                return 0;
            }
        }
    }

    // 在滑动过程当中修改样式
    changeStyle(nowNum){
        var lis = document.querySelectorAll('li');
        for(var i=0; i<lis.length; i++){
            lis[i].style.color = "white";
            lis[i].style.opacity = "1";
        }
        if(lis[nowNum]){
            lis[nowNum].style.fontSize = "18px";
        }
        if(lis[nowNum - 1]){
            lis[nowNum - 1].style.fontSize = "16px";
            lis[nowNum - 1].style.opacity = "0.5";
        }
        if(lis[nowNum - 2]){
            lis[nowNum - 2].style.fontSize = "14px";
            lis[nowNum - 2].style.opacity = "0.2";
        }
        if(lis[nowNum + 1]){
            lis[nowNum + 1].style.fontSize = "16px";
            lis[nowNum + 1].style.opacity = "0.5";
        }
        if(lis[nowNum + 2]){
            lis[nowNum + 2].style.fontSize = "14px";
            lis[nowNum + 2].style.opacity = "0.2";
        }
    }

    // 获取当前选择的li的内容
    getTime(){
        let ulScrollTop = this.ul.scrollTop; // 获取ul元素的scrollTop
        let newHeght = this.getHeight(ulScrollTop, this.liHeight); // 获取到目前的滚动高度，计算出当前的li
        let nowNum = newHeght / this.liHeight + 1;
        return nowNum
    }
}