'use client'

import React from 'react';
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Link from 'next/link';

export default function ProtectedPage() {
  const supabase = createClient();

  // Commented out user check - you may want to implement this client-side
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-black to-purple-900">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Welcome to AI Research Assistant
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-white">
          Experience the power of AI-driven research with our advanced chat interface. 
          Collaborate with AI agents, analyze complex data, and generate insights in real-time.
        </p>
        <Link href="/protected/chat" className="inline-block">
          <button className="px-6 py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300">
            Start Chatting Now
          </button>
        </Link>
      </div>
    </div>
  );
}
