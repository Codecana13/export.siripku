const body = {
  model: 'qwen3-vl:8b',
  messages: [
    { role: 'user', content: 'Generate JSON with {"seoTitle":"hello"} without any explanations.' }
  ],
  stream: false,
  options: { num_predict: 2048 }
};

fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})
.then(r => r.json())
.then(d => {
  console.log('=== RAW ===');
  console.log(d.message?.content);
  console.log('=== THINKING ===');
  console.log(d.message?.thinking);
  console.log('=== END ===');
})
.catch(e => console.error(e));
