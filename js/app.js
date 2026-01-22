// Carrega os dados do JSON local
async function loadData() {
    try {
        const response = await fetch('data/db.json');
        const db = await response.json();

        // 1. Preencher Perfil
        document.getElementById('user-name').innerText = db.perfil.nome;
        document.getElementById('user-role').innerText = db.perfil.cargo;

        // 2. Renderizar Projetos de TI
        const projectsContainer = document.getElementById('projects-grid');
        db.projetos_ti.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'card-tech';
            card.innerHTML = `
                <div class="card-header">
                    <span class="badge">${proj.categoria}</span>
                    <h3>${proj.titulo}</h3>
                </div>
                <p>${proj.descricao}</p>
                <div class="tech-stack">
                    ${proj.techs.map(t => `<span>${t}</span>`).join('')}
                </div>
            `;
            projectsContainer.appendChild(card);
        });

        // 3. Renderizar Gráfico de Finanças (Chart.js)
        renderChart(db.carteira_teorica);

    } catch (error) {
        console.error("Erro ao carregar banco de dados:", error);
    }
}

function renderChart(dataFinanceira) {
    const ctx = document.getElementById('myPortfolioChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dataFinanceira.labels,
            datasets: [{
                data: dataFinanceira.data,
                backgroundColor: dataFinanceira.colors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

// Navegação SPA (Single Page Application) - Sem recarregar a página
window.showSection = function(sectionId) {
    // Esconde tudo
    document.querySelectorAll('.view').forEach(el => {
        el.classList.remove('active-view');
        el.classList.add('hidden-view');
    });
    // Remove classe active dos botões
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // Mostra o desejado
    document.getElementById(sectionId).classList.remove('hidden-view');
    document.getElementById(sectionId).classList.add('active-view');
    
    // Atualiza botão (simples logic, pode melhorar)
    event.target.classList.add('active');
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadData);