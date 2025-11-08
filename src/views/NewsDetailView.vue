<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div v-if="news" class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- News Header -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
            <div class="flex items-center">
              <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium flex items-center">
                <i class="fa fa-folder-o mr-1"></i>{{ news.category }}
              </span>
            </div>
            <div class="flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="statusClass">
              <i class="fa fa-check-circle mr-1"></i>
              {{ statusText }}
            </div>
          </div>
          
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{{ news.title }}</h1>
          
          <div class="text-sm text-gray-500 mb-4 flex justify-between items-center">
            <span class="flex items-center">
              <i class="fa fa-user-o mr-1"></i> 上报人: {{ news.submitterName }}
            </span>
            <span class="flex items-center">
              <i class="fa fa-clock-o mr-1"></i> {{ formatDate(news.submitTime) }}
            </span>
          </div>
          
          <div class="flex items-center text-sm text-gray-500">
            <span class="flex items-center mr-4">
              <i class="fa fa-eye mr-1"></i> 浏览 {{ viewCount }}
            </span>
            <span class="flex items-center mr-4">
              <i class="fa fa-bar-chart mr-1"></i> 争议度 {{ controversyScore }}%
            </span>
            <span class="flex items-center">
              <i class="fa fa-comment-o mr-1"></i> {{ news.comments.length }} 条评论
            </span>
          </div>
        </div>

        <!-- News Image -->
        <div v-if="news.imageUrl" class="w-full h-64 md:h-96 overflow-hidden bg-gray-100">
          <img 
            :src="news.imageUrl" 
            alt="{{ news.title }}"
            class="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
            loading="lazy"
          >
        </div>

        <!-- News Content -->
        <div class="p-6">
          <div class="text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
            {{ news.content }}
          </div>

          <!-- Voting Section -->
          <div class="border-t border-b border-gray-100 py-6 mb-8 bg-gray-50">
            <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <i class="fa fa-vote-yea mr-2 text-blue-600"></i>社区投票
            </h3>
            
            <!-- Vote Stats -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <i class="fa fa-times-circle text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">假新闻</div>
                    <div class="text-2xl font-bold text-red-600">{{ news.fakeVotes }}</div>
                  </div>
                </div>
                <div class="text-4xl font-light text-gray-300">vs</div>
                <div class="flex items-center">
                  <div>
                    <div class="text-sm text-gray-500">非假新闻</div>
                    <div class="text-2xl font-bold text-green-600">{{ news.notFakeVotes }}</div>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 ml-3">
                    <i class="fa fa-check-circle text-xl"></i>
                  </div>
                </div>
              </div>
              
              <!-- Progress Bars -->
              <div class="flex flex-col gap-4">
                <div class="relative pt-1">
                  <div class="flex items-center justify-between mb-1">
                    <div class="text-sm font-medium text-red-600">假新闻</div>
                    <div class="text-sm font-medium text-red-600">{{ fakePercentage }}%</div>
                  </div>
                  <div class="overflow-hidden h-3 flex rounded-full bg-red-100">
                    <div 
                      class="flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-500"
                      :style="{ width: fakePercentage + '%' }"
                    ></div>
                  </div>
                </div>
                <div class="relative pt-1">
                  <div class="flex items-center justify-between mb-1">
                    <div class="text-sm font-medium text-green-600">非假新闻</div>
                    <div class="text-sm font-medium text-green-600">{{ notFakePercentage }}%</div>
                  </div>
                  <div class="overflow-hidden h-3 flex rounded-full bg-green-100">
                    <div 
                      class="flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                      :style="{ width: notFakePercentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
              
              <!-- Total Votes -->
              <div class="mt-4 text-center text-sm text-gray-500">
                共 {{ totalVotes }} 人参与投票
              </div>
            </div>

            <!-- Vote Buttons -->
            <div class="flex flex-wrap gap-4 justify-center">
              <button 
                @click="vote('fake')" 
                :class="['px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2', 
                  voted === 'fake' 
                    ? 'bg-red-500 text-white shadow-md focus:ring-red-500 focus:ring-offset-red-100'
                    : 'bg-white text-red-600 border border-red-200 shadow-sm hover:bg-red-50 focus:ring-red-500 focus:ring-offset-white']"
                :disabled="voted !== null"
              >
                <i class="fa fa-times-circle mr-2"></i> 标记为假新闻
              </button>
              <button 
                @click="vote('notFake')" 
                :class="['px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2', 
                  voted === 'notFake' 
                    ? 'bg-green-500 text-white shadow-md focus:ring-green-500 focus:ring-offset-green-100'
                    : 'bg-white text-green-600 border border-green-200 shadow-sm hover:bg-green-50 focus:ring-green-500 focus:ring-offset-white']"
                :disabled="voted !== null"
              >
                <i class="fa fa-check-circle mr-2"></i> 标记为非假新闻
              </button>
            </div>

            <!-- Vote Message -->
            <div 
              v-if="voteMessage" 
              class="mt-6 p-4 rounded-lg text-sm text-center animate-fadeIn"
              :class="voteMessageType"
            >
              <i :class="['fa mr-2', voteMessageType.includes('green') ? 'fa-check-circle' : 'fa-info-circle']"></i>
              {{ voteMessage }}
            </div>
          </div>

          <!-- Comments Section -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <i class="fa fa-comments mr-2 text-blue-600"></i>评论与证据 ({{ news.comments.length }})
            </h3>
            
            <!-- Add Comment Form -->
            <div class="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
              <div class="mb-4">
                <textarea 
                  v-model="newComment.content" 
                  placeholder="写下您的评论或提供证据..." 
                  class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                  rows="4"
                  :maxlength="500"
                ></textarea>
                <div class="text-right text-xs text-gray-500 mt-1">{{ newComment.content.length }}/500</div>
              </div>
              <div class="mb-4">
                <input 
                  v-model="newComment.imageUrl" 
                  placeholder="证据图片 URL (可选)" 
                  class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <input 
                    v-model="newComment.submitterName" 
                    placeholder="您的姓名" 
                    class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  >
                </div>
                <div class="md:col-span-2 flex justify-end">
                  <button 
                    @click="submitComment" 
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :disabled="!newComment.content.trim() || !newComment.submitterName.trim()"
                  >
                    <i class="fa fa-paper-plane mr-2"></i> 提交评论
                  </button>
                </div>
              </div>
            </div>

            <!-- Comments List -->
            <div v-if="news.comments.length > 0" class="space-y-6">
              <CommentItem 
                v-for="comment in news.comments" 
                :key="comment.id" 
                :comment="comment" 
                @commentUpdated="handleCommentUpdate(comment.id, $event)"
              />
            </div>
            <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <i class="fa fa-comment-o text-2xl"></i>
              </div>
              <h4 class="text-lg font-medium text-gray-700 mb-2">还没有评论</h4>
              <p class="text-gray-500 max-w-md mx-auto">成为第一个评论的人，分享您对这则新闻的看法和证据。</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading/Not Found -->
      <div v-else class="bg-white p-12 rounded-xl shadow-sm text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
          <i class="fa fa-search text-3xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">新闻不存在或已被删除</h3>
        <p class="text-gray-600 max-w-md mx-auto mb-6">抱歉，您请求的新闻无法找到。可能已经被删除或您输入了错误的链接。</p>
        <router-link to="/" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <i class="fa fa-home mr-2"></i> 返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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
const viewCount = ref(Math.floor(Math.random() * 500) + 100) // 模拟浏览量

// New comment form data
const newComment = ref({
  content: '',
  imageUrl: '',
  submitterName: ''
})

// Load news data
onMounted(async () => {
  await newsStore.loadNews()
  news.value = newsStore.getNewsById(newsId)
  
  // Check if user has voted
  if (news.value && news.value.voters && news.value.voters.includes('current-user')) {
    voted.value = news.value.votedByCurrentUser
  }
  
  // Increment view count
  viewCount.value++
  
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

const totalVotes = computed(() => {
  if (!news.value) return 0
  return news.value.fakeVotes + news.value.notFakeVotes
})

// Calculate controversy score
const controversyScore = computed(() => {
  if (!news.value || totalVotes.value === 0) return 0
  const ratio = Math.min(fakePercentage.value, notFakePercentage.value) / 50
  return Math.round(ratio * 100)
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
  
  // Show success message with animation
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

// Handle comment updates from child component
const handleCommentUpdate = () => {
  // Refresh news data from store to get the latest comments, likes and replies
  news.value = newsStore.getNewsById(newsId)
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