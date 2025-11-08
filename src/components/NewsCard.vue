<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-fadeIn">
    <!-- News Image with Overlay -->
    <div v-if="news.imageUrl" class="w-full h-48 sm:h-56 overflow-hidden relative group">
      <img 
        :src="news.imageUrl" 
        :alt="news.title" 
        class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      >
      <!-- Category badge on image -->
      <div class="absolute top-4 left-4">
        <span class="text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full shadow-sm">
          {{ news.category }}
        </span>
      </div>
      <!-- Status badge on image -->
      <div v-if="status" class="absolute top-4 right-4">
        <span class="text-xs font-medium px-3 py-1.5 rounded-full shadow-sm" :class="statusClass">
          {{ statusText }}
        </span>
      </div>
      <!-- Gradient overlay for better text visibility -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div class="p-4 text-white w-full">
          <div class="flex justify-between items-center">
            <p class="text-sm font-medium flex items-center">
              <i class="fa fa-eye mr-1.5"></i> {{ Math.floor(Math.random() * 500) + 100 }} 浏览
            </p>
            <p class="text-sm font-medium flex items-center">
              <i class="fa fa-comments-o mr-1.5"></i> {{ news.comments.length }} 评论
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
      <div class="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500">
        <i class="fa fa-newspaper-o text-3xl"></i>
      </div>
      <!-- Category badge -->
      <div class="absolute top-4 left-4">
        <span class="text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full shadow-sm">
          {{ news.category }}
        </span>
      </div>
      <!-- Status badge -->
      <div v-if="status" class="absolute top-4 right-4">
        <span class="text-xs font-medium px-3 py-1.5 rounded-full shadow-sm" :class="statusClass">
          {{ statusText }}
        </span>
      </div>
    </div>

    <!-- News Content -->
    <div class="p-6">
      <!-- Title with hover effect -->
        <h3 class="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          <router-link :to="'/news/' + news.id" class="block hover:underline decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg p-1 -mx-1">
            {{ news.title }}
          </router-link>
        </h3>

      <!-- Description -->
        <p class="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">{{ news.description }}</p>

      <!-- Footer -->
      <div class="flex justify-between items-center text-xs text-gray-500 mb-4">
        <div class="flex items-center space-x-1">
          <i class="fa fa-user-o"></i> <span>{{ news.submitterName }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="fa fa-clock-o"></i> <span>{{ formatDate(news.submitTime) }}</span>
        </div>
      </div>

      <!-- Voting Summary -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex flex-col space-y-3">
            <div class="text-gray-600 text-sm flex items-center space-x-1">
              <i class="fa fa-bar-chart"></i> <span>投票: {{ totalVotes }} 票</span>
            </div>
            <div v-if="totalVotes > 0">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center text-red-500 text-sm font-medium space-x-1">
                  <i class="fa fa-times-circle"></i>
                  <span>{{ fakePercentage }}%</span>
                </div>
                <div class="flex items-center text-green-500 text-sm font-medium space-x-1">
                  <i class="fa fa-check-circle"></i>
                  <span>{{ notFakePercentage }}%</span>
                </div>
              </div>
              <!-- Progress bar -->
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: fakePercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

      <!-- Comments and Actions -->
        <div class="mt-4 flex justify-between items-center">
          <router-link 
            :to="'/news/' + news.id + '#comments'" 
            class="flex items-center text-gray-500 hover:text-blue-600 transition-colors cursor-pointer p-1.5 rounded-full hover:bg-blue-50"
          >
            <i class="fa fa-comments-o mr-1.5"></i>
            <span class="text-sm">{{ news.comments.length }} 条评论</span>
          </router-link>
          <div class="flex items-center gap-3">
            <button 
              class="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="分享"
              @click="shareNews"
            >
              <i class="fa fa-share-alt"></i>
            </button>
            <button 
              class="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="收藏"
              @click="toggleBookmark"
            >
              <i :class="['fa', isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o', isBookmarked ? 'text-blue-600' : '']"></i>
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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

// Share news functionality
const shareNews = () => {
  if (navigator.share) {
    navigator.share({
      title: props.news.title,
      text: props.news.description,
      url: window.location.origin + '/news/' + props.news.id
    }).catch(error => {
      console.error('分享失败:', error)
      // Fallback for browsers that don't support Share API
      copyShareLink()
    })
  } else {
    // Fallback for browsers that don't support Share API
    copyShareLink()
  }
}

// Copy share link to clipboard
const copyShareLink = () => {
  const shareUrl = window.location.origin + '/news/' + props.news.id
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('链接已复制到剪贴板！')
  }).catch(error => {
    console.error('复制失败:', error)
    // Last fallback: select and copy manually
    const tempInput = document.createElement('input')
    tempInput.value = shareUrl
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    alert('链接已复制到剪贴板！')
  })
}

// Bookmark functionality
const isBookmarked = ref(false)
const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  // In a real app, you would save this to localStorage or a database
  if (isBookmarked.value) {
    // Add to bookmarks
    if (typeof localStorage !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
      if (!bookmarks.includes(props.news.id)) {
        bookmarks.push(props.news.id)
        localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks))
      }
    }
    alert('已添加到收藏！')
  } else {
    // Remove from bookmarks
    if (typeof localStorage !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
      const updatedBookmarks = bookmarks.filter(id => id !== props.news.id)
      localStorage.setItem('newsBookmarks', JSON.stringify(updatedBookmarks))
    }
    alert('已取消收藏！')
  }
}

// Initialize bookmark status
if (typeof localStorage !== 'undefined') {
  const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
  isBookmarked.value = bookmarks.includes(props.news.id)
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

/* Animation for hover effects */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Custom scrollbar for description */
.line-clamp-2::-webkit-scrollbar {
  display: none;
}
</style>