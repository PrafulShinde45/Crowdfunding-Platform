# 🔥 FundForge

<div align="center">

![FundForge Logo](public/crowdfunding.gif)

**The Ultimate Crowdfunding Platform for Creators**

*Transform your creative vision into reality. Connect with supporters who believe in your projects and forge your path to success.*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[🚀 Live Demo](https://your-app-name.vercel.app) • [📖 Documentation](DEPLOYMENT.md) • [🐛 Report Bug](https://github.com/yourusername/fundforge/issues) • [✨ Request Feature](https://github.com/yourusername/fundforge/issues)

</div>

---

## 🌟 Features

### 💰 **Seamless Payment Processing**
- **Secure Razorpay Integration** - Industry-standard payment gateway
- **Multiple Payment Options** - Cards, UPI, Net Banking, Wallets
- **Real-time Payment Verification** - Instant confirmation and updates
- **Creator-specific Payment Setup** - Each creator manages their own Razorpay account

### 👥 **Creator-Focused Experience**
- **Personalized Profile Pages** - Showcase your projects and story
- **Real-time Analytics Dashboard** - Track donations, supporters, and growth
- **Supporter Engagement** - Receive messages and build community
- **Easy Profile Management** - Update information and payment settings

### 🎨 **Modern & Responsive Design**
- **Dark Theme with Red Accents** - Professional and eye-catching interface
- **Mobile-First Responsive** - Perfect experience on all devices
- **Smooth Animations** - Engaging micro-interactions and transitions
- **Accessibility Focused** - WCAG compliant design principles

### 🔐 **Secure Authentication**
- **NextAuth.js Integration** - Industry-standard authentication
- **Secure Session Management** - JWT-based secure sessions
- **Protected Routes** - Role-based access control
- **Data Encryption** - All sensitive data properly encrypted

### 📊 **Advanced Features**
- **Share Functionality** - Easy profile sharing for logged-in users
- **Recent Supporters Display** - Showcase community support
- **Quick Payment Options** - Preset donation amounts for convenience
- **Creator Discovery** - Public profile browsing

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **MongoDB** (Atlas recommended for production)
- **Razorpay Account** (for payment processing)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fundforge.git
   cd fundforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fundforge
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🏗️ Tech Stack

<div align="center">

| Frontend | Backend | Database | Payments | Deployment |
|----------|---------|----------|----------|------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | ![Razorpay](https://img.shields.io/badge/Razorpay-3395FF?style=flat&logo=razorpay&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=next.js&logoColor=white) | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | ![Stripe](https://img.shields.io/badge/Alternative-635BFF?style=flat&logo=stripe&logoColor=white) | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) |
| ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![API Routes](https://img.shields.io/badge/API_Routes-000000?style=flat&logo=next.js&logoColor=white) | ![Atlas](https://img.shields.io/badge/Atlas-47A248?style=flat&logo=mongodb&logoColor=white) | | ![Actions](https://img.shields.io/badge/Actions-2088FF?style=flat&logo=github-actions&logoColor=white) |

</div>

---

## 📱 Screenshots

<div align="center">

### 🏠 Home Page
![Home Page](https://via.placeholder.com/800x400/1a1a1a/ef4444?text=FundForge+Home+Page)

### 👤 Creator Profile
![Creator Profile](https://via.placeholder.com/800x400/1a1a1a/ef4444?text=Creator+Profile+Page)

### 📊 Dashboard
![Dashboard](https://via.placeholder.com/800x400/1a1a1a/ef4444?text=Creator+Dashboard)

### 💳 Payment Interface
![Payment Interface](https://via.placeholder.com/800x400/1a1a1a/ef4444?text=Payment+Interface)

</div>

---

## 🎯 Usage

### For Creators

1. **Sign Up** - Create your creator account
2. **Setup Profile** - Add your information and profile picture
3. **Configure Payments** - Add your Razorpay credentials in dashboard
4. **Share Your Profile** - Start receiving donations from supporters
5. **Track Progress** - Monitor your supporters and earnings

### For Supporters

1. **Discover Creators** - Browse creator profiles
2. **Choose Amount** - Select donation amount or use quick options
3. **Add Message** - Leave encouraging words for creators
4. **Secure Payment** - Complete donation through Razorpay
5. **Get Confirmation** - Receive instant payment confirmation

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fundforge)

1. **Connect GitHub** - Link your repository to Vercel
2. **Set Environment Variables** - Configure in Vercel dashboard
3. **Deploy** - Automatic deployment on every push

### Manual Deployment

See our comprehensive [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### 🐛 Bug Reports

Found a bug? Please open an issue with:
- **Bug description**
- **Steps to reproduce**
- **Expected behavior**
- **Screenshots** (if applicable)

### ✨ Feature Requests

Have an idea? We'd love to hear it! Open an issue with:
- **Feature description**
- **Use case explanation**
- **Proposed implementation** (optional)

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/fundforge?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/fundforge?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/fundforge?style=social)

![GitHub issues](https://img.shields.io/github/issues/yourusername/fundforge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/fundforge)
![GitHub license](https://img.shields.io/github/license/yourusername/fundforge)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/fundforge)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **MongoDB** - For reliable database solutions
- **Razorpay** - For secure payment processing
- **Tailwind CSS** - For beautiful styling system
- **Open Source Community** - For inspiration and contributions

---

## 📞 Support

<div align="center">

**Need help?** We're here for you!

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/yourinvite)

</div>

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

*Empowering creators to turn their dreams into reality, one donation at a time.*

</div>