document.addEventListener('DOMContentLoaded', () => {
  // --- Projetos ---
  const projetos = [
    { nome: "Checkers", linguagens: ["Kotlin", "Compose"], repo: "https://github.com/DiogoTeixeira3/Checkers", pdf: "files/Checkers.pdf", img: "files/checkers.png" },
    { nome: "Padel Manager", linguagens: ["Kotlin", "SQL", "HTML", "CSS", "JavaScript"], repo: "https://github.com/DiogoTeixeira3/projeto2", pdf: "files/projeto2.pdf", img: "files/PadelManager.png" },
    { nome: "Projeto 3", linguagens: ["Python", "Flask"], repo: "https://github.com/DiogoTeixeira3/projeto3", pdf: "files/projeto3.pdf", img: "files/projeto3.png" },
    { nome: "Projeto 4", linguagens: ["C", "Assembly"], repo: "https://github.com/DiogoTeixeira3/projeto4", pdf: "files/projeto4.pdf", img: "files/projeto4.png" },
    { nome: "Projeto 5", linguagens: ["React", "Node.js"], repo: "https://github.com/DiogoTeixeira3/projeto5", pdf: "files/projeto5.pdf", img: "files/projeto5.png" },
    { nome: "Connect Four", linguagens: ["Kotlin"], repo: "https://github.com/DiogoTeixeira3/ConnectFour.git", pdf: "files/ConnectedFour.pdf", img: "files/ConnectFour.png" }
  ];

  const container = document.getElementById("projetos-container");
  if (container) {
    container.innerHTML = '';
    container.setAttribute('role', 'list');
    projetos.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("projeto");
      div.setAttribute('role', 'listitem');
      div.innerHTML = `
        <img src="${p.img || `https://via.placeholder.com/280x150.png?text=${encodeURIComponent(p.nome)}`}" alt="${p.nome}">
        <div class="projeto-content">
            <h3>${p.nome}</h3>
            <div class="linguagens">
                ${p.linguagens.map(l => `<span class="linguagem">${l}</span>`).join('')}
            </div>
            <div class="projeto-buttons">
                <a href="${p.repo}" target="_blank">GitHub</a>
                <a href="${p.pdf}" target="_blank" class="pdf">PDF</a>
            </div>
        </div>
      `;
      container.appendChild(div);
    });
    container.setAttribute('aria-busy', 'false');
  }

  // --- Navegação suave ---
  document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(updateSetas, 450);
    });
  });

  // --- Setas ---
  const secoes = ['header', 'About', 'Projects', 'Contact'];
  const setaCima = document.querySelector('.seta-cima');
  const setaBaixo = document.querySelector('.seta-baixo');

  function getCurrentSection() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let current = 'header';
    secoes.forEach(sec => {
      const el = sec === 'header' ? document.querySelector('header') : document.getElementById(sec);
      if (el && el.offsetTop <= scrollPos) current = sec;
    });
    return current;
  }

  function updateSetas() {
    const current = getCurrentSection();
    if (current === 'header') {
      setaCima.style.display = 'none'; setaBaixo.style.display = 'none';
      document.body.classList.add('header-view');
      return;
    } else document.body.classList.remove('header-view');
    const idx = secoes.indexOf(current);
    setaCima.style.display = idx <= 0 ? 'none' : 'block';
    if (idx > 0) setaCima.dataset.target = secoes[idx - 1];
    setaBaixo.style.display = idx >= secoes.length - 1 ? 'none' : 'block';
    if (idx < secoes.length - 1) setaBaixo.dataset.target = secoes[idx + 1];
  }

  [setaCima, setaBaixo].forEach(seta => {
    seta.addEventListener('click', () => {
      const targetId = seta.dataset.target;
      const target = targetId === 'header' ? document.querySelector('header') : document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', updateSetas);
  updateSetas();

  // --- About Me: Ver mais / Ver menos ---
  const aboutBlocks = Array.from(document.querySelectorAll('.about-personal, .about-education'));
  let currentExpanded = null;
  let overlay = null;

  aboutBlocks.forEach(block => {
    let btn = block.querySelector('.ver-mais');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'ver-mais';
      btn.textContent = 'More';
      block.appendChild(btn);
    }
    btn.type = 'button';
    btn.addEventListener('click', () => {
      if (block.classList.contains('expanded')) collapseBlock(block);
      else expandBlock(block);
    });
  });

  function expandBlock(block) {
    if (currentExpanded && currentExpanded !== block) collapseBlock(currentExpanded);
    const btn = block.querySelector('.ver-mais');
    block.classList.add('expanded');
    if (btn) btn.textContent = 'Close';
    overlay = document.createElement('div');
    Object.assign(overlay.style, { position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.6)', zIndex: '1990' });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', () => collapseBlock(block), { once: true });
    block.style.zIndex = '2000';
    currentExpanded = block;
  }

  function collapseBlock(block) {
    const btn = block.querySelector('.ver-mais');
    block.classList.remove('expanded');
    if (btn) btn.textContent = 'More';
    if (overlay) { overlay.remove(); overlay = null; }
    document.body.style.overflow = '';
    block.style.zIndex = '';
    currentExpanded = null;
  }

  // --- Dark/Light Mode ---
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '🌞';
  });

});
