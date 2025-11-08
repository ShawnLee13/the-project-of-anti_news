<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600 flex items-center">
          <i class="fa fa-shield mr-2"></i>
          社交反假新闻平台
        </h1>
        <div class="flex items-center space-x-4">
          <router-link to="/" class="text-gray-600 hover:text-blue-600 transition-colors">
            <i class="fa fa-home mr-1"></i> 首页
          </router-link>
          <router-link to="/submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            <i class="fa fa-plus mr-1"></i> 提交新闻
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>© 2024 社交反假新闻平台 - 让网络信息更可信</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNewsStore } from './stores/newsStore.js'

// Load news data when the app mounts
onMounted(() => {
  const newsStore = useNewsStore()
  newsStore.loadNews()
})
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
</style>