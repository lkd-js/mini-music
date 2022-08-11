import service from "..";


// 获取验证码
export function getCapRes(number) {
    return service({
        method: 'GET',
        url: `/captcha/sent?phone=${number}`
    })
}

// 验证码登录
export function getLoginRes(number, cap) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${number}&captcha=${cap}`
    })
}