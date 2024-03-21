import ACCESS_ENUM from '@/access/accessEnum'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import checkAccess from './checkAccess'

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  const loginUser = userStore.loginUser

  // 自动登录
  if (!loginUser || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    await userStore.getLoginUser()
  }

    // 无需权限
    const needAccess = (to.meta?.roles as string[])
    if (needAccess === undefined) {
      next()
    }
    needAccess.forEach((access) => {
      if (access === '*') {
        next()
      }
    })

  // 权限判断
  if (!loginUser || !loginUser.userRole) {
    next(`/user/login?redirect=${to.fullPath}`)
    return
  }

  if (!checkAccess(loginUser, needAccess)) {
    next('/noAuth')
    return
  }

  next()
})
