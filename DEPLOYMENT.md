# Deployment Guide

This guide helps you deploy the TeleHealth application to production using Railway (backend) and Vercel (frontend).

## Prerequisites

1. GitHub account - to host the code repository
2. Railway account - for backend deployment (https://railway.app)
3. Vercel account - for frontend deployment (https://vercel.com)

## Step 1: Push to GitHub

1. Create a new GitHub repository (e.g., `telehealth-app`)
2. Add the remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/telehealth-app.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy Backend to Railway

### Option A: Using Railway Dashboard

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account and select the `telehealth-app` repository
5. Railway will auto-detect it's a Node.js project
6. Add a PostgreSQL service:
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
7. Configure environment variables in Railway:
   - `DATABASE_URL` - Already set by PostgreSQL service
   - `JWT_SECRET` - Generate a secure random string
   - `NODE_ENV` - Set to "production"
8. In service settings, set:
   - Root Directory: `backend`
   - Start command: `npm run start:prod`
9. Deploy

### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add PostgreSQL
railway add --plugin postgres

# Set environment variables
railway variables set JWT_SECRET=<random-secure-string>
railway variables set NODE_ENV=production

# Deploy
railway up
```

Get your backend URL from the Railway dashboard (it will be something like `https://telehealth-backend.railway.app`)

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import the GitHub repository
4. Select "Next.js" as the framework
5. Configure build settings:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://YOUR_RAILWAY_URL
   NEXT_PUBLIC_SOCKET_URL=https://YOUR_RAILWAY_URL
   ```
   Replace `YOUR_RAILWAY_URL` with your actual Railway backend URL
7. Click "Deploy"

Get your frontend URL from Vercel (it will be something like `https://telehealth-app.vercel.app`)

## Step 4: Update Backend CORS Settings

After deployment, update the backend's CORS configuration to accept requests from your frontend URL:

In `backend/src/main.ts`, update:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
});
```

Then add `FRONTEND_URL` environment variable to Railway:

```
FRONTEND_URL=https://YOUR_VERCEL_URL
```

## Step 5: Database Migration on Production

Railway will automatically run migrations on the Prisma database. If you need to manually run them:

```bash
# Via Railway CLI
railway run prisma migrate deploy

# Or via Railway dashboard terminal
npx prisma migrate deploy
```

## Step 6: Testing Deployment

1. Visit your Vercel URL: `https://YOUR_VERCEL_URL`
2. You should be redirected to login page
3. Register a new account (choose either PATIENT or DOCTOR)
4. Test core features:
   - Patient: Browse doctors, book appointment
   - Doctor: Create schedule, view appointments

## Troubleshooting

### Backend not connecting to frontend

- Check CORS configuration
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check Railway logs for errors

### Database connection errors

- Verify `DATABASE_URL` is correct in Railway
- Ensure PostgreSQL service is running
- Check database migrations have run

### WebSocket connection issues

- Ensure `NEXT_PUBLIC_SOCKET_URL` points to the correct backend URL
- Check Socket.io is properly configured on backend
- Verify no proxy issues between frontend and backend

### Build failures

- Check the build logs in Vercel/Railway
- Ensure all dependencies are installed
- Verify Node.js version is 18+

## Production Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Database migrations completed
- [ ] Environment variables configured on both services
- [ ] CORS settings updated
- [ ] API endpoints responding
- [ ] WebSocket connections working
- [ ] Authentication working
- [ ] Can register as patient/doctor
- [ ] Can browse doctors (patient)
- [ ] Can book appointment
- [ ] Can view appointment (doctor)

## Monitoring & Logs

### Railway

- View logs: Railway Dashboard → Service → Deployments tab
- Monitor metrics: Dashboard → Service → Metrics tab

### Vercel

- View logs: Vercel Dashboard → Project → Deployments tab
- Monitor analytics: Dashboard → Analytics tab

## Security Notes

1. Always use HTTPS URLs (both services provide this by default)
2. Change `JWT_SECRET` to a strong random string
3. Set `NODE_ENV` to production
4. Use environment variables for sensitive data
5. Enable CORS only for your frontend domain
6. Regularly update dependencies for security patches

## Costs

**Railway (Free Tier)**

- 500 hours/month compute time
- Enough for small deployments
- PostgreSQL included

**Vercel (Free Tier)**

- Unlimited deployments
- Automatic SSL
- Sufficient for frontend hosting

For production use, consider upgrading to paid tiers as traffic increases.
