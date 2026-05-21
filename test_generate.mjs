const body = {
  model: 'qwen3-vl:8b',
  prompt: 'Generate SEO metadata for an article about Indonesia fish exports as JSON.\n```json\n{',
  stream: false,
  options: { temperature: 0.2, num_predict: 500 }
};

fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})
.then(r => r.json())
.then(d => {
  console.log('=== RAW ===');
  console.log(d.response);
  console.log('=== END ===');
})
.catch(e => console.error(e));
