<h1 align="center">AI Research Assistant Chat</h1>

<p align="center">
 An advanced AI-powered chat application built with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#prerequisites"><strong>Prerequisites</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#environment-variables"><strong>Environment Variables</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a>
</p>
<br/>

## Features

- AI-powered chat interface for research assistance
- Real-time conversation with AI using Langflow
- Chat history management with Supabase
- User authentication with Supabase
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account
- A [Langflow](https://langflow.org/) account or self-hosted instance
- Alternatively, a free account on [Astra](https://astra.datastax.com/) to create a Langflow and obtain the API URL and key

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/misbahsy/AI-Agent-App-Langflow.git
   cd your-project-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your Supabase project:
   - Create a new project in the [Supabase dashboard](https://app.supabase.com/)
   - Note your project's URL and anon key (you'll need these for environment variables)

4. Set up Langflow:
   - Option 1: Use a Langflow account or self-hosted instance
   - Option 2: Create a free account on [Astra](https://astra.datastax.com/), create a Langflow, and obtain the API URL and key

5. Set up your environment variables (see [Environment Variables](#environment-variables) section)

6. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
LANGFLOW_API_URL=your_langflow_api_url
LANGFLOW_API_KEY=your_langflow_api_key
```

## Deployment

You can deploy this app to various platforms. Here are instructions for Vercel:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign up or log in.
3. Click on "Import Project" and select your GitHub repository.
4. Configure your environment variables in the Vercel dashboard.
5. Click "Deploy" and wait for the build to complete.

Remember to set up your environment variables in your deployment platform's settings.

## Feedback and Issues

If you encounter any issues or have feedback, please file an issue in the GitHub repository.
