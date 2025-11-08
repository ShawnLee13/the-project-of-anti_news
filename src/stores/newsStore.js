import { defineStore } from 'pinia'

// 生成模拟数据的函数 - 成员C负责
function generateMockNews() {
  const categories = ['太空', '天气', '地质', '环境', '科学', '技术', '历史']
  const statusTypes = ['fake', 'verified', 'contested', 'pending']
  const submitters = ['用户123', '真相追寻者', '科学爱好者', '事实核查员', '新闻从业者', '普通市民', '学生', '研究员', '环保志愿者', '科技迷']
  const commenters = ['评论用户A', '评论用户B', '热心网友', '专业人士', '普通读者', '行业专家', '关注者', '观察者', '参与者', '求证者']
  
  // 各类别新闻标题模板
  const titleTemplates = {
    '太空': [
      '天文学家发现新的系外行星，可能适合生命存在',
      '某地区夜空出现神秘发光物体，专家解释为大气现象',
      'NASA宣布重大太空发现，火星上存在液态水证据',
      '小行星将在下周近距离掠过地球，无碰撞危险',
      '科学家声称发现外星文明信号，引发广泛讨论',
      '太空垃圾问题日益严重，国际社会呼吁采取行动',
      '新型望远镜将投入使用，有望揭示宇宙奥秘',
      '宇航员在空间站进行重要科学实验',
      '流星雨将在本月中旬达到极大值',
      '天文台捕捉到罕见的超新星爆发图像'
    ],
    '天气': [
      '极端高温天气持续，多地发布高温预警',
      '罕见寒潮来袭，多地降温幅度超过10°C',
      '某地区出现百年一遇的强降雨，引发洪涝灾害',
      '气象部门预测今年台风季将比往年更加活跃',
      '城市上空出现三个太阳，专家解释为幻日现象',
      '龙卷风袭击小镇，造成严重财产损失',
      '沙尘暴天气影响交通，多地航班延误',
      '雷暴天气频繁，市民需注意安全防范',
      '奇异云层引发关注，气象专家解读成因',
      '全球气候变化导致极端天气事件频发'
    ],
    '地质': [
      '地震预警系统成功预测某地区地震，避免重大损失',
      '火山活动加剧，周边居民紧急撤离',
      '地质学家发现大型矿藏，可能改变资源分布格局',
      '山体滑坡阻断交通，救援工作正在进行',
      '地裂缝出现在居民区，专家解释为自然地质现象',
      '温泉水温异常升高，引发关注',
      '海平面上升威胁沿海城市，防护工程启动',
      '板块运动监测显示地震活动增加',
      '地下水位下降问题严重，需采取节水措施',
      '奇怪的地面沉降现象引起科学家关注'
    ],
    '环境': [
      '全球气温持续升高，突破历史记录',
      '森林火灾持续蔓延，生态环境遭受严重破坏',
      '海洋塑料污染问题日益严重，威胁海洋生物',
      '雾霾天气频繁出现，空气质量恶化',
      '珍稀物种数量持续减少，保护工作刻不容缓',
      '城市绿化面积大幅增加，环境质量改善',
      '冰川融化加速，海平面上升趋势明显',
      '湖泊水质恶化，治理工程启动',
      '沙漠化趋势得到有效遏制，生态修复成效显著',
      '大规模植树造林活动取得积极成效'
    ],
    '科学': [
      '科学家成功克隆濒危动物，为保护工作带来希望',
      '新型疫苗研发取得重大突破，临床试验效果显著',
      '量子计算研究取得进展，计算能力大幅提升',
      '永动机研究取得突破性进展，能量守恒定律或将被改写',
      '基因编辑技术应用于疾病治疗，前景广阔',
      '暗物质研究获得新发现，或将揭示宇宙奥秘',
      '新型材料研发成功，具有革命性应用前景',
      '超导体研究取得重大突破，常温超导或将实现',
      '宇宙起源研究获得新证据，大爆炸理论面临挑战',
      '人工智能在科学研究中的应用日益广泛'
    ],
    '技术': [
      '5G技术全面推广，将带来革命性变化',
      '新型智能手机发布，搭载革命性新功能',
      '自动驾驶技术取得重大突破，商业化进程加速',
      '区块链技术应用场景不断拓展，价值凸显',
      '元宇宙概念兴起，科技巨头纷纷布局',
      '量子计算机成功完成复杂计算任务',
      '新型芯片研发成功，性能提升数倍',
      '脑机接口技术取得突破性进展',
      '机器人技术发展迅速，人形机器人走入日常生活',
      '新型电池技术问世，充电速度提升十倍'
    ],
    '历史': [
      '重大考古发现：古墓中出土大量珍贵文物',
      '历史学家发现重要历史文献，或将改写历史认知',
      '古建筑修复工程启动，保护文化遗产',
      '考古学家发现疑似古代文明遗址',
      '历史文物真伪鉴定取得新进展',
      '重要历史档案解密，揭示鲜为人知的历史细节',
      '传统工艺保护工作取得成效，非遗传承后继有人',
      '古代文字破译取得突破，揭开历史谜团',
      '历史纪录片引发广泛关注，促进历史知识普及',
      '历史遗迹保护面临挑战，需全社会共同努力'
    ]
  }
  
  // 生成新闻内容
  function generateContent(category, title, isFake) {
    const fakeIndicators = [
      '据未经验证的消息来源称',
      '一位不愿透露姓名的内部人士透露',
      '有传言称',
      '未经官方证实的报道显示',
      '据社交媒体消息'
    ]
    
    const realIndicators = [
      '根据官方发布的数据',
      '经过专家团队验证',
      '在权威期刊《自然》上发表的研究表明',
      '经过严格的科学实验验证',
      '官方新闻发布会宣布'
    ]
    
    const contentTemplates = {
      '太空': [
        '研究团队使用先进的观测设备对这一现象进行了详细记录和分析。数据显示，这一发现对于理解宇宙的形成和演化具有重要意义。专家表示，这将为相关领域的研究开辟新的方向。',
        '这一现象引起了天文学界的广泛关注。多国天文台联合进行观测，收集了大量宝贵数据。科学家们正在对这些数据进行深入分析，有望在不久的将来公布更多研究成果。',
        '此次发现再次证明了科学探索的重要性。研究人员表示，虽然目前还存在一些未解之谜，但随着技术的进步和研究的深入，这些谜团终将被解开。'
      ],
      '天气': [
        '气象部门密切监测天气变化，及时发布预警信息。专家建议市民做好防护措施，减少不必要的外出。同时，相关部门已经启动应急预案，确保公共安全。',
        '这种天气现象虽然罕见，但在气象学上有明确的解释。气象专家详细介绍了形成原因和发展趋势，呼吁市民关注官方发布的气象信息，不要轻信谣言。',
        '气候变化导致极端天气事件频发已经成为不争的事实。专家呼吁加强环境保护意识，共同应对气候变化带来的挑战。'
      ],
      '地质': [
        '地质部门已经派遣专家团队前往现场进行详细勘查。初步分析结果表明，这一现象是由自然地质活动引起的，目前尚在可控范围内。相关监测工作仍在持续进行。',
        '这一发现对于研究该地区的地质构造和演化历史具有重要价值。地质学家正在进行深入研究，有望为相关领域的学术研究提供新的素材。',
        '面对地质灾害风险，当地政府已经采取了一系列防范措施。专家建议加强地质灾害预警体系建设，提高应对突发事件的能力。'
      ],
      '环境': [
        '环保部门表示将加强监管力度，确保环境问题得到有效解决。同时，呼吁全社会共同参与环境保护，从身边小事做起，共同建设美丽家园。',
        '这一环境问题已经引起了广泛关注。专家团队正在研究解决方案，相关部门也在积极采取措施。相信通过各方努力，环境质量将得到有效改善。',
        '保护环境是每个人的责任。环保组织呼吁大家提高环保意识，减少污染排放，共同守护我们的生态环境。'
      ],
      '科学': [
        '这项研究成果已经发表在国际权威学术期刊上，得到了同行专家的高度评价。研究团队表示，将继续深入研究，争取在相关领域取得更多突破性进展。',
        '科学家们经过长期艰苦的研究，终于取得了这一重要成果。这不仅体现了科学研究的艰辛，也展示了人类探索未知的决心和勇气。',
        '这一发现对于推动相关学科的发展具有重要意义。专家预测，这将为该领域带来革命性的变化，产生广泛的社会和经济效益。'
      ],
      '技术': [
        '这项技术的突破将为相关产业带来巨大的发展机遇。业内专家认为，这标志着该领域进入了一个新的发展阶段。多家科技公司已经开始布局相关产业。',
        '研发团队表示，这项技术的成功得益于长期的技术积累和创新。在未来，他们将继续加大研发投入，推动技术不断进步和应用场景的拓展。',
        '技术的发展正在深刻改变我们的生活方式。专家建议，我们应该积极拥抱新技术，同时也要关注技术发展带来的各种社会问题，确保技术更好地服务于人类。'
      ],
      '历史': [
        '考古学家表示，这一发现对于研究该地区的历史文化具有重要价值。目前，文物保护工作正在有序进行，相关研究也在同步开展。预计不久后将有更多研究成果公布。',
        '历史学家通过对历史文献的深入研究和考证，纠正了一些长期以来的误解。这一研究成果对于我们正确认识历史具有重要意义。',
        '文化遗产是人类共同的财富。保护和传承文化遗产是我们每个人的责任。相关部门正在加大保护力度，确保这些珍贵的文化遗产能够完好地传承给后代。'
      ]
    }
    
    const indicator = isFake ? fakeIndicators[Math.floor(Math.random() * fakeIndicators.length)] : realIndicators[Math.floor(Math.random() * realIndicators.length)]
    const template = contentTemplates[category][Math.floor(Math.random() * contentTemplates[category].length)]
    
    return `${indicator}，${title}。${template}${isFake ? ' 然而，该消息缺乏可靠的证据支持，多位专家对此表示质疑。' : ''}`
  }
  
  // 生成评论
  function generateComments(newsId, count, isFake) {
    const comments = []
    const fakeCommentTemplates = [
      '这明显是假新闻，大家不要相信！',
      '这种消息一看就不可信，没有任何科学依据。',
      '制造这种谣言的人太可恶了，误导公众！',
      '我查了相关资料，没有任何官方信息证实这一点。',
      '请大家理性看待，等待官方的权威信息。'
    ]
    
    const realCommentTemplates = [
      '这个消息我也看到了，确实很有意义。',
      '感谢分享，让我们了解到最新的发展。',
      '有谁知道更多相关的详细信息吗？',
      '这对于相关领域的发展确实是个好消息。',
      '希望能有更多后续报道，了解更多细节。'
    ]
    
    const neutralCommentTemplates = [
      '不知道真假，还是等官方确认吧。',
      '这个消息听起来有点不可思议，需要进一步核实。',
      '大家有什么看法？觉得可信吗？',
      '我觉得还是要理性看待，不要轻易下结论。',
      '有没有专业人士来分析一下这个消息的可信度？'
    ]
    
    for (let i = 0; i < count; i++) {
      let commentTemplate
      if (Math.random() < 0.3) {
        commentTemplate = fakeCommentTemplates
      } else if (Math.random() < 0.6) {
        commentTemplate = realCommentTemplates
      } else {
        commentTemplate = neutralCommentTemplates
      }
      
      comments.push({
        id: `c_${newsId}_${i}`,
        content: commentTemplate[Math.floor(Math.random() * commentTemplate.length)],
        imageUrl: Math.random() > 0.5 ? `https://placehold.co/300x200/e2e8f0/475569?text=评论` : '',
        submitterName: commenters[Math.floor(Math.random() * commenters.length)],
        submitTime: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
      })
    }
    
    return comments
  }
  
  // 生成60条新闻数据
  const news = []
  for (let i = 1; i <= 60; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const titleArray = titleTemplates[category]
    const title = titleArray[Math.floor(Math.random() * titleArray.length)]
    
    // 随机决定新闻真假状态
    const status = statusTypes[Math.floor(Math.random() * statusTypes.length)]
    const isFake = status === 'fake'
    
    // 根据状态生成投票数据
    let fakeVotes, notFakeVotes
    if (status === 'fake') {
      fakeVotes = Math.floor(Math.random() * 100) + 50
      notFakeVotes = Math.floor(Math.random() * 30)
    } else if (status === 'verified') {
      fakeVotes = Math.floor(Math.random() * 30)
      notFakeVotes = Math.floor(Math.random() * 100) + 50
    } else if (status === 'contested') {
      fakeVotes = Math.floor(Math.random() * 50) + 30
      notFakeVotes = Math.floor(Math.random() * 50) + 30
    } else { // pending
      fakeVotes = Math.floor(Math.random() * 10)
      notFakeVotes = Math.floor(Math.random() * 10)
    }
    
    const commentsCount = Math.floor(Math.random() * 5) + 1
    
    news.push({
      id: i.toString(),
      title: title,
      description: title.substring(0, Math.min(title.length, 50)) + '...',
      content: generateContent(category, title, isFake),
      imageUrl: `https://placehold.co/800x400/e2e8f0/475569?text=${encodeURIComponent(category)}`,
      // 如果需要使用picsum的替代方案，可以使用上面的placehold.co或者下面注释的URL
      // imageUrl: `https://placekitten.com/800/400`,
      submitterName: submitters[Math.floor(Math.random() * submitters.length)],
      submitTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      category: category,
      fakeVotes: fakeVotes,
      notFakeVotes: notFakeVotes,
      comments: generateComments(i, commentsCount, isFake)
    })
  }
  
  return news
}

// 生成模拟数据
const mockNews = generateMockNews()

export const useNewsStore = defineStore('news', {
  state: () => ({
    // 新闻数据 - 成员C负责
    news: [],
    loaded: false,
    
    // 筛选条件 - 成员C负责状态管理
    filters: {
      category: 'all',
      status: 'all'
    },
    
    // 分页参数 - 成员C负责状态管理
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0
    },
    
    // 确保我们不会重复创建相同的本地存储数据
    storageInitialized: false
  }),

  getters: {
    // 获取所有新闻
    getAllNews: (state) => state.news,
    
    // 根据ID获取新闻
    getNewsById: (state) => (id) => {
      return state.news.find(news => news.id === id)
    },
    
    // 根据提交者名称获取新闻
    getNewsBySubmitter: (state) => (submitterName) => {
      return state.news.filter(news => news.submitterName === submitterName)
    },
    
    // 根据投票计算新闻状态 - 成员C实现
    getNewsStatus: (state) => (id) => {
      const news = state.news.find(n => n.id === id)
      if (!news) return 'unknown'
      
      const totalVotes = news.fakeVotes + news.notFakeVotes
      if (totalVotes === 0) return 'pending'
      
      const fakePercentage = (news.fakeVotes / totalVotes) * 100
      if (fakePercentage >= 70) return 'fake'
      if (fakePercentage <= 30) return 'verified'
      return 'contested'
    },
    
    // 获取所有可用分类 - 成员C负责
    getAllCategories: () => {
      return ['太空', '天气', '地质', '环境', '科学', '技术', '历史']
    },
    
    // 获取所有可用状态 - 成员C负责
    getAllStatuses: () => {
      return [
        { value: 'all', label: '全部状态' },
        { value: 'pending', label: '待验证' },
        { value: 'fake', label: '假新闻' },
        { value: 'verified', label: '已验证' },
        { value: 'contested', label: '有争议' }
      ]
    },
    
    // 根据筛选条件过滤新闻 - 成员C实现
    getFilteredNews: (state) => {
      let filtered = [...state.news]
      
      // 按分类筛选
      if (state.filters.category && state.filters.category !== 'all') {
        filtered = filtered.filter(news => news.category === state.filters.category)
      }
      
      // 按状态筛选
      if (state.filters.status && state.filters.status !== 'all') {
        filtered = filtered.filter(news => {
          // 计算每条新闻的状态
          const totalVotes = news.fakeVotes + news.notFakeVotes
          let status
          
          if (totalVotes === 0) {
            status = 'pending'
          } else {
            const fakePercentage = (news.fakeVotes / totalVotes) * 100
            if (fakePercentage >= 70) status = 'fake'
            else if (fakePercentage <= 30) status = 'verified'
            else status = 'contested'
          }
          
          return status === state.filters.status
        })
      }
      
      // 按提交时间倒序排列（最新的在前）
      filtered.sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime))
      
      // 更新总项目数
      state.pagination.totalItems = filtered.length
      
      return filtered
    },
    
    // 获取分页后的新闻 - 成员C实现
    getPaginatedNews: (state) => {
      const filtered = state.getFilteredNews
      const startIndex = (state.pagination.currentPage - 1) * state.pagination.pageSize
      const endIndex = startIndex + state.pagination.pageSize
      
      // 更新总页数
      state.pagination.totalPages = Math.ceil(filtered.length / state.pagination.pageSize)
      
      return filtered.slice(startIndex, endIndex)
    }
  },

  actions: {
    // 加载新闻 - 从本地存储或模拟数据初始化 - 成员C负责
    loadNews() {
      // 避免重复加载
      if (this.loaded) return
      
      // 清除旧的localStorage数据以确保使用新的图片URL
      try {
        localStorage.removeItem('antiNewsData')
        console.log('已清除旧的本地存储数据')
      } catch (error) {
        console.error('清除本地存储数据失败:', error)
      }
      
      // 使用模拟数据
      this.news = JSON.parse(JSON.stringify(mockNews))
      this.loaded = true
      
      // 初始化筛选和分页状态
      this.initializeFilterAndPaginationState()
      
      // 保存到本地存储
      this.saveNews()
      
      console.log('使用模拟数据初始化成功')
    },
    
    // 初始化筛选和分页状态 - 成员C负责
    initializeFilterAndPaginationState() {
      try {
        // 尝试从本地存储加载筛选状态
        const storedFilters = localStorage.getItem('antiNewsFilters')
        if (storedFilters) {
          this.filters = { ...this.filters, ...JSON.parse(storedFilters) }
        }
        
        // 尝试从本地存储加载分页状态
        const storedPagination = localStorage.getItem('antiNewsPagination')
        if (storedPagination) {
          this.pagination = { ...this.pagination, ...JSON.parse(storedPagination) }
        }
      } catch (error) {
        console.error('初始化筛选和分页状态失败:', error)
      }
    },

    // 保存新闻到本地存储 - 成员C负责
    saveNews() {
      try {
        localStorage.setItem('antiNewsData', JSON.stringify(this.news))
        console.log('数据已保存到本地存储')
      } catch (error) {
        console.error('保存数据到本地存储失败:', error)
      }
    },
    
    // 保存筛选状态到本地存储 - 成员C负责
    saveFilters() {
      try {
        localStorage.setItem('antiNewsFilters', JSON.stringify(this.filters))
      } catch (error) {
        console.error('保存筛选状态失败:', error)
      }
    },
    
    // 保存分页状态到本地存储 - 成员C负责
    savePagination() {
      try {
        localStorage.setItem('antiNewsPagination', JSON.stringify({
          currentPage: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }))
      } catch (error) {
        console.error('保存分页状态失败:', error)
      }
    },
    
    // 更新筛选条件 - 成员C负责
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
      
      // 重置当前页为第一页
      this.pagination.currentPage = 1
      
      // 保存筛选状态
      this.saveFilters()
    },
    
    // 更新分页参数 - 成员C负责
    updatePagination(page, pageSize) {
      if (page !== undefined) {
        this.pagination.currentPage = page
      }
      if (pageSize !== undefined && pageSize !== this.pagination.pageSize) {
        this.pagination.pageSize = pageSize
        this.pagination.currentPage = 1 // 当每页大小改变时，重置到第一页
      }
      
      // 保存分页状态
      this.savePagination()
    },

    // 添加新闻 - 成员C改进保存机制
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
      
      // 如果添加的新闻符合当前筛选条件，需要重新计算分页
      const filtered = this.getFilteredNews
      this.pagination.totalItems = filtered.length
      this.pagination.totalPages = Math.ceil(filtered.length / this.pagination.pageSize)
      
      return newNews.id
    },

    // 对新闻进行投票 - 成员C改进保存机制
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

    // 添加评论 - 成员C改进保存机制
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