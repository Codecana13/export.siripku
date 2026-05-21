const body = {
  model: 'qwen3-vl:8b',
  prompt: 'Return ONLY this JSON and absolutely nothing else: {"seoTitle":"hello"}',
  format: 'json',
  stream: false,
  options: { num_predict: 500 }
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
