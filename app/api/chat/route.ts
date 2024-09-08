import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { message, sessionId, title } = requestBody;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Inserting user message:', { sessionId, message, userId: user.id });
    
    // Insert user message
    const { error: userMessageError } = await supabase
      .from('chat_sessions')
      .insert({
        session_id: sessionId,
        user_id: user.id,
        title: title || message.substring(0, 50) + '...',
        sender: 'user',
        content: message
      });

    if (userMessageError) {
      console.error('Error inserting user message:', userMessageError);
      return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
    }

    console.log('Database operation successful, calling Langflow API');
    
    // Prepare the request body for Langflow API
    const langflowRequestBody = {
      input_value: message,
      output_type: "chat",
      input_type: "chat",
      tweaks: {}
    };
    console.log('Langflow API request body:', JSON.stringify(langflowRequestBody, null, 2));

    // Call the Langflow API
    const response = await fetch(process.env.LANGFLOW_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LANGFLOW_API_KEY}`
      },
      body: JSON.stringify(langflowRequestBody)
    });

    console.log('Langflow API response status:', response.status);
    console.log('Langflow API response headers:', JSON.stringify(Object.fromEntries(response.headers), null, 2));

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Langflow API error:', response.status, responseText);
      return NextResponse.json({ error: `Langflow API error: ${response.status}` }, { status: 500 });
    }

    let langflowData;
    try {
      langflowData = await response.json();
      console.log('Langflow API response data:', JSON.stringify(langflowData, null, 2));
    } catch (error) {
      console.error('Error parsing Langflow API response:', error);
      return NextResponse.json({ error: 'Invalid response from Langflow API' }, { status: 500 });
    }

    let aiMessage = '';
    if (langflowData.outputs && 
        langflowData.outputs[0].outputs && 
        langflowData.outputs[0].outputs[0].messages && 
        langflowData.outputs[0].outputs[0].messages[0].message) {
      aiMessage = langflowData.outputs[0].outputs[0].messages[0].message;

      console.log('Saving AI message to Supabase:', aiMessage);
      // Save AI message to Supabase
      const { error: aiMessageError } = await supabase
        .from('chat_sessions')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          title: title || message.substring(0, 50) + '...',
          sender: 'ai',
          content: aiMessage,
        });

      if (aiMessageError) {
        console.error('Error saving AI message:', aiMessageError);
      }
    } else {
      console.error('Unexpected Langflow API response structure:', JSON.stringify(langflowData, null, 2));
      return NextResponse.json({ error: 'Unexpected response from Langflow API' }, { status: 500 });
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + (error as Error).message }, { status: 500 });
  }
}