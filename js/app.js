const app = {
    data: null,

    init: async () => {
        // 1. Renderizar Estado de Carregamento (Skeleton)
        app.renderSkeleton();

        // 2. Simular delay de rede (pra dar peso) e buscar dados
        setTimeout(async () => {
            const response = await fetch('data/db.json');
            app.data = await response.json();
            
            // 3. Renderizar Home Real
            app.render('home');
        }, 1200); // 1.2 segundos de "loading"

        // Event Listeners do Menu
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                app.render(e.target.dataset.target);
            });
        });
    },

    // A Tela de "Aguarde..."
    renderSkeleton: () => {
        const container = document.getElementById('app-content');
        container.innerHTML = `
            <div class="bento-grid" style="margin-top: 60px;">
                <div class="tile col-span-8" style="height: 300px;"><div class="skeleton" style="width:50%; height:40px; margin-bottom:20px"></div><div class="skeleton" style="width:100%; height:150px;"></div></div>
                <div class="tile col-span-4"><div class="skeleton" style="width:100%; height:100%;"></div></div>
                <div class="tile col-span-4" style="height: 200px;"><div class="skeleton" style="width:100%; height:100%;"></div></div>
                <div class="tile col-span-4" style="height: 200px;"><div class="skeleton" style="width:100%; height:100%;"></div></div>
                <div class="tile col-span-4" style="height: 200px;"><div class="skeleton" style="width:100%; height:100%;"></div></div>
            </div>
        `;
    },

    render: (view) => {
        const container = document.getElementById('app-content');
        const d = app.data;
        
        // Estrutura Baseada em Grid (Bento Box)
        if (view === 'home') {
            container.innerHTML = `
                <div class="bento-grid" style="margin-top: 60px;">
                    <div class="tile col-span-8">
                        <h3>Perfil Profissional</h3>
                        <h1>${d.profile.name}</h1>
                        <p style="margin-top: 10px; font-size: 1.2rem; color: var(--text-primary);">${d.profile.role}</p>
                        <p style="margin-top: 20px;">${d.profile.about}</p>
                        <div class="tag-container">
                            <span class="tech-pill">📍 ${d.profile.location}</span>
                            <span class="tech-pill">🚀 Disponível para Projetos</span>
                        </div>
                    </div>

                    <div class="tile col-span-4" style="background: #0F172A; color: white;">
                        <h3 style="color: #94A3B8;">Status Atual</h3>
                        <div style="margin-top: 40px;">
                            <div class="data-value" style="color:white">CPA-20</div>
                            <div class="data-label">Foco de Estudo</div>
                            <hr style="border-color: #334155; margin: 20px 0;">
                            <div class="data-value" style="color:white">JavaScript</div>
                            <div class="data-label">Stack Principal</div>
                        </div>
                    </div>

                    <div class="tile col-span-6">
                        <h3>Último Projeto</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-weight:700; font-size:1.1rem;">${d.tech[0].title}</span>
                            <a href="#" style="color:var(--accent); text-decoration:none; font-weight:600;">Ver &rarr;</a>
                        </div>
                        <p style="margin-top:10px; font-size:0.9rem;">${d.tech[0].description}</p>
                    </div>

                    <div class="tile col-span-6">
                        <h3>Alocação Estratégica</h3>
                        <div style="display:flex; gap:10px; margin-top:10px;">
                            <div style="flex:1;">
                                <div class="data-value">45%</div>
                                <div class="data-label">Renda Fixa</div>
                            </div>
                            <div style="flex:1;">
                                <div class="data-value">25%</div>
                                <div class="data-label">FIIs</div>
                            </div>
                            <div style="flex:1;">
                                <div class="data-value">30%</div>
                                <div class="data-label">Risco</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // View de Projetos
        if (view === 'tech') {
            container.innerHTML = `
                <div class="bento-grid" style="margin-top: 60px;">
                    <div class="tile col-span-12">
                        <h1>Engenharia de Software</h1>
                        <p>Soluções desenvolvidas com foco em escalabilidade.</p>
                    </div>
                    ${d.tech.map(proj => `
                        <div class="tile col-span-4">
                            <h3>${proj.type}</h3>
                            <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:10px;">${proj.title}</h2>
                            <p style="font-size:0.9rem;">${proj.description}</p>
                            <div class="tag-container">
                                ${proj.techs.map(t => `<span class="tech-tag tech-pill">${t}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // View Financeira
        if (view === 'finance') {
            container.innerHTML = `
                <div class="bento-grid" style="margin-top: 60px;">
                     <div class="tile col-span-12">
                        <h1>Asset Management</h1>
                        <p>${d.finance.thesis}</p>
                    </div>
                    <div class="tile col-span-8">
                        <h3>Distribuição de Carteira</h3>
                        <canvas id="chartFinance" style="max-height: 300px;"></canvas>
                    </div>
                     <div class="tile col-span-4">
                        <h3>Roadmap de Competências</h3>
                         <div style="margin-top: 20px;">
                            ${d.finance.roadmap.map(item => `
                                <div style="margin-bottom: 15px; padding-bottom:15px; border-bottom:1px solid var(--border-subtle);">
                                    <div style="font-weight:700; color:var(--text-primary);">${item.goal}</div>
                                    <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">${item.year} • ${item.status}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                new Chart(document.getElementById('chartFinance'), {
                    type: 'bar', // Mudei para BARRA para ficar mais "Analista" e menos "App de Banco"
                    data: {
                        labels: d.finance.allocation.labels,
                        datasets: [{
                            label: 'Alocação %',
                            data: d.finance.allocation.data,
                            backgroundColor: d.finance.allocation.colors,
                            borderRadius: 4
                        }]
                    },
                    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
                });
            }, 50);
        }
    }
};

document.addEventListener('DOMContentLoaded', app.init);