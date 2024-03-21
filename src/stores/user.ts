import { ref } from 'vue'
import { defineStore } from 'pinia'
import ACCESS_ENUM from '@/access/accessEnum'
import { UserControllerService } from '@/generated'

export interface UserInfo {
  userName: string
  userRole: string
}

export const useUserStore = defineStore('user', () => {
  const loginUser = ref<UserInfo>({
    userName: '未登录',
    userRole: ACCESS_ENUM.NOT_LOGIN
  })

  async function getLoginUser() {
    const res = await UserControllerService.getLoginUserUsingGet()
    console.log('getLoginUser')
    console.log(res)

    if (res.code === 0) {
      loginUser.value.userName = res.data?.userName ?? '未登录'
      loginUser.value.userRole = res.data?.userRole ?? ACCESS_ENUM.NOT_LOGIN
      console.log(res.data?.userName)
    } else {
      loginUser.value.userName = '未登录'
      loginUser.value.userRole = ACCESS_ENUM.NOT_LOGIN
    }
  }

  function changeName(userName: string) {
    loginUser.value.userName = userName
  }

  return { loginUser, getLoginUser, changeName }
})
