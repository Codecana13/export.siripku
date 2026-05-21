const body = {
  model: 'qwen3-vl:8b',
  prompt: '{"seoTitle":',
  raw: true,
  stream: false,
  options: { temperature: 0.1, num_predict: 200 }
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
