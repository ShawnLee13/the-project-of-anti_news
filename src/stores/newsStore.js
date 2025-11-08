import { defineStore } from 'pinia'

// Mock news data
const mockNews = [
  {
    id: '1',
    title: '某地出现不明飞行物',
    description: '多位市民声称看到天空中有不明发光物体盘旋',
    content: '据报道，昨晚8点左右，多位市民在城市东部区域声称看到天空中有不明发光物体盘旋。目击者描述该物体呈圆形，发出蓝白色光芒，在空中停留约15分钟后消失。目前尚无官方解释。',
    imageUrl: 'https://picsum.photos/id/1/800/400',
    submitterName: '天文爱好者',
    submitTime: new Date('2024-04-15T20:00:00').toISOString(),
    category: '太空',
    fakeVotes: 45,
    notFakeVotes: 28,
    comments: [
      {
        id: 'c1',
        content: '我也看到了！确实很奇怪。',
        imageUrl: 'https://picsum.photos/id/20/300/200',
        submitterName: '李明',
        submitTime: new Date('2024-04-15T20:15:00').toISOString()
      },
      {
        id: 'c2',
        content: '可能只是无人机或者气象气球吧',
        imageUrl: '',
        submitterName: '王科学',
        submitTime: new Date('2024-04-15T20:30:00').toISOString()
      }
    ]
  },
  {
    id: '2',
    title: '新型永动机问世',
    description: '科学家声称发明了可以无限做功的机器',
    content: '一篇文章声称某科学家团队发明了一种新型永动机，可以在不消耗能量的情况下持续做功。该文章还附有一些复杂的电路图和实验数据，但没有经过同行评审。',
    imageUrl: 'https://picsum.photos/id/2/800/400',
    submitterName: '科技迷',
    submitTime: new Date('2024-04-14T15:30:00').toISOString(),
    category: '科学',
    fakeVotes: 128,
    notFakeVotes: 5,
    comments: [
      {
        id: 'c3',
        content: '这违反了能量守恒定律！肯定是假的。',
        imageUrl: 'https://picsum.photos/id/30/300/200',
        submitterName: '物理教师',
        submitTime: new Date('2024-04-14T16:00:00').toISOString()
      }
    ]
  },
  {
    id: '3',
    title: '重大考古发现：秦始皇陵新陪葬坑',
    description: '考古队在秦始皇陵附近发现新的陪葬坑',
    content: '据考古部门消息，近期在秦始皇陵东侧3公里处发现一处新的陪葬坑，面积约200平方米。目前已出土部分陶俑和青铜器，初步判断为秦代晚期文物。',
    imageUrl: 'https://picsum.photos/id/3/800/400',
    submitterName: '历史爱好者',
    submitTime: new Date('2024-04-13T10:00:00').toISOString(),
    category: '历史',
    fakeVotes: 12,
    notFakeVotes: 89,
    comments: []
  }
]

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
    loaded: false
  }),

  getters: {
    // Get all news
    getAllNews: (state) => state.news,
    
    // Get news by ID
    getNewsById: (state) => (id) => {
      return state.news.find(news => news.id === id)
    },
    
    // Get news by submitter name
    getNewsBySubmitter: (state) => (submitterName) => {
      return state.news.filter(news => news.submitterName === submitterName)
    },
    
    // Calculate news status based on votes
    getNewsStatus: (state) => (id) => {
      const news = state.news.find(n => n.id === id)
      if (!news) return 'unknown'
      
      const totalVotes = news.fakeVotes + news.notFakeVotes
      if (totalVotes === 0) return 'pending'
      
      const fakePercentage = (news.fakeVotes / totalVotes) * 100
      if (fakePercentage >= 70) return 'fake'
      if (fakePercentage <= 30) return 'verified'
      return 'contested'
    }
  },

  actions: {
    // Load news from localStorage or use mock data
    loadNews() {
      if (this.loaded) return
      
      const savedNews = localStorage.getItem('antiNewsData')
      if (savedNews) {
        try {
          this.news = JSON.parse(savedNews)
        } catch (error) {
          console.error('Failed to parse saved news data:', error)
          this.news = mockNews
        }
      } else {
        this.news = mockNews
      }
      
      this.loaded = true
    },

    // Save news to localStorage
    saveNews() {
      localStorage.setItem('antiNewsData', JSON.stringify(this.news))
    },

    // Add a new news item
    addNews(newsData) {
      const newNews = {
        id: Date.now().toString(),
        ...newsData,
        submitTime: new Date().toISOString(),
        fakeVotes: 0,
        notFakeVotes: 0,
        comments: []
      }
      
      this.news.unshift(newNews)
      this.saveNews()
      
      return newNews.id
    },

    // Vote on a news item
    voteOnNews(newsId, voteType) {
      const news = this.news.find(n => n.id === newsId)
      if (news) {
        if (voteType === 'fake') {
          news.fakeVotes++
        } else if (voteType === 'notFake') {
          news.notFakeVotes++
        }
        this.saveNews()
      }
    },

    // Add a comment to a news item
    addComment(newsId, commentData) {
      const news = this.news.find(n => n.id === newsId)
      if (news) {
        const newComment = {
          id: Date.now().toString(),
          ...commentData,
          submitTime: new Date().toISOString()
        }
        
        news.comments.push(newComment)
        this.saveNews()
      }
    }
  }
})