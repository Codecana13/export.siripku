const body = {
  model: 'qwen3-vl:8b',
  messages: [
    { role: 'system', content: 'You are an SEO expert. Respond with JSON only.' },
    { role: 'user', content: 'Generate SEO for an article about Indonesia ornamental fish exports. Return JSON: {"seoTitle":"...","focusKeyword":"..."}' }
  ],
  stream: false,
  options: { temperature: 0.2, num_predict: 500 }
};

fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})
.then(r => r.text())
.then(raw => {
  console.log('=== FULL RAW RESPONSE ===');
  console.log(raw);
  console.log('=== END ===');
})
.catch(e => console.error('Error:', e.message));
