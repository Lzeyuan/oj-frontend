<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header"
        ><a-space
          ><img src="../assets/logo.jpg" class="logo" />
          <div>web oj</div></a-space
        ></a-layout-header
      >
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.baidu.com" target="_blank">这是一个OJ系统的Demo</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>
<style>
#userLayout {
  text-align: center;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-bottom: 16px;
  margin-top: 16px;
}
#userLayout .content {
  padding: 20px;
}
#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
