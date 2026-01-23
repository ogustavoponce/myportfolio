const app = {
    data: null,

    init: async () => {
        app.renderSkeleton();
        app.fetchMarketData();

        setTimeout(async () => {
            try {
                const response = await fetch('data/db.json');
                app.data = await response.json();
                app.render('home'); 
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }, 800);

        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                app.render(e.target.dataset.target);
            });
        });
    },

    fetchMarketData: async () => {
        try {
            const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
            const data = await res.json();
            if(document.getElementById('val-usd')) {
                document.getElementById('val-usd').innerText = parseFloat(data.USDBRL.bid).toFixed(2);
                document.getElementById('val-eur').innerText = parseFloat(data.EURBRL.bid).toFixed(2);
                document.getElementById('val-btc').innerText = parseFloat(data.BTCBRL.bid).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            }
        } catch (e) {
            console.log("API de mercado offline");
        }
    },

    renderSkeleton: () => {
        const grid = `
            <div class="bento-grid" style="opacity:0.6">
                <div class="tile col-8" style="height:300px"><div class="skeleton" style="width:50%; height:40px; margin-bottom:20px"></div><div class="skeleton" style="width:100%; height:100px"></div></div>
                <div class="tile col-4" style="height:300px"><div class="skeleton" style="width:100%; height:100%"></div></div>
                <div class="tile col-4" style="height:200px"><div class="skeleton" style="width:100%; height:100%"></div></div>
                <div class="tile col-4" style="height:200px"><div class="skeleton" style="width:100%; height:100%"></div></div>
                <div class="tile col-4" style="height:200px"><div class="skeleton" style="width:100%; height:100%"></div></div>
            </div>`;
        document.getElementById('app-content').innerHTML = grid;
    },

    render: (view) => {
        const container = document.getElementById('app-content');
        const d = app.data;
        let html = '';

        if (view === 'home') {
            html = `
                <div class="bento-grid">
                    <div class="tile col-8">
                        <span class="status-badge">🟢 ${d.profile.status}</span>
                        <h1>${d.profile.headline}</h1>
                        <p>${d.profile.about}</p>
                        <div style="margin-top:auto; padding-top:20px;">
                            <button class="btn-contact" onclick="app.render('tech')">Ver Portfólio Técnico</button>
                        </div>
                    </div>
                    <div class="tile col-4" style="background:var(--text-primary); color:white;">
                        <h3 style="color:#94a3b8">Core Skills</h3>
                        <ul style="list-style:none; margin-top:20px;">
                            <li style="padding:15px 0; border-bottom:1px solid #334155; display:flex; justify-content:space-between;">
                                <span>Mercado</span> <span style="font-family:monospace; color:#4ade80">CPA-20</span>
                            </li>
                            <li style="padding:15px 0; border-bottom:1px solid #334155; display:flex; justify-content:space-between;">
                                <span>Código</span> <span style="font-family:monospace; color:#60a5fa">JS/Python</span>
                            </li>
                            <li style="padding:15px 0; display:flex; justify-content:space-between;">
                                <span>Idiomas</span> <span style="font-family:monospace; color:#facc15">EN/PT</span>
                            </li>
                        </ul>
                    </div>
                    <div class="tile col-6">
                        <h3>Último Projeto</h3>
                        <h2>${d.tech[0].title}</h2>
                        <p style="font-size:0.9rem">${d.tech[0].details}</p>
                    </div>
                    <div class="tile col-6">
                        <h3>Visão de Mercado</h3>
                        <p>"${d.finance.macro_view}"</p>
                    </div>
                </div>
            `;
        }

        if (view === 'finance') {
            html = `
                <div class="bento-grid">
                    <div class="tile col-12">
                        <h3>Tese de Investimento</h3>
                        <h1>${d.finance.thesis}</h1>
                    </div>
                    ${d.finance.portfolio.map(p => `
                        <div class="tile col-6">
                            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                <span class="tech-pill">${p.asset}</span>
                                <span style="font-weight:700; color:var(--accent)">${p.allocation}</span>
                            </div>
                            <h2>${p.ticker}</h2>
                            <p>${p.rationale}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (view === 'tech') {
            html = `
                <div class="bento-grid">
                    <div class="tile col-12">
                        <h1>Engenharia de Software</h1>
                        <p>Desenvolvimento de soluções focadas em estabilidade e segurança.</p>
                    </div>
                    ${d.tech.map(t => `
                        <div class="tile col-4">
                            <span class="tech-pill" style="background:#EFF6FF; color:var(--accent)">${t.hook}</span>
                            <h3 style="margin-top:10px">${t.category}</h3>
                            <h2 style="font-size:1.25rem; margin-bottom:10px">${t.title}</h2>
                            <p style="font-size:0.9rem; margin-bottom:20px; flex-grow:1">${t.details}</p>
                            <div>
                                ${t.stack.map(s => `<span class="tech-pill">${s}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        container.innerHTML = html + app.renderFooter();
        feather.replace();
    },

    // Footer Azul Royal
    renderFooter: () => {
        const d = app.data;
        return `
            <footer>
                <div class="bento-grid">
                    <div class="col-4">
                        <h2>${d.profile.name}</h2>
                        <p style="margin-top:10px">
                            ${d.profile.location}<br>
                            &copy; 2026. All rights reserved.
                        </p>
                    </div>
                    <div class="col-4">
                        <h3>Navegação</h3>
                        <ul>
                            <li><a href="#" onclick="app.render('home')">Dashboard</a></li>
                            <li><a href="#" onclick="app.render('finance')">Asset Management</a></li>
                            <li><a href="#" onclick="app.render('tech')">Engineering</a></li>
                        </ul>
                    </div>
                    <div class="col-4">
                        <h3>Conecte-se</h3>
                        <ul>
                            <li><a href="mailto:${d.profile.social.email}">Email Corporativo</a></li>
                            <li><a href="https://${d.profile.social.linkedin}" target="_blank">LinkedIn</a></li>
                            <li><a href="https://${d.profile.social.github}" target="_blank">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        `;
    }
};

document.addEventListener('DOMContentLoaded', app.init);