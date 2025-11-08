# Anti-News Platform

A community-based collaborative platform against fake news, which realizes the crowdsourcing verification of news authenticity through user reporting, voting, commenting and evidence sharing.

## 🔗 Project Links
- **Deployed Site**: [Anti-News Platform on Vercel](https://anti-news-platform.vercel.app)
- **GitHub Repository**: [github.com/your-username/anti-news-platform](https://github.com/your-username/anti-news-platform)

## 👥 Our Team
- **20232051 LiShengliang**
- **20232048 XieQinxi**
- **20232104 XieXingkai******

## 🛠️ Tech Stack
- **Frontend Framework**: Vue 3 + Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Icon Library**: Font Awesome
- **Deployment Platform**: Vercel

## ✨ Key Features
### 1. News Management Module
- ✅ Support user submission of news (title, brief description, full content, image URL, reporter name)
- ✅ Implement news detail page to display full news information
- ✅ Integrate with Pinia state management for efficient data sharing
- ✅ Implement local data storage via localStorage

### 2. Community Voting & Commenting Module
- ✅ Voting functionality: Support voting "fake news" or "not fake news"
- ✅ Commenting functionality: Support text comments and supporting image URLs
- ✅ Real-time update of voting ratios and news status
- ✅ Provide immediate visual feedback

### 3. User Experience Features
- Responsive design for all device sizes
- Intuitive and user-friendly interface
- Smooth animations and transitions

## 📁 Project Structure
```
├── src/
│   ├── components/        # Reusable components
│   │   ├── NewsCard.vue   # News card component
│   │   └── CommentItem.vue # Comment item component
│   ├── views/            # Page components
│   │   ├── HomeView.vue  # Homepage - News list
│   │   ├── NewsDetailView.vue # News detail page
│   │   └── SubmitNewsView.vue # Submit news page
│   ├── stores/           # Pinia state management
│   │   └── newsStore.js  # News data management
│   ├── router/           # Vue Router configuration
│   │   └── index.js      # Route definitions
│   ├── App.vue           # Root component
│   └── main.js           # Application entry file
├── public/               # Static assets
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── index.html            # HTML entry file
```

## 🚀 Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Install dependencies
   ```bash
   npm install
   ```

2. Start development server
   ```bash
   npm run dev
   ```

3. Build for production
   ```bash
   npm run build
   ```

4. Preview production build
   ```bash
   npm run preview
   ```

## 💾 Data Storage
- The project uses browser's `localStorage` to store news, voting and comment data
- Data persists after page refresh but will not be visible in different browsers or after clearing browser cache
- The project includes mock data that initializes automatically on first load

## 👥 Team Responsibilities
- **Member A**: News Management Module, Community Voting & Commenting Module (Implemented)
- **Member B**: Filtering & Pagination Module, UI & Interaction Module (To be implemented)
- **Member C**: Data & Deployment Module (To be implemented)

## 📋 To-Do List
1. Complete filtering and pagination functionality (Member B)
2. Optimize responsive design and UI interactions (Member B)
3. Generate more mock data (Member C)
4. Configure Vercel deployment (Member C)
5. Implement user authentication functionality
6. Add unit tests and E2E tests