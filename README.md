# BudgetWise - AI-Powered Expense Tracker

## Overview

BudgetWise is an intelligent expense tracker that uses AI to help you save smarter, achieve your goals, and build a better financial future. It's built with a modern, full-stack TypeScript environment using Next.js.

## Key Features

- **Interactive Dashboard:** A central hub to visualize financial health with charts for weekly and monthly spending trends.
- **Dynamic Budgeting:** Create custom budget categories with specific spending limits. Track your progress in real-time with visual progress bars.
- **Transaction Logging:** Easily add new expenses and categorize them. The system automatically updates your budget totals.
- **AI Financial Co-Pilot:** Chat with a Genkit-powered AI that has access to your financial data (via tools) to ask questions like, "How much did I spend on groceries last month?"
- **User Personalization:** Users can sign in with their Google account and set their preferred currency, which is saved to their profile.
- **Light & Dark Mode:** A sleek, modern interface with full support for both light and dark themes.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Charting:** [Recharts](https://recharts.org/)
- **AI & Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [MongoDB](https://www.mongodb.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A MongoDB database instance
- Google Cloud project for OAuth credentials

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install NPM packages:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a file named `.env` in the root of your project and add the following variables.

   ```env
   # MongoDB Connection String
   MONGODB_URI="your_mongodb_connection_string"

   # NextAuth.js Configuration
   # Generate a secret using: openssl rand -base64 32
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth Credentials
   # Get these from your Google Cloud Console
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   
   # Genkit / Gemini API Key
   # Get this from Google AI Studio
   GEMINI_API_KEY="your_gemini_api_key"
   ```
   **Important:** Ensure the "Authorized redirect URIs" in your Google Cloud OAuth 2.0 Client ID is set to `http://localhost:3000/api/auth/callback/google`.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter to check for code quality issues.
