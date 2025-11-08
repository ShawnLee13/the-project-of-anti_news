<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <!-- News Image -->
    <div v-if="news.imageUrl" class="w-full h-48 overflow-hidden">
      <img :src="news.imageUrl" alt="{{ news.title }}" class="w-full h-full object-cover transition-transform hover:scale-105 duration-500">
    </div>
    <div v-else class="w-full h-48 bg-gray-100 flex items-center justify-center">
      <i class="fa fa-newspaper-o text-gray-400 text-4xl"></i>
    </div>

    <!-- News Content -->
    <div class="p-4">
      <!-- Category and Status -->
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {{ news.category }}
        </span>
        <span v-if="status" class="text-xs px-2 py-1 rounded-full" :class="statusClass">
          {{ statusText }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
        <router-link :to="'/news/' + news.id">{{ news.title }}</router-link>
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ news.description }}</p>

      <!-- Footer -->
      <div class="flex justify-between items-center text-xs text-gray-500">
        <div>
          <i class="fa fa-user-o mr-1"></i> {{ news.submitterName }}
        </div>
        <div>{{ formatDate(news.submitTime) }}</div>
      </div>

      <!-- Voting Summary -->
      <div class="mt-3 pt-3 border-t border-gray-100">
        <div class="flex items-center justify-between text-sm">
          <div class="text-gray-600">
            <i class="fa fa-bar-chart mr-1"></i> 投票: {{ totalVotes }} 票
          </div>
          <div v-if="totalVotes > 0" class="flex items-center gap-2">
            <div class="flex items-center text-red-500">
              <i class="fa fa-times-circle mr-1"></i>
              <span>{{ fakePercentage }}%</span>
            </div>
            <div class="flex items-center text-green-500">
              <i class="fa fa-check-circle mr-1"></i>
              <span>{{ notFakePercentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Count -->
      <div class="mt-2 text-xs text-gray-500">
        <i class="fa fa-comments-o mr-1"></i>
        {{ news.comments.length }} 条评论
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