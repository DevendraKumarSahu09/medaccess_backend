# MedAccess Backend Deployment Guide

## Deploying to Render

### Prerequisites
- GitHub repository with your code
- Render.com account

### Steps to Deploy

1. **Create a New Web Service on Render**
   - Sign in to your Render account
   - Click on "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository branch you want to deploy

2. **Configure Your Web Service**
   - Name: `medaccess-backend` (or your preferred name)
   - Environment: `Node`
   - Region: Choose the closest to your users
   - Branch: `main` (or your default branch)
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Free (or select a paid plan for production)

3. **Set Environment Variables**
   - Add the following environment variables in the Render dashboard:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `JWT_EXPIRES_IN`: 1h (or your preferred expiration time)
     - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
     - `CLOUDINARY_API_KEY`: Your Cloudinary API key
     - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
     - `PORT`: 10000 (Render assigns this automatically)

4. **Deploy the Service**
   - Click "Create Web Service"
   - Wait for the deployment to complete

### Updating Your Deployment

- Push changes to your GitHub repository
- Render will automatically redeploy your application (if auto-deploy is enabled)

### Troubleshooting

- Check Render logs for any deployment errors
- Verify all environment variables are correctly set
- Ensure MongoDB connection is working properly

## Local Development

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with required environment variables
4. Run `npm run dev` to start the server in development mode 