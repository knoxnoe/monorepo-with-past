import api from './api'
import http from '../utils/request'


export function create(params) {
  return http({
    url: api.CreateRepo,
    method: 'post',
    data: params
  })
}

export function getDirectory(path) {
  return http({
    url: api.GetDirectory + path,
    method: 'get',
    data: JSON.stringify({})
  })
}

export function getRepos(path) {
  return http({
    url: api.GetRepos + path,
    method: 'get',
    data: JSON.stringify({})
  })
}

export function uploadFile(param) {
  return http({
    url: api.UploadFile,
    method: 'post',
    data: param
  })
}

export function downloadRepo(param) {
  return http({
    url: api.DownLoad,
    method: 'post',
    data: param,
    responseType: "blob"
  })

}

export function fork(param) {
  return http({
    url: api.Fork,
    method: 'post',
    data: param
  })
}

export function getBranchs(path) {
  return http({
    url: api.GetBranch + path,
    method: 'get',
    data: JSON.stringify({})
  })
}