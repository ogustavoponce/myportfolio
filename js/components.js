const Components = {
    renderHero: (profile) => `
        <section class="glass-panel animate-up">
            <h4 style="color:var(--accent)">Olá, eu sou</h4>
            <h1 id="hero-title">${profile.name}</h1>
            <p style="font-size: 1.2rem; color: var(--text-muted); margin: 20px 0;">${profile.tagline}</p>
            <div style="display:flex; gap:15px; margin-top:30px;">
                ${profile.stats.map(s => `
                    <div style="border-right:1px solid #333; padding-right:15px;">
                        <small style="color:#666">${s.label}</small><br>
                        <strong>${s.value}</strong>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    renderFinance: (financeData, marketData) => {
        const usd = marketData ? marketData.USDBRL.bid : '...';
        const selic = '11.25%'; // Valor fixo ou via outra API
        
        return `
        <div class="glass-panel">
            <div class="ticker-tape">
                <span>🇺🇸 USD: R$ ${usd}</span>
                <span>🇧🇷 SELIC: ${selic}</span>
                <span>📈 IBOV: 127k</span>
            </div>
            <h2>Asset Management</h2>
            <div class="grid-2">
                <div>
                    <p>${financeData.thesis}</p>
                    <br>
                    <h3>Roadmap</h3>
                    ${financeData.roadmap.map(item => `
                        <div class="roadmap-item">
                            <div class="status-dot ${item.status === 'active' ? 'status-active' : ''}"></div>
                            <div>
                                <strong>${item.year}</strong>: ${item.goal}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="position:relative; height:300px;">
                    <canvas id="financeChart"></canvas>
                </div>
            </div>
        </div>`;
    },

    renderTech: (techList) => `
        <div class="glass-panel">
            <h2>Projetos de Engenharia</h2>
            <div class="grid-3">
                ${techList.map(proj => `
                    <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:16px;">
                        <h3 style="font-size:1.2rem; margin-bottom:10px;">${proj.title}</h3>
                        <span style="font-size:0.8rem; color:#888; text-transform:uppercase;">${proj.type}</span>
                        <p style="font-size:0.9rem; margin:15px 0; color:#ccc;">${proj.desc}</p>
                        <div style="display:flex; gap:10px; flex-wrap:wrap;">
                            ${proj.stack.map(s => `<span class="tech-tag">${s}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `
};