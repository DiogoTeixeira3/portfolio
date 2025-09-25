// Projetos de exemplo
const projetos = [
    { nome: "Projeto 1", linguagens: ["HTML", "CSS", "JS"], repo: "#", pdf: "#" },
    { nome: "Projeto 2", linguagens: ["Java", "SQL"], repo: "#", pdf: "#" },
    { nome: "Projeto 3", linguagens: ["Python", "Flask"], repo: "#", pdf: "#" }
];

const container = document.getElementById("projetos-container");

projetos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("projeto");
    div.innerHTML = `
        <img src="https://via.placeholder.com/280x150.png?text=${p.nome}" alt="${p.nome}">
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

// Scroll suave para menu
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        updateSetas();
    });
});

// Setas fixas topo/fundo
const secoes = ['header', 'About', 'Projects', 'Contact'];
const setaCima = document.querySelector('.seta-cima');
const setaBaixo = document.querySelector('.seta-baixo');

function getCurrentSection() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let current = 'header';
    secoes.forEach(sec => {
        const el = sec === 'header' ? document.querySelector('header') : document.getElementById(sec);
        if (el && el.offsetTop <= scrollPos) {
            current = sec;
        }
    });
    return current;
}

function updateSetas() {
    const current = getCurrentSection();

    // esconder setas completamente no header
    if(current === 'header') {
        setaCima.style.display = 'none';
        setaBaixo.style.display = 'none';
        document.body.classList.add('header-view');
        return;
    } else {
        document.body.classList.remove('header-view');
    }

    const idx = secoes.indexOf(current);

    // seta cima
    if(idx <= 0) {
        setaCima.style.display = 'none';
    } else {
        setaCima.style.display = 'block';
        setaCima.dataset.target = secoes[idx - 1];
    }

    // seta baixo
    if(idx >= secoes.length - 1) {
        setaBaixo.style.display = 'none';
    } else {
        setaBaixo.style.display = 'block';
        setaBaixo.dataset.target = secoes[idx + 1];
    }
}

// clicar nas setas
[setaCima, setaBaixo].forEach(seta => {
    seta.addEventListener('click', () => {
        const targetId = seta.dataset.target;
        const target = targetId === 'header' ? document.querySelector('header') : document.getElementById(targetId);
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// atualizar setas ao scroll
window.addEventListener('scroll', () => {
    updateSetas();
});

// Inicialização
updateSetas();
