import { getToken } from 'utils/cookies'

/** 用户性别 */
/* eslint-disable */
export enum UserSex {
  /** 未知 */
  unknown = '0',
  /** 男性 */
  male = '1',
  /** 女性 */
  famale = '2'
}

export interface UserState {
  token: string
  id: number
  username: string
  avatar: string
  mobile: string
  email: string
  sex: UserSex
  remarks: string
}

export const state: UserState = {
  token: getToken() || '',
  id: 0,
  username: '',
  avatar: '',
  mobile: '',
  email: '',
  sex: UserSex.unknown,
  remarks: ''
}
