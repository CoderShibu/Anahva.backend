# Vercel Deployment Guide - Anahva Backend

This guide explains how to properly deploy the Anahva backend to Vercel with all required environment variables.

## Required Environment Variables

The backend requires the following environment variables to function properly:

### 1. GEMINI_API_KEY (Required)
- **Purpose**: Enables AI chat responses via Google Gemini
- **How to get**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Example**: `AIzaSyD...` (starts with AIzaSy)

### 2. MONGODB_URI (Required)
- **Purpose**: Database connection for storing journal entries and chat sessions
- **How to get**: Create a free MongoDB Atlas cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Format**: `mongodb+srv://username:password@cluster.mongodb.net/anahva?retryWrites=true&w=majority`

## Vercel Deployment Steps

### Step 1: Configure Environment Variables in Vercel

1. Go to your Vercel project: [Anahva Backend Dashboard](https://vercel.com/dashboard)
2. Select your `Anahva.backend` project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter **Name**: `GEMINI_API_KEY`
   - Enter **Value**: Your actual Gemini API key
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**
5. Repeat for `MONGODB_URI`

### Step 2: Redeploy Your Application

After adding environment variables:
1. Go to **Deployments** tab
2. Click on the **3 dots** (⋮) on the latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete (usually 1-2 minutes)

### Step 3: Verify Deployment

Test your backend API:

```bash
# Health check
curl https://anahva-backend-vh3h.vercel.app/

# Test chat endpoint
curl -X POST https://anahva-backend-vh3h.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello"}'
```

Expected response:
```json
{"success":true,"reply":"[AI-generated response from Gemini]"}
```

## Troubleshooting

### Issue: "GEMINI_API_KEY missing" in logs

**Solution**: 
1. Verify the environment variable is set in Vercel dashboard
2. Make sure it's enabled for Production environment
3. Redeploy the application

### Issue: "MONGODB_URI missing" in logs

**Solution**:
1. Check your MongoDB Atlas cluster is active
2. Verify the connection string is correct
3. Ensure your IP address is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for all IPs)
4. Redeploy the application

### Issue: Chat returns "API not configured"

This means the GEMINI_API_KEY is either:
- Not set in Vercel environment variables
- Invalid or expired
- Not properly redeployed after adding

**Solution**:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate a new API key
3. Update the `GEMINI_API_KEY` in Vercel
4. Redeploy

### Issue: CORS errors in frontend

The backend is configured to accept requests from any origin (`origin: "*"`). If you still see CORS errors:
1. Check Vercel deployment logs for errors
2. Ensure the backend URL in frontend matches exactly
3. Verify no middleware is blocking requests

### Issue: MongoDB connection fails

**Common causes**:
1. **IP Whitelist**: Add `0.0.0.0/0` to MongoDB Atlas Network Access
2. **Wrong credentials**: Double-check username/password in connection string
3. **Cluster paused**: Free tier clusters pause after inactivity - resume in MongoDB Atlas dashboard

## Viewing Logs

To debug issues:
1. Go to Vercel project dashboard
2. Click on **Deployments**
3. Select the latest deployment
4. Click **View Function Logs**
5. Look for:
   - `✅ MongoDB connected` - Database is working
   - `❌ GEMINI_API_KEY missing` - API key not set
   - `❌ MONGODB_URI missing` - Database URL not set

## Testing Locally

Before deploying, test locally:

```bash
# Create .env file (don't commit!)
cp .env.example .env

# Edit .env with your actual keys
# Add:
# GEMINI_API_KEY=your_actual_key
# MONGODB_URI=your_actual_mongodb_uri

# Install dependencies
npm install

# Build and start
npm run build
npm start

# Test
curl http://localhost:3000/api/chat -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}'
```

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Rotate API keys regularly** - Especially if exposed
3. **Use MongoDB Atlas IP whitelist** - Restrict to Vercel IPs if possible
4. **Monitor usage** - Check Google AI Studio for API usage limits

## Support

If you continue to have issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Verify all environment variables are set correctly
4. Try redeploying from scratch
