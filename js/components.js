const Components = {
    // Tela Inicial
    home: (data) => `
        <section class="hero-section fade-in">
            <span class="hero-pre">Olá, meu nome é</span>
            <h1 class="hero-title">${data.profile.name}.</h1>
            <h2 class="hero-subtitle">${data.profile.role}.</h2>
            <p class="hero-desc">${data.profile.about}</p>
            <div style="margin-top: 30px;">
                <button class="glass-card" onclick="app.router('finance')" style="color:var(--sicredi-blue); cursor:pointer;">
                    Ver Tese de Investimentos &rarr;
                </button>
            </div>
        </section>
    `,

    // Tela de Finanças
    finance: (data) => `
        <section class="fade-in">
            <h2 class="hero-subtitle" style="font-size:2rem; margin-bottom:40px;">Gestão de Ativos</h2>
            <div class="grid-2">
                <div>
                    <div class="glass-card" style="margin-bottom:30px">
                        <h3 style="color:var(--sicredi-blue)">Tese de Alocação</h3>
                        <p>${data.finance.thesis}</p>
                    </div>
                    <h3>Roadmap Profissional</h3>
                    <div style="margin-top:20px">
                        ${data.finance.roadmap.map(item => `
                            <div class="roadmap-item ${item.status}">
                                <span style="font-family:var(--font-code); color:var(--sicredi-blue)">${item.year}</span>
                                <h4>${item.goal}</h4>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="glass-card">
                    <h3 style="text-align:center; margin-bottom:20px;">Distribuição de Carteira</h3>
                    <canvas id="financeChart"></canvas>
                </div>
            </div>
        </section>
    `,

    // Tela de TI
    tech: (data) => `
        <section class="fade-in">
            <h2 class="hero-subtitle" style="font-size:2rem; margin-bottom:40px;">Engenharia de Software</h2>
            <div class="grid-3">
                ${data.tech.map(proj => `
                    <div class="glass-card">
                        <div class="project-top">
                            <i data-feather="folder" class="folder-icon"></i>
                            <a href="${proj.link}" target="_blank"><i data-feather="external-link"></i></a>
                        </div>
                        <h3>${proj.title}</h3>
                        <p style="font-size:0.9rem">${proj.description}</p>
                        <div class="tech-list">
                            ${proj.techs.map(t => `<span>${t}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    // Tela de Blog
    blog: (data) => `
        <section class="fade-in">
             <h2 class="hero-subtitle" style="font-size:2rem; margin-bottom:40px;">Knowledge Base</h2>
             <div class="grid-3">
                ${data.blog.map(post => `
                    <div class="glass-card">
                        <span style="font-family:var(--font-code); font-size:12px; color:var(--sicredi-blue)">${post.date}</span>
                        <h3 style="margin:10px 0; font-size:1.3rem">${post.title}</h3>
                        <p>${post.preview}</p>
                        <a href="#" style="display:inline-block; margin-top:15px; font-size:14px;">Ler Artigo &rarr;</a>
                    </div>
                `).join('')}
             </div>
        </section>
    `
};