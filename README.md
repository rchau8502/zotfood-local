# 🍳 ZotFood - Duolingo for Cooking

> **A modern, interactive cooking learning platform designed specifically for UCI students**

ZotFood is a comprehensive cooking education app that combines recipe discovery, skill-based learning, and personalized pantry management. Think Duolingo, but for cooking! 🎓

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Interactive Learning System**
- **Skill-based Lessons**: Master cooking fundamentals with structured, progressive lessons
- **Hands-on Practice**: Learn knife skills, pasta techniques, sautéing, and more
- **Quiz Integration**: Test your knowledge with interactive quizzes after each lesson
- **Progress Tracking**: Monitor your learning journey and unlock achievements

### 🍽️ **Smart Recipe Discovery**
- **Personalized Recommendations**: Get recipes based on your pantry ingredients
- **Cost & Time Optimization**: Find recipes that fit your budget and schedule
- **Difficulty Scaling**: From beginner-friendly to advanced techniques
- **Real Recipe Database**: 4+ professionally crafted recipes with detailed instructions

### 🏠 **Personal Pantry Management**
- **User-Specific Pantry**: Each user has their own ingredient inventory
- **Smart Matching**: Find recipes you can make with current ingredients
- **Ingredient Tracking**: Keep track of quantities and expiration dates
- **Shopping Integration**: Know what you need to buy for new recipes

### 🔐 **Secure Authentication**
- **NextAuth.js Integration**: Secure, modern authentication system
- **User Profiles**: Personalized experience with username display
- **Session Management**: Seamless login/logout experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- SQLite (included with Prisma)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rchau8502/zotfood-local.git
   cd zotfood-local
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database URL and authentication secrets.

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Account
- **Email**: `demo@uci.edu`
- **Password**: `password123`

## 🏗️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **NextAuth.js** - Authentication

### **Backend**
- **Prisma** - Type-safe database ORM
- **SQLite** - Lightweight database
- **Next.js API Routes** - Serverless functions

### **Development**
- **Vitest** - Fast unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
zotfood-local/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard
│   ├── learn/             # Learning modules
│   ├── pantry/            # Pantry management
│   └── recipes/           # Recipe discovery
├── components/ui/          # Reusable UI components
├── lib/                   # Utility functions
├── prisma/                # Database schema & migrations
├── public/                # Static assets
└── tests/                 # Test files
```

## 🎓 Learning Modules

### **Cooking Fundamentals**
1. **Knife Safety 101** - Master proper knife techniques and safety
2. **Perfect Pasta** - Learn the art of cooking pasta to perfection
3. **Sauté Basics** - Essential sautéing techniques and heat control

### **Advanced Techniques**
1. **Season Like a Pro** - Master the art of seasoning and flavor balance
2. **Mise en Place** - Professional kitchen organization
3. **Food Safety** - Critical food safety and temperature guidelines

## 🍳 Sample Recipes

- **Scrambled Eggs** - Quick 5-minute breakfast ($1.50)
- **Garlic Pasta** - Simple 15-minute dinner ($3.00)
- **Mug Omelette** - 3-minute microwave meal ($2.00)
- **Overnight Oats** - Healthy meal prep breakfast ($2.50)

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test -- --watch
```

## 📊 Database Schema

The app uses a comprehensive database schema with:
- **Users** - Authentication and profiles
- **Recipes** - Recipe data with ingredients and steps
- **Ingredients** - Ingredient catalog with categories
- **Pantry Items** - User-specific ingredient inventory
- **Skills & Lessons** - Learning content structure
- **User Progress** - Learning progress tracking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UCI Community** - For inspiration and feedback
- **Next.js Team** - For the amazing framework
- **Prisma Team** - For the excellent ORM
- **Tailwind CSS** - For the beautiful styling system

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/rchau8502/zotfood-local/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rchau8502/zotfood-local/discussions)
- **Email**: [Your Contact Email]

---

<div align="center">

**Made with ❤️ for UCI Students**

[⭐ Star this repo](https://github.com/rchau8502/zotfood-local) | [🐛 Report Bug](https://github.com/rchau8502/zotfood-local/issues) | [💡 Request Feature](https://github.com/rchau8502/zotfood-local/issues)

</div>
