## Livestream App

Welcome to my project! This is a web application built to replicate the core features of Twitch, including live streaming, user profiles, live chat, and notifications. The project utilizes the following technologies:

- **Frontend**: Next.js and React
- **Database**: Supabase
- **ORM**: Prisma
- **Live Chat**: GetStream.io
- **Authentication**: Clerk
- **Notifications**: Knock (email via Resend)
  
## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Setup](#setup)
4. [Running Locally](#running-locally)
5. [Environment Variables](#environment-variables)
6. [Scripts](#scripts)
7. [Scenario](#scenario)
8. [Deployment](#deployment)

## Features

- **Live Streaming**: Stream video content live to viewers.
- **User Profiles**: Create and manage user profiles.
- **Live Chat**: Real-time chat functionality with GetStream.io.
- **Authentication**: User authentication via Clerk.
- **Notifications**: Email and in-app notifications using Knock and Resend.

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Supabase**: Open-source Firebase alternative for database and authentication.
- **Prisma**: ORM for database interactions.
- **GetStream.io**: Service for building scalable chat and activity feeds.
- **Clerk**: Authentication and user management.
- **Knock**: Platform for managing notifications.
- **Resend**: Service for sending emails.

## Getting Started

To get started with the Livestream App, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js (version 18.x or later) installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Yarn**: Install Yarn if you haven't already. Follow the installation instructions [here](https://classic.yarnpkg.com/en/docs/install).

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/affat25/livestream-app.git
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

## Running Locally

To run the application locally, follow these steps:

1. **Set up environment variables:**

    Create a `.env.local` file in the root directory of the project and add the following variables:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    DATABASE_URL=your_database_url
    GETSTREAM_API_KEY=your_getstream_api_key
    GETSTREAM_API_SECRET=your_getstream_api_secret
    CLERK_FRONTEND_API=your_clerk_frontend_api
    CLERK_API_KEY=your_clerk_api_key
    KNOCK_API_KEY=your_knock_api_key
    RESEND_API_KEY=your_resend_api_key
    ```

2. **Start the development server:**

    ```bash
    yarn dev
    ```

    The application should now be running on [http://localhost:3000](http://localhost:3000).

## Scripts

- **Run development server**: `yarn dev`
- **Build for production**: `yarn build`
- **Start production server**: `yarn start`
- **Run database migrations**: `yarn prisma migrate dev`

## Scenario

- Guests:
  - Can see a list of channels (profiles)
  - Can go on channel page, chat as guest and follow the channel
  - If user click on follow and is not connected will ask login
- Connected users (Mandy)
  - Mandy connect with his google account
  - Mandy need to complete his profile by setting his username and notification preferences
  - Once connected and profile completed
    - eddy goes to his channel and start streaming (for now a button triggers this video https://www.youtube.com/watch?v=jfKfPfyJRdk which will be updated)
- Connected users (Billy)
  - Billy follows Mandy
  - If Mandy starts a streaming, Billy receive a push notification or an email if he’s not connected to the website.
  -  Billy can go on Mandy’s stream and start chatting (basic)
  
## Deployment
