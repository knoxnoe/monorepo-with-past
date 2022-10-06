import api from './api'
import http from '../utils/request'



export function login(params) {
    return http({
        url: api.Login,
        method: 'post',
        data: params
    })
}


export function loginOut(params) {
    return http({
        url: api.Login,
        method: 'post',
        data: params,
        headers: {
            "Authorization": "Basic" + " fasdfafsdasdfsdf"
        }

    })
}


export function userList() {
    return http({
        url: api.UserList,
        method: 'get'
    })
}

export function register(params) {
    return http({
        url: api.Register,
        method: 'post',
        data: params
    })
}

