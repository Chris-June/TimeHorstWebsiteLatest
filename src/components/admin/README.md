# Admin Content Management System (CMS)

## Overview
This CMS provides an admin interface for managing content on the Products and Portfolio pages.

## Features
- Secure admin login using Clerk Authentication
- Upload and manage product details
- Upload and manage portfolio projects
- Image upload functionality with UploadThing

## Components
1. `products-upload-modal.tsx`: Modal for uploading and managing product details
2. `portfolio-upload-modal.tsx`: Modal for uploading and managing portfolio projects

## Authentication
- Uses Clerk for secure admin authentication
- Provides login/logout functionality
- Restricts upload features to authenticated users

## Image Upload
- Utilizes UploadThing for secure and easy file uploads
- Supports image uploads for products and portfolio projects
- Validates file types and sizes

## Setup
1. Install dependencies:
   ```bash
   npm install @uploadthing/react uploadthing @clerk/nextjs react-hook-form zod
   ```

2. Configure environment variables for Clerk and UploadThing

3. Customize upload endpoints in `src/lib/uploadthing.ts`

## Usage
- Login as an admin through the footer
- Use the upload buttons to add new products or portfolio projects
- Images are validated and uploaded securely

## Security
- Only authenticated users can access upload features
- File size and type restrictions are enforced
- Uploads are processed server-side
