<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <el-container class="main-layout">
    <el-header height="60px" class="main-header">
      <Header />
    </el-header>
    <el-main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </el-main>
    <el-footer height="80px" class="main-footer">
      <Footer />
    </el-footer>
  </el-container>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  flex-direction: column;
}

.main-header {
  padding: 0;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
}

.main-content {
  flex: 1;
  padding: 20px 0;
  background: #f5f7fa;
}

.main-footer {
  padding: 0;
  background: #fff;
  border-top: 1px solid #ebeef5;
}

.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
