<template>
  <div v-if="news" class="bg-white rounded-lg shadow-sm overflow-hidden">
    <!-- News Header -->
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <span class="text-sm text-gray-500">
          <i class="fa fa-folder-o mr-1"></i>{{ news.category }}
        </span>
        <div class="flex items-center px-3 py-1 rounded-full text-sm" :class="statusClass">
          <i class="fa fa-check-circle mr-1"></i>
          {{ statusText }}
        </div>
      </div>
      
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{{ news.title }}</h1>
      
      <div class="text-sm text-gray-500 mb-6 flex justify-between">
        <span>
          <i class="fa fa-user-o mr-1"></i> 上报人: {{ news.submitterName }}
        </span>
        <span>
          <i class="fa fa-clock-o mr-1"></i> {{ formatDate(news.submitTime) }}
        </span>
      </div>
    </div>

    <!-- News Image -->
    <div v-if="news.imageUrl" class="w-full h-64 md:h-96 overflow-hidden">
      <img :src="news.imageUrl" alt="{{ news.title }}" class="w-full h-full object-cover transition-transform hover:scale-105 duration-500">
    </div>

    <!-- News Content -->
    <div class="p-6">
      <div class="text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
        {{ news.content }}
      </div>

      <!-- Voting Section -->
      <div class="border-t border-b py-6 mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">社区投票</h3>
        
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-1">
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                    假新闻
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-red-600">
                    {{ fakePercentage }}%
                  </span>
                </div>
              </div>
              <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                <div 
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  :style="{ width: fakePercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    非假新闻
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-green-600">
                    {{ notFakePercentage }}%
                  </span>
                </div>
              </div>
              <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div 
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  :style="{ width: notFakePercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 justify-center">
          <button 
            @click="vote('fake')" 
            :class="['px-5 py-2 rounded-md font-medium transition-colors', 
              voted === 'fake' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-red-100']"
            :disabled="voted !== null"
          >
            <i class="fa fa-times-circle mr-2"></i> 标记为假新闻
          </button>
          <button 
            @click="vote('notFake')" 
            :class="['px-5 py-2 rounded-md font-medium transition-colors', 
              voted === 'notFake' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-green-100']"
            :disabled="voted !== null"
          >
            <i class="fa fa-check-circle mr-2"></i> 标记为非假新闻
          </button>
        </div>

        <div v-if="voteMessage" class="mt-4 p-3 rounded-md text-sm text-center" :class="voteMessageType">
          {{ voteMessage }}
        </div>
      </div>

      <!-- Comments Section -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">评论与证据 ({{ news.comments.length }})</h3>
        
        <!-- Add Comment Form -->
        <div class="mb-8">
          <div class="mb-4">
            <textarea 
              v-model="newComment.content" 
              placeholder="写下您的评论或提供证据..." 
              class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-4">
            <input 
              v-model="newComment.imageUrl" 
              placeholder="证据图片 URL (可选)" 
              class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="mb-2">
            <input 
              v-model="newComment.submitterName" 
              placeholder="您的姓名" 
              class="w-full md:w-1/3 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <button 
            @click="submitComment" 
            class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors"
            :disabled="!newComment.content.trim() || !newComment.submitterName.trim()"
          >
            <i class="fa fa-paper-plane mr-2"></i> 提交评论
          </button>
        </div>

        <!-- Comments List -->
        <div v-if="news.comments.length > 0" class="space-y-6">
          <CommentItem v-for="comment in news.comments" :key="comment.id" :comment="comment" />
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <i class="fa fa-comment-o text-3xl mb-2"></i>
          <p>还没有评论，成为第一个评论的人吧！</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Loading/Not Found -->
  <div v-else class="bg-white p-8 rounded-lg shadow-sm text-center">
    <i class="fa fa-search text-gray-400 text-4xl mb-4"></i>
    <p class="text-gray-600">新闻不存在或已被删除</p>
    <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
      返回首页
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '../stores/newsStore.js'
import CommentItem from '../components/CommentItem.vue'

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()
const newsId = route.params.id
const news = ref(null)
const voted = ref(null)
const voteMessage = ref('')
const voteMessageType = ref('')

// New comment form data
const newComment = ref({
  content: '',
  imageUrl: '',
  submitterName: ''
})

// Load news data
onMounted(() => {
  newsStore.loadNews()
  news.value = newsStore.getNewsById(newsId)
  
  // If news not found, redirect to home
  if (!news.value) {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
})

// Calculate vote percentages
const fakePercentage = computed(() => {
  if (!news.value) return 0
  const totalVotes = news.value.fakeVotes + news.value.notFakeVotes
  return totalVotes > 0 ? Math.round((news.value.fakeVotes / totalVotes) * 100) : 0
})

const notFakePercentage = computed(() => {
  if (!news.value) return 0
  const totalVotes = news.value.fakeVotes + news.value.notFakeVotes
  return totalVotes > 0 ? Math.round((news.value.notFakeVotes / totalVotes) * 100) : 0
})

// Get news status
const status = computed(() => {
  if (!news.value) return 'unknown'
  return newsStore.getNewsStatus(newsId)
})

const statusText = computed(() => {
  const statusMap = {
    'pending': '待验证',
    'fake': '假新闻',
    'verified': '已验证',
    'contested': '有争议'
  }
  return statusMap[status.value] || '未知'
})

const statusClass = computed(() => {
  const classMap = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'fake': 'bg-red-100 text-red-800',
    'verified': 'bg-green-100 text-green-800',
    'contested': 'bg-blue-100 text-blue-800'
  }
  return classMap[status.value] || 'bg-gray-100 text-gray-800'
})

// Vote on news
const vote = (voteType) => {
  if (voted.value !== null) return
  
  newsStore.voteOnNews(newsId, voteType)
  voted.value = voteType
  
  // Show success message
  voteMessage.value = voteType === 'fake' ? '您已将此新闻标记为假新闻' : '您已将此新闻标记为非假新闻'
  voteMessageType.value = 'bg-green-100 text-green-800'
  
  // Update the local news data
  news.value = newsStore.getNewsById(newsId)
  
  // Clear message after 3 seconds
  setTimeout(() => {
    voteMessage.value = ''
  }, 3000)
}

// Submit comment
const submitComment = () => {
  if (!newComment.value.content.trim() || !newComment.value.submitterName.trim()) return
  
  newsStore.addComment(newsId, newComment.value)
  
  // Reset form
  newComment.value = {
    content: '',
    imageUrl: '',
    submitterName: ''
  }
  
  // Update the local news data
  news.value = newsStore.getNewsById(newsId)
  
  // Show success message
  voteMessage.value = '评论提交成功！'
  voteMessageType.value = 'bg-green-100 text-green-800'
  
  // Clear message after 3 seconds
  setTimeout(() => {
    voteMessage.value = ''
  }, 3000)
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* NewsDetailView specific styles */
</style>