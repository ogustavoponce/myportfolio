const app = {
    data: null, // Armazena o JSON
    
    // Inicialização
    init: async () => {
        app.data = await API.getDB();
        app.updateTicker();
        app.router('home'); // Carrega a home por padrão
        feather.replace(); // Ícones
    },

    // Roteador SPA
    router: (view) => {
        const container = document.getElementById('app-container');
        
        // Atualiza botões do menu
        document.querySelectorAll('.nav-link').forEach(btn => {
            btn.classList.remove('active');
            if(btn.dataset.target === view) btn.classList.add('active');
        });

        // Renderiza a view correta
        if (view === 'home') container.innerHTML = Components.home(app.data);
        if (view === 'tech') {
            container.innerHTML = Components.tech(app.data);
            feather.replace();
        } 
        if (view === 'blog') container.innerHTML = Components.blog(app.data);
        
        if (view === 'finance') {
            container.innerHTML = Components.finance(app.data);
            app.renderChart(); // Desenha o gráfico
        }
    },

    // Ticker de Mercado
    updateTicker: async () => {
        const market = await API.getMarket();
        if(!market) return;
        
        const el = document.querySelector('.ticker-content');
        const usd = parseFloat(market.USDBRL.bid).toFixed(2);
        const eur = parseFloat(market.EURBRL.bid).toFixed(2);
        const usdVar = market.USDBRL.pctChange > 0 ? 'trend-up' : 'trend-down';
        
        el.innerHTML = `
            <span>💵 USD/BRL: <strong>R$ ${usd}</strong> <small class="${usdVar}">(${market.USDBRL.pctChange}%)</small></span>
            <span>💶 EUR/BRL: <strong>R$ ${eur}</strong></span>
            <span>🏦 SELIC: <strong>11.25%</strong></span>
            <span>📊 IBOV: <strong>127.400 pts</strong></span>
        `;
    },

    // Gráfico Chart.js
    renderChart: () => {
        setTimeout(() => {
            const ctx = document.getElementById('financeChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: app.data.finance.allocation.labels,
                    datasets: [{
                        data: app.data.finance.allocation.data,
                        backgroundColor: app.data.finance.allocation.colors,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#a8b2d1', font: {family: 'Fira Code'} } }
                    },
                    cutout: '70%'
                }
            });
        }, 100); // Pequeno delay para garantir que o HTML existe
    }
};

// Start
document.addEventListener('DOMContentLoaded', app.init);