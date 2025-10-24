# Contributing to ZotFood

Thank you for your interest in contributing to ZotFood! 🍳 We welcome contributions from the UCI community and beyond.

## 🤝 How to Contribute

### **Ways to Contribute**
- 🐛 **Bug Reports**: Found a bug? Let us know!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 📝 **Documentation**: Help improve our docs
- 🎨 **UI/UX**: Design improvements and user experience
- 🧪 **Testing**: Help us test new features
- 🌍 **Localization**: Translate for different languages
- 📚 **Content**: Add new recipes or learning content

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- Git
- A GitHub account
- Basic knowledge of React/Next.js (helpful but not required)

### **Development Setup**

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/zotfood-local.git
   cd zotfood-local
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/rchau8502/zotfood-local.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### **Branch Naming**
Use descriptive branch names:
- `feature/add-new-recipe-type`
- `bugfix/fix-pantry-sync-issue`
- `docs/update-readme`
- `refactor/improve-auth-flow`

### **Commit Messages**
Follow conventional commits:
```
feat: add new recipe filtering by dietary restrictions
fix: resolve pantry item duplication bug
docs: update installation instructions
style: improve button hover animations
test: add unit tests for scoring algorithm
```

### **Pull Request Process**

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Provide clear description
   - Link any related issues
   - Request reviews from maintainers

## 🎯 Areas for Contribution

### **High Priority**
- 🐛 **Bug Fixes**: Any issues in the issue tracker
- 📱 **Mobile Responsiveness**: Improve mobile experience
- ♿ **Accessibility**: WCAG 2.1 AA compliance
- 🧪 **Testing**: Increase test coverage
- 📚 **Content**: Add more recipes and lessons

### **Medium Priority**
- 🎨 **UI/UX Improvements**: Design enhancements
- ⚡ **Performance**: Optimize loading times
- 🔍 **Search**: Improve recipe search functionality
- 📊 **Analytics**: Add user behavior tracking
- 🌍 **Internationalization**: Multi-language support

### **Low Priority**
- 🎮 **Gamification**: Add more game elements
- 🤖 **AI Features**: Smart recommendations
- 📱 **Mobile App**: Native mobile application
- 🔗 **Integrations**: Third-party service connections

## 📝 Code Standards

### **TypeScript**
- Use strict TypeScript
- Define proper interfaces
- Avoid `any` types
- Use meaningful variable names

### **React/Next.js**
- Use functional components
- Implement proper error boundaries
- Follow Next.js best practices
- Use proper SEO optimization

### **Styling**
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic HTML

### **Database**
- Use Prisma for all database operations
- Write efficient queries
- Add proper indexes
- Follow naming conventions

## 🧪 Testing Guidelines

### **Unit Tests**
- Test utility functions
- Test component logic
- Test API endpoints
- Aim for 80%+ coverage

### **Integration Tests**
- Test user workflows
- Test database operations
- Test authentication flows
- Test error handling

### **Manual Testing**
- Test on different browsers
- Test on mobile devices
- Test with different user roles
- Test edge cases

## 📚 Documentation

### **Code Documentation**
- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Update README when needed

### **User Documentation**
- Update user guides
- Add screenshots for UI changes
- Document new features
- Keep installation instructions current

## 🐛 Bug Reports

### **Before Reporting**
- Check existing issues
- Try to reproduce the bug
- Test on different browsers/devices
- Check console for errors

### **Bug Report Template**
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### **Before Requesting**
- Check existing feature requests
- Consider if it fits the project scope
- Think about implementation complexity
- Consider user impact

### **Feature Request Template**
```markdown
**Feature Description**
A clear description of the feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority
- `priority: medium`: Medium priority
- `priority: low`: Low priority

## 🎉 Recognition

### **Contributors**
All contributors will be:
- Listed in the README
- Mentioned in release notes
- Invited to contributor Discord
- Given contributor badges

### **Special Recognition**
- **Top Contributors**: Monthly recognition
- **Bug Hunters**: Most bugs fixed
- **Content Creators**: Most recipes/lessons added
- **Community Helpers**: Most helpful in discussions

## 📞 Getting Help

### **Questions?**
- 💬 **Discord**: Join our community server
- 💬 **GitHub Discussions**: Ask questions publicly
- 📧 **Email**: Contact the maintainers
- 📖 **Documentation**: Check our comprehensive docs

### **Need Help Getting Started?**
- 🎯 **Good First Issues**: Look for `good first issue` label
- 📚 **Documentation**: Read our setup guides
- 👥 **Community**: Ask in Discord or Discussions
- 🎓 **Tutorials**: Check our learning resources

## 📋 Code of Conduct

### **Our Pledge**
We are committed to providing a welcoming and inclusive experience for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, sexual orientation

### **Expected Behavior**
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### **Unacceptable Behavior**
- Harassment, trolling, or inappropriate comments
- Personal attacks or political discussions
- Public or private harassment
- Publishing private information without permission
- Other unprofessional conduct

## 📄 License

By contributing to ZotFood, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ZotFood! Together, we're making cooking education accessible to every UCI student.** 🍳✨
