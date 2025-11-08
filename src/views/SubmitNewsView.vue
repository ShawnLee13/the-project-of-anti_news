<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      <i class="fa fa-plus-circle text-blue-600 mr-2"></i>
      提交新闻
    </h2>
    
    <form @submit.prevent="submitNews" class="space-y-6">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
          新闻标题 <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          v-model="newsData.title"
          type="text"
          class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入新闻标题"
          required
        >
      </div>

      <!-- Short Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
          简短描述 <span class="text-red-500">*</span>
        </label>
        <input
          id="description"
          v-model="newsData.description"
          type="text"
          class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入新闻简短描述"
          required
        >
      </div>

      <!-- Full Content -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
          完整内容 <span class="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          v-model="newsData.content"
          class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="6"
          placeholder="请输入新闻完整内容，包括您认为可疑的地方"
          required
        ></textarea>
      </div>

      <!-- Image URL -->
      <div>
        <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-1">
          图片 URL (可选)
        </label>
        <input
          id="imageUrl"
          v-model="newsData.imageUrl"
          type="url"
          class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入新闻相关图片的URL，如截图、照片等"
        >
        <p class="text-xs text-gray-500 mt-1">支持jpg、png、gif等常见图片格式</p>
      </div>

      <!-- Category -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
          新闻分类 <span class="text-red-500">*</span>
        </label>
        <select
          id="category"
          v-model="newsData.category"
          class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">请选择新闻分类</option>
          <option value="太空">太空</option>
          <option value="天气">天气</option>
          <option value="地质">地质</option>
          <option value="环境">环境</option>
          <option value="科学">科学</option>
          <option value="技术">技术</option>
          <option value="历史">历史</option>
          <option value="其他">其他</option>
        </select>
      </div>

      <!-- Submitter Name -->
      <div>
        <label for="submitterName" class="block text-sm font-medium text-gray-700 mb-1">
          您的姓名 <span class="text-red-500">*</span>
        </label>
        <input
          id="submitterName"
          v-model="newsData.submitterName"
          type="text"
          class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入您的姓名"
          required
        >
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="submitting"
          class="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <i v-if="submitting" class="fa fa-circle-o-notch fa-spin mr-2"></i>
          <i v-else class="fa fa-paper-plane mr-2"></i>
          {{ submitting ? '提交中...' : '提交新闻' }}
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-6 p-4 rounded-md bg-green-100 text-green-800 text-center">
      <i class="fa fa-check-circle text-xl mb-2"></i>
      <p>{{ successMessage }}</p>
      <router-link
        :to="'/news/' + submittedNewsId"
        class="mt-2 inline-block text-blue-600 hover:underline"
      >
        查看新闻详情
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '../stores/newsStore.js'

const router = useRouter()
const newsStore = useNewsStore()
const submitting = ref(false)
const successMessage = ref('')
const submittedNewsId = ref('')

// News form data
const newsData = ref({
  title: '',
  description: '',
  content: '',
  imageUrl: '',
  category: '',
  submitterName: ''
})

// Submit news function
const submitNews = async () => {
  // Validate form
  if (!newsData.value.title || 
      !newsData.value.description || 
      !newsData.value.content || 
      !newsData.value.category || 
      !newsData.value.submitterName) {
    return
  }

  submitting.value = true

  try {
    // Add news to store
    const newsId = newsStore.addNews(newsData.value)
    submittedNewsId.value = newsId
    
    // Show success message
    successMessage.value = '新闻提交成功！感谢您的贡献。'
    
    // Reset form
    newsData.value = {
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      category: '',
      submitterName: ''
    }
  } catch (error) {
    console.error('提交新闻失败:', error)
    alert('提交新闻失败，请稍后再试。')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* SubmitNewsView specific styles */
</style>