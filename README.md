# Blog Website - Full Stack Application

A modern, full-stack blog application built with React, Node.js, Express, and MongoDB. This application provides a complete blogging platform with user authentication, blog management, and commenting system.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Built with React 19 and styled with Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Theme**: Theme switching capability with next-themes
- **User Authentication**: Login and signup functionality
- **Blog Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Integrated Jodit React editor for blog creation
- **Search Functionality**: Search through blog posts
- **Comment System**: Interactive commenting on blog posts
- **User Dashboard**: Personal dashboard for managing blogs and profile
- **Author Profiles**: View popular authors and their profiles

### Backend Features
- **RESTful API**: Well-structured REST API endpoints
- **User Authentication**: JWT-based authentication with secure cookies
- **File Upload**: Image upload functionality with Cloudinary integration
- **Database Management**: MongoDB with Mongoose ODM
- **Security**: CORS, cookie parsing, and authentication middlewares
- **Data Validation**: Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Jodit React** - Rich text editor
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud-based image management
- **Multer** - File upload middleware
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Blog_Website/
├── backend/
│   ├── controllers/          # Request handlers
│   │   ├── blog.controller.js
│   │   ├── comment.controller.js
│   │   └── user.controller.js
│   ├── database/
│   │   └── db.js            # Database connection
│   ├── middlewares/         # Custom middlewares
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/              # Database models
│   │   ├── blog.model.js
│   │   ├── comment.model.js
│   │   └── user.model.js
│   ├── route/               # API routes
│   │   ├── blog.route.js
│   │   ├── comment.route.js
│   │   └── user.route.js
│   ├── utils/               # Utility functions
│   │   ├── cloudinary.js
│   │   └── dataUri.js
│   └── server.js            # Entry point
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images and media
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/          # UI components
│   │   │   └── ...
│   │   ├── lib/             # Utility libraries
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store and slices
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
└── package.json             # Root package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GodCoder077/Blog-Application-Full-Stack.git
   cd Blog-Application-Full-Stack
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   
   **Development mode:**
   ```bash
   # Start backend server
   npm run dev
   
   # In a new terminal, start frontend
   cd frontend
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   # Build the application
   npm run build
   
   # Start the server
   npm start
   ```

## 📖 API Endpoints

### User Routes
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Blog Routes
- `GET /api/v1/blog` - Get all blogs
- `GET /api/v1/blog/:id` - Get single blog
- `POST /api/v1/blog` - Create new blog
- `PUT /api/v1/blog/:id` - Update blog
- `DELETE /api/v1/blog/:id` - Delete blog
- `GET /api/v1/blog/search` - Search blogs

### Comment Routes
- `GET /api/v1/comment/:blogId` - Get blog comments
- `POST /api/v1/comment/:blogId` - Add comment
- `DELETE /api/v1/comment/:id` - Delete comment

## 🎨 Pages and Components

### Pages
- **Home** - Landing page with featured blogs
- **About** - About page
- **Blogs** - Blog listing page
- **Blog View** - Individual blog post view
- **Login/Signup** - Authentication pages
- **Dashboard** - User dashboard
- **Profile** - User profile management
- **Create Blog** - Blog creation page
- **Your Blogs** - User's blog management
- **Comments** - Comment management

### Key Components
- **Layout** - Main layout wrapper
- **Navbar** - Navigation component
- **Sidebar** - Dashboard sidebar
- **BlogCard** - Blog post card component
- **CommentBox** - Comment functionality
- **Hero** - Hero section component

## 🔧 Configuration

### Vite Configuration
The frontend uses Vite for fast development and building. Configuration can be found in `frontend/vite.config.js`.

### Tailwind CSS
Tailwind CSS is configured with custom components and utilities. Check `frontend/tailwind.config.js` for customizations.

### ESLint
Code quality is maintained with ESLint. Configuration is in `frontend/eslint.config.js`.

## 🚀 Deployment

The application is configured for deployment on platforms like Render, Heroku, or Vercel.

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**GodCoder077**
- GitHub: [@GodCoder077](https://github.com/GodCoder077)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Radix UI for accessible components
- MongoDB for the flexible database
- Cloudinary for image management

---

⭐ If you found this project helpful, please give it a star on GitHub!