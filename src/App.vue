<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600 flex items-center group">
          <i class="fa fa-shield mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
          社交反假新闻平台
        </h1>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-2 py-1 rounded-md hover:bg-blue-50"
          >
            <i class="fa fa-home mr-1"></i> 首页
          </router-link>
          <router-link 
            to="/trending" 
            class="text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-2 py-1 rounded-md hover:bg-blue-50"
          >
            <i class="fa fa-fire mr-1"></i> 热门
          </router-link>
          <router-link 
            to="/categories" 
            class="text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-2 py-1 rounded-md hover:bg-blue-50"
          >
            <i class="fa fa-th-large mr-1"></i> 分类
          </router-link>
          <router-link 
            to="/statistics" 
            class="text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-2 py-1 rounded-md hover:bg-blue-50"
          >
            <i class="fa fa-bar-chart mr-1"></i> 统计
          </router-link>
          <router-link 
            to="/submit" 
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <i class="fa fa-plus mr-1"></i> 提交新闻
          </router-link>
        </div>
        
        <!-- Mobile Navigation Toggle -->
        <button 
          class="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          @click="toggleMobileMenu"
        >
          <i class="fa fa-bars text-xl"></i>
        </button>
      </div>
      
      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-100">
        <div class="container mx-auto px-4 py-2 space-y-2">
          <router-link 
            to="/" 
            class="block text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-4 py-2 rounded-md hover:bg-blue-50"
            @click="toggleMobileMenu"
          >
            <i class="fa fa-home mr-2"></i> 首页
          </router-link>
          <router-link 
            to="/trending" 
            class="block text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-4 py-2 rounded-md hover:bg-blue-50"
            @click="toggleMobileMenu"
          >
            <i class="fa fa-fire mr-2"></i> 热门
          </router-link>
          <router-link 
            to="/categories" 
            class="block text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-4 py-2 rounded-md hover:bg-blue-50"
            @click="toggleMobileMenu"
          >
            <i class="fa fa-th-large mr-2"></i> 分类
          </router-link>
          <router-link 
            to="/statistics" 
            class="block text-gray-600 hover:text-blue-600 transition-colors flex items-center font-medium px-4 py-2 rounded-md hover:bg-blue-50"
            @click="toggleMobileMenu"
          >
            <i class="fa fa-bar-chart mr-2"></i> 统计
          </router-link>
          <router-link 
            to="/submit" 
            class="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center font-medium mt-2"
            @click="toggleMobileMenu"
          >
            <i class="fa fa-plus mr-2"></i> 提交新闻
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section v-if="$route.path === '/'" class="mb-12 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl overflow-hidden shadow-lg relative">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.2)_0%,transparent_20%)]"></div>
          <div class="absolute w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.2)_0%,transparent_20%)]"></div>
        </div>
        <div class="container mx-auto px-6 py-12 md:py-20 relative z-10">
          <div class="max-w-3xl">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-4 drop-shadow-lg text-shadow">
              打击假新闻，维护网络信息真实性
            </h2>
            <p class="text-lg md:text-xl text-red-500 mb-8 drop-shadow-lg text-shadow">
              共同参与验证新闻真伪，让每个人都能接触到可靠的信息来源
            </p>
            <div class="flex flex-wrap gap-4">
            <a 
              href="/submit" 
              class="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-pointer"
            >
              <i class="fa fa-plus-circle mr-2"></i> 提交可疑新闻
            </a>
            <a 
              href="/trending" 
              class="bg-transparent border-2 border-white text-red-500 px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-pointer"
            >
              <i class="fa fa-fire mr-2"></i> 查看热门讨论
            </a>
          </div>
          </div>
        </div>
      </section>

      <!-- Content Area -->
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <i class="fa fa-shield mr-2"></i>
              社交反假新闻平台
            </h3>
            <p class="text-gray-300 mb-4">
              我们致力于通过社区力量识别和标记网络上的虚假信息，创造一个更加可信的网络环境。
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white transition-colors"><i class="fa fa-facebook"></i></a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors"><i class="fa fa-twitter"></i></a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors"><i class="fa fa-instagram"></i></a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors"><i class="fa fa-github"></i></a>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">快速链接</h4>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-300 hover:text-white transition-colors">首页</router-link></li>
              <li><router-link to="/trending" class="text-gray-300 hover:text-white transition-colors">热门新闻</router-link></li>
              <li><router-link to="/submit" class="text-gray-300 hover:text-white transition-colors">提交新闻</router-link></li>
              <li><router-link to="/statistics" class="text-gray-300 hover:text-white transition-colors">统计数据</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">新闻分类</h4>
            <ul class="space-y-2">
              <li><router-link to="/categories?type=太空" class="text-gray-300 hover:text-white transition-colors">太空</router-link></li>
              <li><router-link to="/categories?type=天气" class="text-gray-300 hover:text-white transition-colors">天气</router-link></li>
              <li><router-link to="/categories?type=技术" class="text-gray-300 hover:text-white transition-colors">技术</router-link></li>
              <li><router-link to="/categories?type=科学" class="text-gray-300 hover:text-white transition-colors">科学</router-link></li>
              <li><router-link to="/categories?type=环境" class="text-gray-300 hover:text-white transition-colors">环境</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">关于我们</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">项目介绍</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">团队成员</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">隐私政策</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">使用条款</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 社交反假新闻平台 - 让网络信息更可信</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useNewsStore } from './stores/newsStore.js'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Load news data when the app mounts
onMounted(() => {
  const newsStore = useNewsStore()
  newsStore.loadNews()
})
</script>

<style>
/* Global styles - Tailwind CSS will handle most styling */
/* Custom text shadow for better readability */
.text-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.2);
}

/* Custom animation classes */
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
  animation: fadeIn 0.5s ease-out forwards;
}

/* Custom focus styles for better accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
  border-radius: 0.375rem;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Fix for iOS touch targets */
@media (hover: none) {
  button,
a {
    touch-action: manipulation;
  }
}
</style>