function initRem() {
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    let w = deviceWidth >= 750 ? 750 : deviceWidth <= 320 ? 320 : deviceWidth;
    // 设置html字体大小，750px --> 1rem=100px; 375px --> 1rem=50px
    document.documentElement.style.fontSize = w / 7.5 + 'px';
    // 设置body字体大小
    document.querySelector('body').style.fontSize = 0.36 + 'rem'
}

initRem()

// 窗口变化时重置rem
window.onresize = function () {
    initRem()
}