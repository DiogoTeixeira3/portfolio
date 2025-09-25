// Lista de projetos
const projetos = [
    { nome: "Projeto 1", descricao: "Descrição detalhada do Projeto 1." },
    { nome: "Projeto 2", descricao: "Descrição detalhada do Projeto 2." },
    { nome: "Projeto 3", descricao: "Descrição detalhada do Projeto 3." }
];

// Adicionar projetos dinamicamente
const container = document.getElementById('projetos-container');
projetos.forEach(projeto => {
    const div = document.createElement('div');
    div.className = 'projeto';
    div.innerHTML = `<h3>${projeto.nome}</h3><p>${projeto.descricao}</p>`;
    container.appendChild(div);
});

// Lidar com envio do formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Mensagem enviada! Obrigado.");
    this.reset();
});
