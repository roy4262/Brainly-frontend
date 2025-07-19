# 🧠 Brainely - Your Second Brain

A modern, intuitive content management application that helps you organize, store, and share your digital knowledge. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

Brainely is a personal knowledge management system designed to be your "second brain" - a digital space where you can collect, organize, and access all your important content from various sources like YouTube videos, Twitter posts, documents, and web links.

## ✨ Key Features

### 🔐 User Authentication
- **Secure Sign In/Sign Up**: JWT-based authentication system
- **Protected Routes**: Dashboard and content areas are protected from unauthorized access
- **Session Management**: Automatic token handling and logout functionality

### 📚 Content Management
- **Multi-Source Support**: Add content from various platforms:
  - 🎥 YouTube videos
  - 🐦 Twitter/X posts
  - 📄 Documents
  - 🔗 Web links
  - 🏷️ HashTags
- **Easy Content Addition**: Simple modal interface for adding new content
- **Content Organization**: Categorize and filter content by type

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Intuitive Navigation**: Fixed sidebar with content type filters
- **Grid Layout**: Responsive card-based content display
- **Mobile Friendly**: Fully responsive design that works on all devices

### 🔄 Content Filtering & Organization
- **Filter by Type**: Quickly filter content by platform (YouTube, Twitter, Links, etc.)
- **Visual Categories**: Icon-based navigation for easy content type identification
- **Search & Browse**: Efficient content discovery and management

### 🚀 Sharing Capabilities
- **Brain Sharing**: Generate shareable links to your entire content collection
- **Public Access**: Share your curated knowledge with others
- **Secure Sharing**: Token-based sharing system

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and development server

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot module replacement
- **Modern Browser Support** - ES6+ features

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button component
│   ├── Card.tsx        # Content display cards
│   ├── CreateContent.tsx # Content creation modal
│   ├── ErrorBoundary.tsx # Error handling wrapper
│   ├── InputField.tsx  # Form input component
│   ├── SideBar.tsx     # Navigation sidebar
│   └── SideBarItem.tsx # Sidebar navigation items
├── pages/              # Application pages
│   ├── DashBoard.tsx   # Main dashboard page
│   ├── SignIn.tsx      # User authentication
│   ├── SignUp.tsx      # User registration
│   └── NotFound.tsx    # 404 error page
├── hooks/              # Custom React hooks
│   └── useContent.tsx  # Content fetching hook
├── icons/              # SVG icon components
│   ├── CrossIcon.tsx   # Close/cancel icon
│   ├── DeleteIcon.tsx  # Delete action icon
│   ├── HashIcon.tsx    # Hashtag icon
│   ├── LinkIcon.tsx    # Web link icon
│   ├── PlusIcon.tsx    # Add content icon
│   ├── ShareIcon.tsx   # Share functionality icon
│   ├── TwitterIcon.tsx # Twitter/X platform icon
│   └── YoutubeIcon.tsx # YouTube platform icon
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
├── ProtectedRoute.tsx # Route protection wrapper
└── Config.ts          # Application configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brainely-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Configure your backend URL and other settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage Guide

### Getting Started
1. **Create Account**: Sign up with username and password
2. **Sign In**: Access your personal dashboard
3. **Add Content**: Click "Add content" to start building your brain

### Adding Content
1. Click the **"Add content"** button in the dashboard
2. Enter a **title** for your content
3. Paste the **URL/link** to your content
4. Select the **content type** (YouTube, Twitter, etc.)
5. Click **"Submit"** to save

### Organizing Content
- Use the **sidebar filters** to view specific content types
- Click **"All"** to see your entire collection
- Each content type has its own dedicated view

### Sharing Your Brain
1. Click the **"Share brain"** button
2. Copy the generated shareable link
3. Share with others to give them access to your curated content

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=your_backend_api_url
```

### Build Configuration
The project uses Vite for building and development. Configuration can be found in:
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 🚀 Deployment

### Netlify Deployment
The project is optimized for Netlify deployment with:
- **Automatic redirects** for SPA routing
- **Build configuration** in `netlify.toml`
- **Error handling** for production environments

### Build Output
- Build directory: `dist/`
- Build command: `npm run build`
- Publish directory: `dist`

## 🎨 Design Philosophy

### User Experience
- **Simplicity First**: Clean, uncluttered interface
- **Intuitive Navigation**: Logical content organization
- **Responsive Design**: Works seamlessly across devices
- **Fast Performance**: Optimized for speed and efficiency

### Visual Design
- **Modern Aesthetics**: Contemporary design patterns
- **Consistent Branding**: Cohesive visual identity
- **Accessibility**: Designed for all users
- **Professional Look**: Suitable for personal and professional use

## 🔮 Future Enhancements

### Planned Features
- **Advanced Search**: Full-text search across all content
- **Tags & Labels**: Custom tagging system
- **Content Notes**: Add personal notes to saved content
- **Export Options**: Export your brain in various formats
- **Collaboration**: Share and collaborate on content collections
- **Mobile App**: Native mobile applications
- **AI Integration**: Smart content recommendations and organization

### Technical Improvements
- **Offline Support**: Progressive Web App capabilities
- **Real-time Sync**: Live updates across devices
- **Advanced Filtering**: Complex search and filter options
- **Performance Optimization**: Enhanced loading and caching
- **Analytics**: Usage insights and content statistics

## 🤝 Contributing

We welcome contributions to make Brainely even better! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite Team** - For the lightning-fast build tool
- **Open Source Community** - For the incredible tools and libraries

---

**Built with ❤️ for knowledge enthusiasts and digital organizers**

*Transform your scattered digital content into an organized, searchable, and shareable knowledge base with Brainely - your personal second brain.*