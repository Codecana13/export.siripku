const prompt = `<|im_start|>system
You are an SEO expert that only outputs JSON.<|im_end|>
<|im_start|>user
Analyze this article and return ONLY a JSON object with SEO metadata. No explanations.

Title: Why Importers Choose Indonesia
Category: export-guides
Content: Indonesia is great for fish.

Return ONLY this JSON:
{"seoTitle":"...","metaDescription":"...","focusKeyword":"...","slug":"...","tags":["..."],"category":"..."}<|im_end|>
<|im_start|>assistant
{"seoTitle":`;

const body = {
  model: 'qwen3-vl:8b',
  prompt: prompt,
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
  console.log('{"seoTitle":' + d.response);
  console.log('=== END ===');
})
.catch(e => console.error(e));
