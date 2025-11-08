<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800">新闻列表</h2>
    
    <!-- Filter Controls - Member B's Responsibility -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
      <div class="flex flex-wrap gap-4 items-end justify-between">
        <div class="flex flex-wrap gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">分类筛选</label>
            <select v-model="selectedCategory" class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
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
            <select v-model="selectedStatus" class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="all">全部状态</option>
              <option value="pending">待验证</option>
              <option value="fake">假新闻</option>
              <option value="verified">已验证</option>
              <option value="contested">有争议</option>
            </select>
          </div>
        </div>
        
        <!-- Pagination Controls -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">每页显示</label>
          <select v-model="pageSize" class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option :value="5">5条</option>
            <option :value="10">10条</option>
            <option :value="15">15条</option>
          </select>
        </div>
      </div>
    </div>

    <!-- News List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NewsCard 
        v-for="news in paginatedNews" 
        :key="news.id" 
        :news="news"
        :status="newsStore.getNewsStatus(news.id)"
      />
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="inline-flex rounded-md shadow">
        <button 
          @click="currentPage = 1" 
          :disabled="currentPage === 1"
          class="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <i class="fa fa-angle-double-left"></i>
        </button>
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <i class="fa fa-angle-left"></i>
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="currentPage = page"
          class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium transition-colors"
          :class="{ 'bg-blue-50 text-blue-600': currentPage === page, 'text-gray-700 hover:bg-gray-50': currentPage !== page }"
        >
          {{ page }}
        </button>
        
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <i class="fa fa-angle-right"></i>
        </button>
        <button 
          @click="currentPage = totalPages" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <i class="fa fa-angle-double-right"></i>
        </button>
      </nav>
    </div>

    <!-- Pagination Info -->
    <div v-if="totalPages > 0" class="mt-4 text-center text-sm text-gray-500">
      显示 {{ startItem }} - {{ endItem }} 条，共 {{ totalItems }} 条
    </div>

    <!-- No News Found -->
    <div v-if="filteredNews.length === 0" class="bg-white p-8 rounded-lg shadow-sm text-center">
      <i class="fa fa-search text-gray-400 text-4xl mb-4"></i>
      <p class="text-gray-600">没有找到符合条件的新闻</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useNewsStore } from '../stores/newsStore.js'
import NewsCard from '../components/NewsCard.vue'

const newsStore = useNewsStore()
const selectedCategory = ref('all')
const selectedStatus = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)

// Load news data
onMounted(() => {
  newsStore.loadNews()
})

// Reset current page when filters change
const resetPage = () => {
  currentPage.value = 1
}

// Watch filters to reset pagination
const unwatchCategory = watch(selectedCategory, resetPage)
const unwatchStatus = watch(selectedStatus, resetPage)

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

// Calculate pagination properties
const totalItems = computed(() => filteredNews.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, totalItems.value))
const startItem = computed(() => totalItems.value > 0 ? startIndex.value + 1 : 0)
const endItem = computed(() => endIndex.value)

// Get paginated news
const paginatedNews = computed(() => {
  return filteredNews.value.slice(startIndex.value, endIndex.value)
})

// Calculate visible page numbers for pagination
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= total - 2) {
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
})
</script>

<style scoped>
/* HomeView specific styles */
</style>