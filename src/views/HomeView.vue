<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800">新闻列表</h2>
    
    <!-- Filter Controls - Note: This is primarily member B's responsibility but included here for basic functionality -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="flex flex-wrap gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">分类筛选</label>
          <select v-model="selectedCategory" class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">全部分类</option>
            <option value="太空">太空</option>
            <option value="天气">天气</option>
            <option value="地质">地质</option>
            <option value="环境">环境</option>
            <option value="科学">科学</option>
            <option value="技术">技术</option>
            <option value="历史">历史</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">状态筛选</label>
          <select v-model="selectedStatus" class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">全部状态</option>
            <option value="pending">待验证</option>
            <option value="fake">假新闻</option>
            <option value="verified">已验证</option>
            <option value="contested">有争议</option>
          </select>
        </div>
      </div>
    </div>

    <!-- News List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NewsCard 
        v-for="news in filteredNews" 
        :key="news.id" 
        :news="news"
        :status="newsStore.getNewsStatus(news.id)"
      />
    </div>

    <!-- No News Found -->
    <div v-if="filteredNews.length === 0" class="bg-white p-8 rounded-lg shadow-sm text-center">
      <i class="fa fa-search text-gray-400 text-4xl mb-4"></i>
      <p class="text-gray-600">没有找到符合条件的新闻</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNewsStore } from '../stores/newsStore.js'
import NewsCard from '../components/NewsCard.vue'

const newsStore = useNewsStore()
const selectedCategory = ref('all')
const selectedStatus = ref('all')

// Load news data
onMounted(() => {
  newsStore.loadNews()
})

// Filter news based on category and status
const filteredNews = computed(() => {
  let filtered = newsStore.getAllNews
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(news => news.category === selectedCategory.value)
  }
  
  // Filter by status
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(news => newsStore.getNewsStatus(news.id) === selectedStatus.value)
  }
  
  return filtered
})
</script>

<style scoped>
/* HomeView specific styles */
</style>