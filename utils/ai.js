const FALLBACKS = {
  default: "I’m running in offline demo mode. I can still help with study plans, programming explanations, project ideas, writing, and summaries. Configure the backend to receive live Gemini responses.",
  project: "For a university AI project, consider combining a focused ML model with a measurable real-world problem, a clear dataset, evaluation metrics, and a simple user interface.",
  programming: "A function is a reusable block of code that performs a specific task. It can receive inputs as parameters and return a result. This helps make programs modular and easier to maintain.",
  study: "A practical study plan should divide the topic into small sessions, include active recall and past-paper practice, and leave time for review and rest."
};

function localFallback(message) {
  const lower = message.toLowerCase();
  if (lower.includes('project') || lower.includes('idea')) return FALLBACKS.project;
  if (lower.includes('program') || lower.includes('code')) return FALLBACKS.programming;
  if (lower.includes('study') || lower.includes('plan')) return FALLBACKS.study;
  return FALLBACKS.default;
}

export async function sendToAI(message, history = []) {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: history.slice(-12).map(item => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          text: item.text
        }))
      })
    });

    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    const data = await response.json();
    if (!data.text) throw new Error('Empty AI response');
    return { text: data.text, source: 'Gemini' };
  } catch (error) {
    console.warn('[NexaAI] Backend unavailable:', error.message);
    return { text: localFallback(message), source: 'Offline demo' };
  }
}
