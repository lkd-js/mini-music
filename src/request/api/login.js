import service from "..";

// 获取验证码
export function getLoginYZM(number) {
    return service({
        method: 'GET',
        url: `/captcha/sent?phone=${number}`
    })
}

// 登录
export function getLoginRes(number, psd) {
    return service({
        method: 'POST',
        url: `/login/cellphone?phone=${number}&captcha=${psd}`
    })
}