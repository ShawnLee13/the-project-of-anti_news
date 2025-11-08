<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
          <i class="fa fa-plus-circle text-2xl"></i>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
          提交新闻线索
        </h2>
        <p class="text-gray-500 mt-2">帮助社区识别和验证可疑信息</p>
      </div>
      
      <form @submit.prevent="submitNews" class="space-y-6">
        <!-- Title -->
        <div class="space-y-2">
          <label for="title" class="block text-sm font-medium text-gray-700">
            新闻标题 <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="newsData.title"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="请输入新闻标题"
            required
          >
        </div>

        <!-- Short Description -->
        <div class="space-y-2">
          <label for="description" class="block text-sm font-medium text-gray-700">
            简短描述 <span class="text-red-500">*</span>
          </label>
          <input
            id="description"
            v-model="newsData.description"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="请输入新闻简短描述（一句话概括）"
            required
          >
        </div>

        <!-- Full Content -->
        <div class="space-y-2">
          <label for="content" class="block text-sm font-medium text-gray-700">
            完整内容 <span class="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            v-model="newsData.content"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            rows="8"
            placeholder="请输入新闻完整内容，包括您认为可疑的地方和相关背景信息"
            required
          ></textarea>
          <div class="text-right text-xs text-gray-500 mt-1">{{ newsData.content.length }}/2000</div>
        </div>

        <!-- Image URL -->
        <div class="space-y-2">
          <label for="imageUrl" class="block text-sm font-medium text-gray-700">
            图片 URL (可选)
          </label>
          <input
            id="imageUrl"
            v-model="newsData.imageUrl"
            type="url"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="请输入新闻相关图片的URL，如截图、照片等"
          >
          <p class="text-xs text-gray-500 mt-1">支持jpg、png、gif等常见图片格式。若无图片，我们将根据分类自动为您生成相关图片。</p>
        </div>

        <!-- Category -->
        <div class="space-y-2">
          <label for="category" class="block text-sm font-medium text-gray-700">
            新闻分类 <span class="text-red-500">*</span>
          </label>
          <select
            id="category"
            v-model="newsData.category"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
        <div class="space-y-2">
          <label for="submitterName" class="block text-sm font-medium text-gray-700">
            您的姓名 <span class="text-red-500">*</span>
          </label>
          <input
            id="submitterName"
            v-model="newsData.submitterName"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="请输入您的姓名"
            required
          >
        </div>

        <!-- Submit Button -->
        <div class="pt-6">
          <button
            type="submit"
            :disabled="submitting"
            class="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            <i v-if="submitting" class="fa fa-circle-o-notch fa-spin mr-2"></i>
            <i v-else class="fa fa-paper-plane mr-2"></i>
            {{ submitting ? '提交中...' : '提交新闻线索' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Tips Section -->
    <div class="bg-blue-50 rounded-xl p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center">
        <i class="fa fa-lightbulb-o text-blue-600 mr-2"></i>
        提交提示
      </h3>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start">
          <i class="fa fa-check-circle text-blue-600 mt-1 mr-2"></i>
          <span>提供详细的新闻内容和背景信息，有助于社区更好地进行验证</span>
        </li>
        <li class="flex items-start">
          <i class="fa fa-check-circle text-blue-600 mt-1 mr-2"></i>
          <span>如果有截图或其他证据，请提供相关链接</span>
        </li>
        <li class="flex items-start">
          <i class="fa fa-check-circle text-blue-600 mt-1 mr-2"></i>
          <span>选择正确的分类可以帮助更多相关领域的用户关注此新闻</span>
        </li>
        <li class="flex items-start">
          <i class="fa fa-check-circle text-blue-600 mt-1 mr-2"></i>
          <span>提交后，您可以随时回来查看社区的验证结果和讨论</span>
        </li>
      </ul>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-8 p-6 rounded-xl bg-green-100 text-green-800 text-center shadow-md animate-fadeIn">
      <div class="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
        <i class="fa fa-check-circle text-2xl"></i>
      </div>
      <h3 class="text-xl font-semibold mb-2">{{ successMessage }}</h3>
      <p class="text-green-700 mb-4">感谢您为社区贡献力量，我们的志愿者会尽快进行审核</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          <i class="fa fa-home mr-1"></i> 返回首页
        </router-link>
        <router-link
          :to="'/news/' + submittedNewsId"
          class="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow"
        >
          <i class="fa fa-eye mr-1"></i> 查看新闻详情
        </router-link>
      </div>
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

  // Validate content length
  if (newsData.value.content.length > 2000) {
    alert('新闻内容不能超过2000字')
    return
  }

  submitting.value = true

  try {
    // Add news to store
    const newsId = newsStore.addNews(newsData.value)
    submittedNewsId.value = newsId
    
    // Show success message
    successMessage.value = '新闻线索提交成功！'
    
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

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
</style>