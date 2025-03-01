// script.js

const userPromptInput = document.getElementById('userPrompt');
const sendBtn = document.getElementById('sendBtn');
const responseBox = document.getElementById('responseBox');

sendBtn.addEventListener('click', async () => {
  const prompt = userPromptInput.value.trim();
  if (!prompt) {
    responseBox.textContent = 'Please enter a prompt.';
    return;
  }

  responseBox.textContent = 'Processing...';

  try {
    // Example Netlify Function endpoint
    const netlifyFunctionUrl = 'https://https://roaring-bavarois-b02f5d.netlify.app.netlify.app/.netlify/functions/agent';

    const res = await fetch(netlifyFunctionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    // 'data' should contain the AI result from the agent
    responseBox.textContent = data.result || 'No result returned.';
  } catch (error) {
    responseBox.textContent = `Error: ${error.message}`;
  }
});