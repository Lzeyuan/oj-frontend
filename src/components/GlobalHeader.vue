<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <div>
        <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <div class="title-bar">
              <img class="logo" src="../assets/logo.jpg" />
              <div class="title">Web OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visiableRoutes" :key="item.path">{{ item.name }}</a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>{{ loginUser.userRole === ACCESS_ENUM.NOT_LOGIN ? '未登录' : loginUser.userName }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import routers from '@/router'
import { watch, computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import checkAccess from '@/access/checkAccess'
import ACCESS_ENUM from '@/access/accessEnum'

const router = useRouter()
const userStore = useUserStore()

const loginUser = ref(userStore.loginUser)
const routes = routers.getRoutes()

const homeRoutes = routes.find((route) => {
  return route.name === '主页'
})?.children

console.log(routes)
console.log(homeRoutes)
console.log(loginUser.value.userName)

const visiableRoutes = computed(() => {
  return homeRoutes?.filter((item) => {
    if (checkAccess(userStore.loginUser, item.meta?.roles as string[])) {
      return true
    }
  })
})

const selectedKeys = ref(['/'])
router.afterEach((to) => {
  selectedKeys.value = [to.path]
})

const doMenuClick = async (key: string) => {
  router.push({
    path: key
  })
}

const stopAgeWatcher = watch(loginUser, (value, oldValue) => {
  console.log(value, oldValue)
  stopAgeWatcher() // 当ageRef大于18，停止侦听
})
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
