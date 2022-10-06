import api from './index'
import { axios } from '@/utils/request'

export function oneStep(params) {
    return axios({
        url: api.oneStep,
        method: 'get',
        data: params
    })
}

export function selectCompany() {
    return axios({
        url: api.selectCompany,
        method: 'get'
    })
}

export function insertEstate(params) {
    return axios({
        url: api.insertEstate,
        method: 'post',
        data: params
    })
}

export function selectBuilding(params) {
    return axios({
        url: api.selectBuilding,
        method: 'post',
        data: params
    })
}

export function updateBuilding(params) {
    return axios({
        url: api.updateBuilding,
        method: 'post',
        data: params
    })
}
