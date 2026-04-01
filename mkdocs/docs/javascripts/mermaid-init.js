window.mermaidConfig = { startOnLoad: false };

function renderMermaid() {
  if (typeof mermaid === 'undefined') return;
  mermaid.initialize(window.mermaidConfig);
  const blocks = document.querySelectorAll('pre code.language-mermaid');
  blocks.forEach((codeEl, idx) => {
    const pre = codeEl.closest('pre');
    if (!pre) return;
    const source = codeEl.textContent || '';
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.id = `mermaid-${idx}-${Date.now()}`;
    div.textContent = source;
    pre.replaceWith(div);
  });
  mermaid.run({ querySelector: '.mermaid' });
}

if (typeof document$ !== 'undefined' && document$.subscribe) {
  document$.subscribe(() => renderMermaid());
} else {
  document.addEventListener('DOMContentLoaded', renderMermaid);
}
