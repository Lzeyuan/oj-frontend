import type { UserInfo } from '@/stores/user'


const checkAccess = (loginUser: UserInfo, needAccess: string[]) => {
  if (needAccess === undefined) {
    return true
  }

  let canAccess = false
  needAccess.forEach((access) => {
    if (access === '*') {
      canAccess = true
    }
    if (loginUser.userRole === access) {
      canAccess = true
    }
  })

  return canAccess
}

// const checkAccess = (loginUser: UserInfo, needAccess: string) => {
//   const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

//   switch (needAccess) {
//     case ACCESS_ENUM.NOT_LOGIN:
//       return true;
//     case ACCESS_ENUM.USER:
//       if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
//         return false;
//       }
//       break;
//     case ACCESS_ENUM.ADMIN:
//       if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
//         return false;
//       }
//       break;
//   }
//   return true;
// }

export default checkAccess
