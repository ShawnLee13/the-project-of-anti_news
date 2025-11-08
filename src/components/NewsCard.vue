<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
    <!-- News Image -->
    <div v-if="news.imageUrl" class="w-full h-48 sm:h-56 overflow-hidden">
      <img 
        :src="news.imageUrl" 
        :alt="news.title" 
        class="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
      >
    </div>
    <div v-else class="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center">
      <i class="fa fa-newspaper-o text-gray-400 text-4xl"></i>
    </div>

    <!-- News Content -->
    <div class="p-5">
      <!-- Category and Status -->
      <div class="flex justify-between items-start mb-3">
        <span class="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full transition-colors hover:bg-gray-200">
          {{ news.category }}
        </span>
        <span v-if="status" class="text-xs font-medium px-2 py-1 rounded-full transition-transform hover:scale-105" :class="statusClass">
          {{ statusText }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
        <router-link :to="'/news/' + news.id" class="block hover:underline decoration-2 underline-offset-4">
          {{ news.title }}
        </router-link>
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ news.description }}</p>

      <!-- Footer -->
      <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
        <div class="flex items-center space-x-1">
          <i class="fa fa-user-o"></i> <span>{{ news.submitterName }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="fa fa-clock-o"></i> <span>{{ formatDate(news.submitTime) }}</span>
        </div>
      </div>

      <!-- Voting Summary -->
      <div class="mt-4 pt-4 border-t border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="text-gray-600 text-sm flex items-center space-x-1">
            <i class="fa fa-bar-chart"></i> <span>投票: {{ totalVotes }} 票</span>
          </div>
          <div v-if="totalVotes > 0" class="flex items-center gap-3">
            <div class="flex items-center text-red-500 text-sm font-medium space-x-1">
              <i class="fa fa-times-circle"></i>
              <span>{{ fakePercentage }}%</span>
            </div>
            <div class="flex items-center text-green-500 text-sm font-medium space-x-1">
              <i class="fa fa-check-circle"></i>
              <span>{{ notFakePercentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Count -->
      <div class="mt-3 text-xs text-gray-500 flex items-center space-x-1">
        <i class="fa fa-comments-o"></i>
        <span>{{ news.comments.length }} 条评论</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  news: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: null
  }
})

const router = useRouter()

// Calculate vote statistics
const totalVotes = computed(() => {
  return props.news.fakeVotes + props.news.notFakeVotes
})

const fakePercentage = computed(() => {
  if (totalVotes.value === 0) return 0
  return Math.round((props.news.fakeVotes / totalVotes.value) * 100)
})

const notFakePercentage = computed(() => {
  if (totalVotes.value === 0) return 0
  return Math.round((props.news.notFakeVotes / totalVotes.value) * 100)
})

// Get status text and class
const statusText = computed(() => {
  const statusMap = {
    'pending': '待验证',
    'fake': '假新闻',
    'verified': '已验证',
    'contested': '有争议'
  }
  return statusMap[props.status] || ''
})

const statusClass = computed(() => {
  const classMap = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'fake': 'bg-red-100 text-red-800',
    'verified': 'bg-green-100 text-green-800',
    'contested': 'bg-blue-100 text-blue-800'
  }
  return classMap[props.status] || ''
})

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) {
    return '刚刚'
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`
  } else if (diffHours < 24) {
    return `${diffHours}小时前`
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}
</script>

<style scoped>
/* NewsCard specific styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>