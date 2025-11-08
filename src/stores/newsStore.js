import { defineStore } from 'pinia'

// Mock news data
const mockNews = [
  {
    id: '6',
    title: '全球气温持续升高，科学家警告气候危机加剧',
    description: '最新研究显示全球平均温度创历史新高',
    content: '根据国际气象组织发布的最新数据，今年全球平均气温比工业化前水平高出1.56°C，达到有记录以来的最高值。极端天气事件频发，包括热浪、洪水和干旱，对全球粮食安全和生态系统造成严重威胁。多位气候科学家呼吁各国政府加强合作，采取更积极的减排措施，以减缓气候变化的负面影响。该研究已在《自然》期刊上发表，并得到了全球97%以上气候科学家的认可。',
    imageUrl: 'https://picsum.photos/id/111/800/400',  // 环境相关图片
    submitterName: '环保志愿者',
    submitTime: new Date('2024-04-10T09:00:00').toISOString(),
    category: '环境',
    fakeVotes: 15,
    notFakeVotes: 135,
    comments: [
      {
        id: 'c8',
        content: '气候变暖已经不是未来的威胁，而是现在正在发生的现实。我们每个人都应该行动起来，减少碳排放。',
        imageUrl: 'https://picsum.photos/id/110/300/200',  // 环保相关图片
        submitterName: '环保爱好者',
        submitTime: new Date('2024-04-10T10:30:00').toISOString()
      },
      {
        id: 'c9',
        content: '看到这些数据真的很令人担忧，希望政府能出台更有力的环保政策。',
        imageUrl: '',
        submitterName: '普通市民',
        submitTime: new Date('2024-04-10T14:20:00').toISOString()
      }
    ]
  },
  {
    id: '7',
    title: '人工智能实现重大突破，可预测蛋白质结构',
    description: 'AI系统成功预测了2亿种蛋白质的三维结构',
    content: '一家科技公司宣布，他们开发的人工智能系统已经成功预测了超过2亿种蛋白质的三维结构，这一突破将彻底改变生物医学研究领域。该AI系统基于深度学习技术，能够在几分钟内完成传统方法需要数月甚至数年的蛋白质结构预测工作。科学家们表示，这将大大加速新药研发、疾病治疗和生物技术创新的进程。多位诺贝尔奖得主对这一成果给予了高度评价，称其为"科学史上的里程碑"。',
    imageUrl: 'https://picsum.photos/id/180/800/400',  // 技术相关图片
    submitterName: '科技记者',
    submitTime: new Date('2024-04-09T16:00:00').toISOString(),
    category: '技术',
    fakeVotes: 8,
    notFakeVotes: 176,
    comments: [
      {
        id: 'c10',
        content: '这确实是AI在科学研究中的重大应用！蛋白质结构预测一直是生物学的难题，没想到AI能够取得这样的突破。',
        imageUrl: 'https://picsum.photos/id/160/300/200',  // 技术相关图片
        submitterName: '生物学家',
        submitTime: new Date('2024-04-09T17:30:00').toISOString()
      },
      {
        id: 'c11',
        content: '期待这一技术能早日应用到新药开发中，帮助解决更多疾病问题。',
        imageUrl: '',
        submitterName: '医疗工作者',
        submitTime: new Date('2024-04-09T19:00:00').toISOString()
      }
    ]
  },
  {
    id: '1',
    title: '某地出现不明飞行物',
    description: '多位市民声称看到天空中有不明发光物体盘旋',
    content: '据报道，昨晚8点左右，多位市民在城市东部区域声称看到天空中有不明发光物体盘旋。目击者描述该物体呈圆形，发出蓝白色光芒，在空中停留约15分钟后消失。有目击者用手机拍摄到了这一现象，视频显示该物体确实具有不同于常见飞行器的移动模式。目前尚无官方解释，专家表示需要进一步调查以确定其性质。',
    imageUrl: 'https://picsum.photos/id/1/800/400',  // 选择适合UFO主题的图片
    submitterName: '天文爱好者',
    submitTime: new Date('2024-04-15T20:00:00').toISOString(),
    category: '太空',
    fakeVotes: 45,
    notFakeVotes: 28,
    comments: [
      {
        id: 'c1',
        content: '我也看到了！确实很奇怪，它在空中的移动方式不像任何已知的飞机或无人机。',
        imageUrl: 'https://picsum.photos/id/20/300/200',  // 夜空相关图片
        submitterName: '李明',
        submitTime: new Date('2024-04-15T20:15:00').toISOString()
      },
      {
        id: 'c2',
        content: '可能只是无人机或者气象气球吧，现在很多航拍设备也能发出奇怪的光效。',
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
    content: '一篇文章声称某科学家团队发明了一种新型永动机，可以在不消耗能量的情况下持续做功。该文章还附有一些复杂的电路图和实验数据，但没有经过同行评审。多位物理学家表示，该发明违反了热力学第一定律，即能量守恒定律，在现实中是不可能实现的。目前该团队拒绝公开详细实验过程和接受独立验证。',
    imageUrl: 'https://picsum.photos/id/119/800/400',  // 科技相关图片
    submitterName: '科技迷',
    submitTime: new Date('2024-04-14T15:30:00').toISOString(),
    category: '科学',
    fakeVotes: 128,
    notFakeVotes: 5,
    comments: [
      {
        id: 'c3',
        content: '这违反了能量守恒定律！肯定是假的。任何声称能够无中生有产生能量的装置都是违背物理学基本原理的。',
        imageUrl: 'https://picsum.photos/id/129/300/200',  // 科学仪器图片
        submitterName: '物理教师',
        submitTime: new Date('2024-04-14T16:00:00').toISOString()
      }
    ]
  },
  {
    id: '3',
    title: '重大考古发现：秦始皇陵新陪葬坑',
    description: '考古队在秦始皇陵附近发现新的陪葬坑',
    content: '据考古部门消息，近期在秦始皇陵东侧3公里处发现一处新的陪葬坑，面积约200平方米。目前已出土部分陶俑和青铜器，初步判断为秦代晚期文物。考古队负责人表示，这一发现对于研究秦代丧葬制度和工艺水平具有重要价值。文物保护部门已采取措施对现场进行保护，并将进行系统性发掘。',
    imageUrl: 'https://picsum.photos/id/30/800/400',  // 历史相关图片
    submitterName: '历史爱好者',
    submitTime: new Date('2024-04-13T10:00:00').toISOString(),
    category: '历史',
    fakeVotes: 12,
    notFakeVotes: 89,
    comments: [
      {
        id: 'c4',
        content: '这是非常重要的考古发现！希望能有更多关于出土文物的详细报道。',
        imageUrl: '',
        submitterName: '考古学生',
        submitTime: new Date('2024-04-13T11:00:00').toISOString()
      }
    ]
  },
  {
    id: '4',
    title: '异常天气现象：城市上空出现三个太阳',
    description: '多地市民目睹罕见的幻日现象',
    content: '今日上午，本市及周边地区天空中出现了罕见的"三个太阳"现象，引起市民广泛关注。气象专家解释，这是一种名为"幻日"的大气光学现象，是由高空中的冰晶反射和折射阳光形成的。这种现象通常出现在寒冷天气条件下，需要特定的云层和冰晶分布才能形成。气象部门表示，此类现象虽然罕见但属于正常的自然现象，与任何超自然或异常活动无关。',
    imageUrl: 'https://picsum.photos/id/28/800/400',  // 天空/天气相关图片
    submitterName: '气象爱好者',
    submitTime: new Date('2024-04-12T10:30:00').toISOString(),
    category: '天气',
    fakeVotes: 23,
    notFakeVotes: 94,
    comments: [
      {
        id: 'c5',
        content: '我用相机拍到了这一奇观！真的非常壮观。',
        imageUrl: 'https://picsum.photos/id/29/300/200',  // 天空奇观图片
        submitterName: '摄影爱好者',
        submitTime: new Date('2024-04-12T11:00:00').toISOString()
      }
    ]
  },
  {
    id: '5',
    title: '地质学家预测近期将有大地震发生',
    description: '专家警告某地区可能面临严重地震威胁',
    content: '近日，一篇文章引用一位自称"资深地质学家"的言论，预测某地震活跃区域将在未来三个月内发生7级以上大地震。该文章还附有一些看似专业的地质数据图表。然而，当地地震局表示，目前并没有科学依据支持这一预测。地震预测是一个复杂的科学问题，目前的技术手段还无法准确预测地震的具体时间、地点和震级。专家提醒公众不要相信和传播未经官方证实的地震预测信息，以免引起不必要的恐慌。',
    imageUrl: 'https://picsum.photos/id/104/800/400',  // 地质相关图片
    submitterName: '关心时事',
    submitTime: new Date('2024-04-11T14:20:00').toISOString(),
    category: '地质',
    fakeVotes: 78,
    notFakeVotes: 22,
    comments: [
      {
        id: 'c6',
        content: '这种没有具体科学依据的预测很容易引起恐慌，应该谨慎对待。',
        imageUrl: '',
        submitterName: '地质专业学生',
        submitTime: new Date('2024-04-11T15:00:00').toISOString()
      },
      {
        id: 'c7',
        content: '虽然不能准确预测，但我们确实应该做好防震准备。',
        imageUrl: '',
        submitterName: '安全意识强',
        submitTime: new Date('2024-04-11T16:30:00').toISOString()
      }
    ]
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
    // Load news - always use updated mock data to ensure content accuracy
    loadNews() {
      if (this.loaded) return
      

      // 定义不同分类的图片ID映射
      const categoryImages = {
        '太空': [1, 20, 42, 43, 113],
        '天气': [28, 29, 101, 102, 103],
        '地质': [104, 105, 106, 107, 108],
        '环境': [111, 112, 134, 135, 136],
        '科学': [119, 129, 144, 145, 146],
        '技术': [180, 160, 190, 191, 192],
        '历史': [30, 31, 32, 33, 34],
        '其他': [96, 97, 98, 99, 100]
      }
      
      // Always use the latest mock data to ensure content quality and accuracy
      const newsData = JSON.parse(JSON.stringify(mockNews))
      
      // 确保每条新闻都有与分类相关的图片
      this.news = newsData.map(news => {
        // 如果新闻已经有图片URL，保持不变
        if (news.imageUrl) {
          return news
        }
        
        // 如果没有图片URL，根据分类选择相关图片
        const category = news.category || '其他'
        const imageIds = categoryImages[category] || categoryImages['其他']
        const randomIndex = Math.floor(Math.random() * imageIds.length)
        const imageId = imageIds[randomIndex]
        
        return {
          ...news,
          imageUrl: `https://picsum.photos/id/${imageId}/800/400`
        }
      })
      
      this.loaded = true
      
      // Save to localStorage for persistence
      this.saveNews()
    },

    // Save news to localStorage
    saveNews() {
      localStorage.setItem('antiNewsData', JSON.stringify(this.news))
    },

    // Add a new news item
    addNews(newsData) {
      // 定义不同分类的图片ID映射
      const categoryImages = {
        '太空': [1, 20, 42, 43, 113],
        '天气': [28, 29, 101, 102, 103],
        '地质': [104, 105, 106, 107, 108],
        '环境': [111, 112, 134, 135, 136],
        '科学': [119, 129, 144, 145, 146],
        '技术': [180, 160, 190, 191, 192],
        '历史': [30, 31, 32, 33, 34],
        '其他': [96, 97, 98, 99, 100]
      }

      // 当没有提供图片URL时，根据分类选择相关图片
      let imageUrl = newsData.imageUrl
      if (!imageUrl) {
        const category = newsData.category || '其他'
        const imageIds = categoryImages[category] || categoryImages['其他']
        const randomIndex = Math.floor(Math.random() * imageIds.length)
        const imageId = imageIds[randomIndex]
        imageUrl = `https://picsum.photos/id/${imageId}/800/400`
      }

      const newNews = {
        id: Date.now().toString(),
        ...newsData,
        imageUrl,
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