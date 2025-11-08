<template>
  <div class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
    <!-- Comment Header -->
    <div class="p-4">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mr-3 shadow-sm">
            <i class="fa fa-user"></i>
          </div>
          <div>
            <div class="font-medium text-gray-800">{{ comment.submitterName }}</div>
            <div class="text-xs text-gray-500">{{ formatDate(comment.submitTime) }}</div>
          </div>
        </div>
      </div>

      <!-- Comment Content -->
      <div class="ml-13 mb-3">
        <p class="text-gray-700 whitespace-pre-line leading-relaxed">{{ comment.content }}</p>
      </div>

      <!-- Comment Image -->
      <div v-if="comment.imageUrl" class="ml-13 mb-4">
        <div class="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
          <img 
            :src="comment.imageUrl" 
            alt="Comment evidence" 
            class="w-full max-h-64 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            @click="openImageModal"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button class="bg-white/90 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white transition-colors transform hover:scale-105">
              <i class="fa fa-search-plus mr-1"></i> 查看大图
            </button>
          </div>
        </div>
        <div class="text-xs text-gray-500 mt-1 flex items-center">
          <i class="fa fa-picture-o mr-1"></i> 证据图片
        </div>
      </div>

      <!-- Comment Actions -->
      <div class="ml-13 flex items-center space-x-6 pt-1">
        <button 
          @click="toggleLike" 
          class="flex items-center text-sm text-gray-500 hover:text-red-500 transition-all duration-200 px-3 py-1 rounded-full hover:bg-red-50"
        >
          <i :class="['fa', liked ? 'fa-heart' : 'fa-heart-o', liked ? 'text-red-500' : '']"></i>
          <span class="ml-1">{{ comment.likes || 0 }}</span>
        </button>
        <button 
          @click="replyToComment" 
          class="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-all duration-200 px-3 py-1 rounded-full hover:bg-blue-50"
        >
          <i class="fa fa-reply"></i>
          <span class="ml-1">回复</span>
        </button>
      </div>
    </div>

    <!-- Reply Form (if showing) -->
    <div v-if="showReplyForm" class="border-t border-gray-100 p-4 bg-gray-50">
      <textarea 
        ref="replyTextarea"
        v-model="replyContent" 
        placeholder="回复 @{{ comment.submitterName }}..." 
        class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 mb-3"
        rows="2"
        :maxlength="200"
      ></textarea>
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-500">{{ replyContent.length }}/200</span>
        <div class="flex space-x-2">
          <button 
            @click="cancelReply" 
            class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            取消
          </button>
          <button 
            @click="submitReply" 
            class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            :disabled="!replyContent.trim() || !replySubmitterName.trim()"
          >
            回复
          </button>
        </div>
      </div>
    </div>

    <!-- Replies List -->
    <div v-if="comment.replies && comment.replies.length > 0" class="border-t border-gray-100">
      <div class="pl-12 pr-4 pt-2 pb-1">
        <div class="text-xs text-gray-500 mb-3 flex items-center">
          <i class="fa fa-comments-o mr-1"></i>
          <span>共 {{ comment.replies.length }} 条回复</span>
        </div>
        <div class="space-y-2">
          <div 
              v-for="reply in comment.replies" 
              :key="reply.id" 
              class="text-sm p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 animate-fadeIn"
              :style="{ animationDelay: `${reply.id.slice(-1) * 0.1}s` }"
            >
              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                  <i class="fa fa-user text-xs"></i>
                </div>
                <div>
                  <div class="flex items-start">
                    <span class="font-medium text-gray-800 mr-1">@{{ reply.submitterName }}:</span>
                    <span class="text-gray-700">{{ reply.content }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1 ml-0">{{ formatDate(reply.submitTime) }}</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useNewsStore } from '../stores/newsStore.js'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['commentUpdated'])
const newsStore = useNewsStore()

// State for comment interactions
const liked = ref(false)
const showReplyForm = ref(false)
const replyContent = ref('')
const replySubmitterName = ref('') // This would come from user auth in a real app
const replyTextarea = ref(null)

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

// Open image in modal
const openImageModal = () => {
  window.open(props.comment.imageUrl, '_blank')
}

// Toggle like on comment
const toggleLike = () => {
  // In a real app, we would update this in the store
  // For now, we'll just update locally and emit an event
  liked.value = !liked.value
  
  // Create a copy of the comment with updated likes
  const updatedComment = {
    ...props.comment,
    likes: (props.comment.likes || 0) + (liked.value ? 1 : -1)
  }
  
  emit('commentUpdated', updatedComment)
}

// Show/hide reply form
const replyToComment = () => {
  showReplyForm.value = !showReplyForm.value
  if (showReplyForm.value) {
    // Focus the textarea when showing reply form
    setTimeout(() => {
      const textarea = document.querySelector(`textarea[placeholder="回复 @${props.comment.submitterName}..."]`)
      if (textarea) textarea.focus()
    }, 100)
  }
}

// Cancel reply
const cancelReply = () => {
  replyContent.value = ''
  showReplyForm.value = false
}

// Submit reply
const submitReply = () => {
  if (!replyContent.trim()) return
  
  // In a real app, we would add this to the store
  const newReply = {
    id: Date.now().toString(),
    content: replyContent.value,
    submitterName: replySubmitterName.value || '匿名用户',
    submitTime: new Date().toISOString()
  }
  
  // Create a copy of the comment with the new reply
  const updatedComment = {
    ...props.comment,
    replies: [...(props.comment.replies || []), newReply]
  }
  
  emit('commentUpdated', updatedComment)
  
  // Reset form
  replyContent.value = ''
  showReplyForm.value = false
}
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}

/* Animation for comment appearance */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply animation to comments */
.bg-white {
  animation: fadeIn 0.3s ease-out;
}

/* Make images clickable with cursor change */
img:hover {
  cursor: pointer;
}

/* Style for the like button to have a heart beat animation on click */
.fa-heart {
  animation: heartBeat 0.3s ease-in-out;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>