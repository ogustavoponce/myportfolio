const app = {
    data: null,

    init: async () => {
        // Carrega os dados reais
        const response = await fetch('data/db.json');
        app.data = await response.json();
        
        // Inicia na Home
        app.render('home');
        
        // Ativa os botões do menu
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active de todos e adiciona no clicado
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                // Renderiza a seção
                app.render(e.target.dataset.target);
            });
        });
    },

    render: (view) => {
        const container = document.getElementById('app-content');
        const d = app.data;

        // EFEITO FADE IN
        container.style.opacity = 0;
        setTimeout(() => container.style.opacity = 1, 100);

        if (view === 'home') {
            container.innerHTML = `
                <div class="hero">
                    <span class="badge">🚀 Rumo ao Sicredi</span>
                    <h1>${d.profile.name}</h1>
                    <h2>${d.profile.headline}</h2>
                    <p style="max-width: 600px; margin: 0 auto; color: #64748b;">${d.profile.about}</p>
                </div>
                <div class="grid-3">
                    <div class="card">
                        <h3>🎓 IFPR</h3>
                        <p>Técnico em Informática</p>
                    </div>
                    <div class="card">
                        <h3>💼 CIEE</h3>
                        <p>Jovem Aprendiz Ativo</p>
                    </div>
                    <div class="card">
                        <h3>📈 CPA-20</h3>
                        <p>Focadão nos estudos</p>
                    </div>
                </div>
            `;
        }

        if (view === 'finance') {
            container.innerHTML = `
                <h2 class="section-title">💰 Minha Jornada Financeira</h2>
                <div class="grid-2">
                    <div class="card">
                        <h3>Objetivos (Roadmap)</h3>
                        <div style="margin-top: 20px;">
                            ${d.finance.roadmap.map(item => `
                                <div class="roadmap-step ${item.status}">
                                    <span>${item.year}</span>
                                    <h4>${item.goal}</h4>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="card">
                        <h3>Onde eu investiria hoje</h3>
                        <p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">${d.finance.thesis}</p>
                        <canvas id="chartFinance"></canvas>
                    </div>
                </div>
            `;
            // Renderiza o gráfico depois que o HTML existir
            setTimeout(() => {
                new Chart(document.getElementById('chartFinance'), {
                    type: 'doughnut',
                    data: {
                        labels: d.finance.allocation.labels,
                        datasets: [{
                            data: d.finance.allocation.data,
                            backgroundColor: d.finance.allocation.colors,
                            borderWidth: 0
                        }]
                    },
                    options: { responsive: true, cutout: '75%', plugins: { legend: { position: 'bottom' } } }
                });
            }, 50);
        }

        if (view === 'tech') {
            container.innerHTML = `
                <h2 class="section-title">💻 Projetos & Código</h2>
                <div class="grid-3">
                    ${d.tech.map(proj => `
                        <div class="card">
                            <span style="font-size:0.8rem; color:var(--primary); font-weight:bold;">${proj.type}</span>
                            <h3 style="margin: 10px 0;">${proj.title}</h3>
                            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 20px;">${proj.description}</p>
                            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                ${proj.techs.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', app.init);