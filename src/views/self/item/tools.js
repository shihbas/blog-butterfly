import {
  IntegerDivisionGetList
} from '@/utils/common'

const avatarRowItemNumber = 4

export function assembleDefaultAvatarList(items) {
  // 组装默认头像列表
  // 计算总长度除以行长度以确定循环次数
  var result = IntegerDivisionGetList(items.length, avatarRowItemNumber)
  const defaultAvatarList = []
  let itemsLength = result[0]
  if (result[1] > 0) {
    itemsLength++
  }
  for (var i = 0; i < itemsLength; i++) {
    defaultAvatarList.push(items.slice(i * avatarRowItemNumber, (i+1) *avatarRowItemNumber))
  }
  return defaultAvatarList
}
