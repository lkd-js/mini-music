import service from "..";


// 获取验证码
export function getCapRes(number) {
    return service({
        method: 'GET',
        url: `/captcha/sent`,
        params: {
            phone: number,
            timestamp: new Date().getTime()
        }

    })
}

// 验证码登录
export function getLoginRes(number, cap) {
    return service({
        method: 'POST',
        url: `/login/cellphone`,
        params: {
            phone: number,
            captcha: cap,
            timestamp: new Date().getTime()
        },
        withCredentials: true
    })
}

