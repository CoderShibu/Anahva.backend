# Fixing Backend 500 Error - Gemini API Configuration

## The Problem
Your backend is returning **HTTP 500** error when you send chat messages. This is because the Gemini API key is either:
- Not set in Vercel environment variables
- Invalid or expired
- Not properly configured

## How to Fix - Step by Step

### Step 1: Get Your Google Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Click "Create API Key" (or use an existing one)
3. **Copy the API key** (it looks like: `AIzaSyC...`)
4. Keep this tab open for the next step

### Step 2: Add Environment Variable to Vercel Backend

1. Go to https://vercel.com/dashboard
2. Find your **backend project** (Anahva.backend or similar)
3. Click on the project
4. Go to **Settings** tab (top menu)
5. In the left sidebar, click **Environment Variables**
6. Click **Add New** button

7. Add the following:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: (paste your API key from Step 1)
   - **Environment**: Select **Production**, **Preview**, AND **Development** (check all 3)
8. Click **Save**

9. Add MongoDB URI (if you haven't already):
   - **Key**: `MONGODB_URI`
   - **Value**: (your MongoDB connection string)
   - **Environment**: Check all 3
10. Click **Save**

### Step 3: Redeploy Backend

After adding the environment variables, you need to trigger a new deployment:

**Option A: Redeploy from Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Confirm the redeployment

**Option B: Push an empty commit**
```powershell
cd d:\Anahata\backend-repo
git commit --allow-empty -m "Trigger redeploy after adding env vars"
git push origin main
```

### Step 4: Verify It Works

1. Wait 1-2 minutes for Vercel to finish deploying
2. Go back to your frontend
3. Refresh the page (Ctrl+F5)
4. Open Developer Console (F12)
5. Send a chat message
6. You should now see a real AI response! 🎉

## Troubleshooting

### If you still see 500 error:

**Check Vercel Logs:**
1. Go to your backend project in Vercel
2. Click on the latest deployment
3. Click **Logs** or **Function Logs**
4. Send a chat message from your frontend
5. Look for the error message in the logs - you'll see:
   - `❌ CHAT ERROR: ...`
   - `❌ FULL ERROR: ...`
   - `❌ GEMINI_API_KEY exists: true/false`

**If GEMINI_API_KEY exists: false**
- The environment variable is not set or not loaded
- Make sure you selected all 3 environments when adding it
- Make sure you redeployed after adding it

**If you see "API key not valid"**
- Your API key is wrong or expired
- Go back to https://aistudio.google.com/apikey
- Create a new API key
- Update it in Vercel

### If you see 404 error on auth endpoints:

The backend needs auth routes. Check if your backend has these routes or if they're disabled.

## What I Did

I added better error logging to the backend so you can see the exact error from Gemini API. After you redeploy, the backend will log:
- The exact error message
- Whether the API key exists
- The length of the API key (to verify it's set)

This will help diagnose any remaining issues!
