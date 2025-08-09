# FundForge - Vercel Deployment Guide

## 🚀 Production Deployment on Vercel

### Prerequisites
1. **MongoDB Atlas Account** (for production database)
2. **Vercel Account** (for hosting)
3. **GitHub Repository** (for automatic deployments)

### 🔧 Environment Variables Setup

In your Vercel dashboard, add these environment variables:

#### Required Variables:
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fundforge?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-very-long-random-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app
```

#### How to Generate NEXTAUTH_SECRET:
```bash
# Run this command in terminal:
openssl rand -base64 32
```

### 📊 MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster (free tier works fine)
3. Create database user with read/write permissions
4. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs)
5. Get connection string and add to MONGO_URI

### 🚀 Vercel Deployment Steps

#### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

#### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### ✅ Post-Deployment Checklist

1. **Test Authentication**
   - Sign up new user
   - Login existing user
   - Check dashboard access

2. **Test Payment Flow**
   - User sets Razorpay credentials in dashboard
   - Create donation on profile page
   - Verify Razorpay integration works

3. **Test All Features**
   - Profile creation/editing
   - Image uploads (Google Drive URLs)
   - Share URL functionality
   - Responsive design on mobile

### 🔒 Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use strong NEXTAUTH_SECRET
   - Secure MongoDB credentials

2. **Database Security**
   - Use MongoDB Atlas network security
   - Regular database backups
   - Monitor unusual activity

### 🐛 Troubleshooting

#### Common Issues:
1. **Database Connection Fails**
   - Check MONGO_URI format
   - Verify MongoDB Atlas IP whitelist
   - Check database user permissions

2. **Authentication Not Working**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Clear browser cookies and try again

3. **Payment Issues**
   - Users must set their own Razorpay credentials
   - Test with Razorpay test mode first
   - Verify callback URLs are correct

### 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `NEXTAUTH_SECRET` | JWT encryption key | `abc123...` |
| `NEXTAUTH_URL` | Your app URL | `https://fundforge.vercel.app` |

### 🎯 Performance Optimizations

The app includes several production optimizations:
- Image optimization for Google Drive URLs
- SWC minification
- Compression enabled
- Serverless-optimized database connections
- Bundle analysis tools

### 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test database connection separately
4. Review this guide again

Happy deploying! 🎉
