document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const closeBtn = document.getElementById('chatbotClose');
  const messagesEl = document.getElementById('chatbotMessages');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');

  if (!toggleBtn || !panel || !form) return;

  let history = []; // [{ role: 'user' | 'assistant', content }]
  let isSending = false;

  function open() {
    panel.hidden = false;
    toggleBtn.classList.add('is-open');
    input.focus();
  }

  function close() {
    panel.hidden = true;
    toggleBtn.classList.remove('is-open');
  }

  toggleBtn.addEventListener('click', () => {
    if (panel.hidden) open(); else close();
  });
  closeBtn?.addEventListener('click', close);

  function appendMessage(role, text) {
    const el = document.createElement('div');
    el.className = `chatbot-message chatbot-message--${role === 'user' ? 'user' : 'bot'}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function appendTyping() {
    const el = document.createElement('div');
    el.className = 'chatbot-message chatbot-message--bot chatbot-message--typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message || isSending) return;

    isSending = true;
    input.value = '';
    appendMessage('user', message);

    const typingEl = appendTyping();

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history })
      });
      const data = await res.json();

      typingEl.remove();

      if (!data.success) {
        appendMessage('bot', data.message || "Sorry, I couldn't respond right now.");
        isSending = false;
        return;
      }

      appendMessage('bot', data.reply);
      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      typingEl.remove();
      appendMessage('bot', 'Network error — please try again.');
    } finally {
      isSending = false;
    }
  });
});
