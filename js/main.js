// Estado da Aplicação
const AppState = {
    data: null,
    market: null,
    currentView: 'home'
};

// Inicialização
async function init() {
    // 1. Carregar Dados
    AppState.data = await API.getLocalData();
    AppState.market = await API.getMarketData();

    // 2. Renderizar Menu
    renderMenu();

    // 3. Renderizar Home por padrão
    navigate('home');
}

function renderMenu() {
    const nav = document.getElementById('main-nav');
    nav.innerHTML = `
        <a onclick="navigate('home')" class="nav-link" id="link-home">Profile</a>
        <a onclick="navigate('finance')" class="nav-link" id="link-finance">Investments</a>
        <a onclick="navigate('tech')" class="nav-link" id="link-tech">Engineering</a>
    `;
}

// Roteador Simples (SPA Logic)
window.navigate = function(view) {
    const app = document.getElementById('app');
    
    // Atualiza Menu Active
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(`link-${view}`).classList.add('active');

    // Lógica de Renderização
    if (view === 'home') {
        app.innerHTML = Components.renderHero(AppState.data.profile);
        // Efeito especial
        Utils.typeWriter(document.getElementById('hero-title'), AppState.data.profile.name);
    } 
    else if (view === 'finance') {
        app.innerHTML = Components.renderFinance(AppState.data.finance, AppState.market);
        // Inicializar Gráfico (Chart.js)
        setTimeout(() => {
            new Chart(document.getElementById('financeChart'), {
                type: 'doughnut',
                data: {
                    labels: AppState.data.finance.allocation.labels,
                    datasets: [{
                        data: AppState.data.finance.allocation.data,
                        backgroundColor: AppState.data.finance.allocation.colors,
                        borderWidth: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } } }
            });
        }, 100);
    } 
    else if (view === 'tech') {
        app.innerHTML = Components.renderTech(AppState.data.tech);
    }
}

// Start Engine
document.addEventListener('DOMContentLoaded', init);