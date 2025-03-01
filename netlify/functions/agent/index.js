// netlify/functions/agent/agent.js

// 1) Import the Netlify function handler format
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
  
      // 2) Run your Toolhouse & OpenAI code
      // (Using CommonJS or ESM as needed. For Netlify, CommonJS is typical.)
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
  
      // 3) Build the messages array
      const messages = [
        {
          role: 'user',
          content: prompt
        }
      ];
  
      // 4) Fetch tools from Toolhouse
      const tools = await toolhouse.getTools();
  
      // 5) First chat completion request
      const chatCompletion = await client.chat.completions.create({
        model: MODEL,
        messages,
        tools
      });
  
      // 6) Run any invoked tools
      const openAiMessage = await toolhouse.runTools(chatCompletion);
  
      // 7) Combine messages & do final completion
      const newMessages = [...messages, ...openAiMessage];
      const chatCompleted = await client.chat.completions.create({
        model: MODEL,
        messages: newMessages,
        tools
      });
  
      // 8) Return the final response
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