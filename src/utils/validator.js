// element 表单验证规则

import {
  ValidateEmail
} from './common'

export function validNicknameLength(rule, value, callback) {
  // 昵称长度
  if (value.length > 12 || value.length < 1) {
    callback(new Error('昵称应为1-10个字'))
  }
  callback()
}

export function validBindEmailValue(rule, value, callback) {
  // 邮箱校验
  if (ValidateEmail(value)) {
    callback()
  }
  callback(new Error('邮箱格式不正确'))
}

export function validPWDLength(rule, value, callback) {
  // 密码长度校验
  if (value.length < 9 || value.length > 16) {
    callback(new Error('密码长度应为9-15位'));
  }
  callback();
}
