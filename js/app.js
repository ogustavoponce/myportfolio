const app = {
    data: null,

    init: async () => {
        app.renderSkeleton();
        
        // Simulação de Loading "Pesado"
        setTimeout(async () => {
            const response = await fetch('data/db.json');
            app.data = await response.json();
            app.render('home'); // Home é a default
        }, 1000);

        // Menu Logic
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                app.render(e.target.dataset.target);
            });
        });
    },

    // Skeleton Screen (Visual Técnico de Carregamento)
    renderSkeleton: () => {
        document.getElementById('app-content').innerHTML = `
            <div class="bento-grid" style="margin-top:40px; opacity:0.5">
                <div class="tile col-span-12" style="height:300px; background:#e2e8f0;"></div>
                <div class="tile col-span-6" style="height:200px; background:#e2e8f0;"></div>
                <div class="tile col-span-6" style="height:200px; background:#e2e8f0;"></div>
            </div>`;
    },

    // O Renderizador Principal
    render: (view) => {
        const container = document.getElementById('app-content');
        const d = app.data;
        let contentHTML = '';

        // --- VIEW: HOME (Apresentação Digna) ---
        if (view === 'home') {
            contentHTML = `
                <div class="bento-grid fade-in">
                    <div class="tile col-span-8">
                        <div class="tech-pill" style="margin-bottom:20px; display:inline-block">🟢 ${d.profile.status}</div>
                        <h1 style="font-size:2.5rem; line-height:1.1; margin-bottom:20px;">${d.profile.headline}</h1>
                        <p style="font-size:1.1rem; color:var(--text-primary)">${d.profile.about}</p>
                        <div style="margin-top:30px; display:flex; gap:15px;">
                            <button class="nav-btn active" onclick="app.render('tech')">Ver Projetos Tech</button>
                            <button class="nav-btn" style="background:white; border:1px solid #ccc; color:#333" onclick="app.render('finance')">Ver Tese Financeira</button>
                        </div>
                    </div>

                    <div class="tile col-span-4" style="background:var(--text-primary); color:white;">
                        <h3 style="color:#94a3b8">Competências Chave</h3>
                        <ul style="list-style:none; margin-top:30px;">
                            <li style="padding:15px 0; border-bottom:1px solid #334155; display:flex; justify-content:space-between;">
                                <span>Mercado Financeiro</span>
                                <span style="font-family:monospace; color:#4ade80">CPA-20</span>
                            </li>
                            <li style="padding:15px 0; border-bottom:1px solid #334155; display:flex; justify-content:space-between;">
                                <span>Programação</span>
                                <span style="font-family:monospace; color:#60a5fa">JS/Python</span>
                            </li>
                            <li style="padding:15px 0; display:flex; justify-content:space-between;">
                                <span>Inglês</span>
                                <span style="font-family:monospace; color:#facc15">Técnico</span>
                            </li>
                        </ul>
                    </div>

                    <div class="tile col-span-12" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;">
                        <div>
                            <h3>Minha Abordagem</h3>
                            <h2 style="font-size:1.5rem">Fullstack Banking</h2>
                        </div>
                        <p style="max-width:500px">Não crio apenas código. Crio ferramentas que analisam risco, projetam juros e otimizam capital.</p>
                    </div>
                </div>
            `;
        }

        // --- VIEW: FINANCE (Investimentos Estruturados) ---
        if (view === 'finance') {
            contentHTML = `
                <div class="bento-grid fade-in">
                    <div class="tile col-span-12">
                        <h3>Visão Macro & Estratégia</h3>
                        <h1 style="font-size:2rem; margin-bottom:15px;">${d.finance.thesis}</h1>
                        <p style="border-left:4px solid var(--accent); padding-left:15px; color:var(--text-primary); font-weight:500;">
                            "${d.finance.macro_view}"
                        </p>
                    </div>

                    ${d.finance.portfolio.map(item => `
                        <div class="tile col-span-6">
                            <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                                <span class="tech-pill">${item.asset}</span>
                                <span style="font-family:monospace; font-weight:bold; font-size:1.2rem; color:var(--accent)">${item.allocation}</span>
                            </div>
                            <h2 style="font-size:1.3rem; margin-bottom:10px;">${item.ticker}</h2>
                            <p style="font-size:0.9rem;">${item.rationale}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // --- VIEW: TECH (Fintech Focus) ---
        if (view === 'tech') {
            contentHTML = `
                <div class="bento-grid fade-in">
                    <div class="tile col-span-12">
                        <h1>Engenharia de Software Financeira</h1>
                        <p>Projetos desenvolvidos com foco em dados, segurança e lógica de negócio.</p>
                    </div>

                    ${d.tech.map(proj => `
                        <div class="tile col-span-4" style="display:flex; flex-direction:column;">
                            <div style="margin-bottom:15px;">
                                <span class="tech-pill" style="background:#eff6ff; color:var(--accent)">${proj.financial_hook}</span>
                            </div>
                            <h3 style="margin-bottom:5px;">${proj.category}</h3>
                            <h2 style="font-size:1.4rem; font-weight:700; margin-bottom:15px; line-height:1.2;">${proj.title}</h2>
                            <p style="font-size:0.9rem; margin-bottom:20px; flex-grow:1;">${proj.details}</p>
                            
                            <div style="border-top:1px solid #eee; padding-top:15px; margin-top:auto;">
                                <div class="tag-container">
                                    ${proj.stack.map(s => `<span style="font-size:0.75rem; color:#64748b; background:#f1f5f9; padding:2px 8px; border-radius:4px;">${s}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // INJETAR CONTEÚDO + RODAPÉ
        container.innerHTML = contentHTML + app.renderFooter();
    },

    // --- RODAPÉ CORPORATIVO (Fat Footer) ---
    renderFooter: () => {
        const d = app.data;
        return `
            <footer style="margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--border-subtle); color: var(--text-secondary);">
                <div class="bento-grid" style="padding-bottom: 40px;"> <div class="col-span-4">
                        <h2 style="color:var(--text-primary); font-size:1.2rem; margin-bottom:10px;">${d.profile.name}</h2>
                        <p style="font-size:0.9rem;">Construindo a próxima geração de serviços financeiros através da tecnologia.</p>
                        <div style="margin-top:20px; font-family:monospace; font-size:0.8rem;">
                            PARANÁ • BRASIL<br>
                            EST. 2026
                        </div>
                    </div>
                    
                    <div class="col-span-2">
                        <h3 style="color:var(--text-primary); margin-bottom:15px;">Navegação</h3>
                        <ul style="list-style:none; line-height:2;">
                            <li><a href="#" onclick="app.render('home'); return false;" style="color:inherit; text-decoration:none;">Dashboard</a></li>
                            <li><a href="#" onclick="app.render('finance'); return false;" style="color:inherit; text-decoration:none;">Investimentos</a></li>
                            <li><a href="#" onclick="app.render('tech'); return false;" style="color:inherit; text-decoration:none;">Tecnologia</a></li>
                        </ul>
                    </div>

                    <div class="col-span-2">
                        <h3 style="color:var(--text-primary); margin-bottom:15px;">Social</h3>
                        <ul style="list-style:none; line-height:2;">
                            <li><a href="https://${d.profile.social.linkedin}" target="_blank" style="color:inherit; text-decoration:none;">LinkedIn</a></li>
                            <li><a href="https://${d.profile.social.github}" target="_blank" style="color:inherit; text-decoration:none;">GitHub</a></li>
                            <li><a href="mailto:${d.profile.social.email}" style="color:inherit; text-decoration:none;">Email</a></li>
                        </ul>
                    </div>

                    <div class="col-span-4">
                        <h3 style="color:var(--text-primary); margin-bottom:15px;">Status do Sistema</h3>
                        <div style="background:#f1f5f9; padding:15px; border-radius:8px; font-size:0.8rem; display:flex; align-items:center; gap:10px;">
                            <div style="width:10px; height:10px; background:#16a34a; border-radius:50%; box-shadow:0 0 5px #16a34a;"></div>
                            <div>
                                <strong>All Systems Operational</strong><br>
                                Last updated: Today
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; font-size:0.8rem; margin-top:40px; padding-bottom:20px;">
                    &copy; 2026 Gustavo Ponce. Todos os direitos reservados. Design System v2.0
                </div>
            </footer>
        `;
    }
};

document.addEventListener('DOMContentLoaded', app.init);