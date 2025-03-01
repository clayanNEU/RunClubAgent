// netlify/functions/agent/index.js

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    const { prompt } = JSON.parse(event.body || '{}');
    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No prompt provided' })
      };
    }
    console.log('Prompt:', prompt);

    // Import the Toolhouse and OpenAI SDKs
    const { Toolhouse } = require('@toolhouseai/sdk');
    const OpenAI = require('openai');

    const MODEL = 'gpt-4o-mini';

    const toolhouse = new Toolhouse({
      apiKey: process.env.TOOLHOUSE_API_KEY,
      metadata: {
        id: 'runclub-user',
        timezone: '0'
      }
    });

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Build the messages array
    const messages = [
      {
        role: 'user',
        content: prompt
      }
    ];

    // Use your bundle "run-scrape" to fetch only the tools you need
    const tools = await toolhouse.getTools("run-scrape");

    // First chat completion request
    const chatCompletion = await client.chat.completions.create({
      model: MODEL,
      messages,
      tools
    });

    // Run any invoked tools
    const openAiMessage = await toolhouse.runTools(chatCompletion);

    // Combine messages and do a final completion
    const newMessages = [...messages, ...openAiMessage];
    const chatCompleted = await client.chat.completions.create({
      model: MODEL,
      messages: newMessages,
      tools
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: chatCompleted.choices?.[0]?.message?.content || 'No content'
      })
    };
  } catch (err) {
    console.error('Agent Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};