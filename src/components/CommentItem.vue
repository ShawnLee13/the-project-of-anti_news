<template>
  <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
    <!-- Comment Header -->
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
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
      <p class="text-gray-700 whitespace-pre-line">{{ comment.content }}</p>
    </div>

    <!-- Comment Image -->
    <div v-if="comment.imageUrl" class="ml-13 mb-2">
      <div class="rounded-lg overflow-hidden border border-gray-200">
        <img 
          :src="comment.imageUrl" 
          alt="Comment evidence" 
          class="w-full max-h-64 object-cover hover:opacity-90 transition-opacity cursor-pointer"
          @click="openImageModal"
        >
      </div>
      <div class="text-xs text-gray-500 mt-1">
        <i class="fa fa-picture-o mr-1"></i> 证据图片
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
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

// Open image in modal (simplified version)
const openImageModal = () => {
  // In a real implementation, this would open a proper modal
  // For now, we'll just open the image in a new tab
  window.open(props.comment.imageUrl, '_blank')
}
</script>

<style scoped>
/* CommentItem specific styles */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>