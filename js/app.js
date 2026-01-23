const app = {
    data: null,

    init: async () => {
        app.renderSkeleton();
        
        // Simulação de Loading
        setTimeout(async () => {
            try {
                const response = await fetch('data/db.json');
                app.data = await response.json();
                app.render('home'); 
                app.renderFooter();
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }, 800);

        // Menu Logic
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                app.render(e.target.dataset.target);
            });
        });
    },

    renderSkeleton: () => {
        document.getElementById('app-content').innerHTML = `<div class="bento-grid" style="opacity:0.6"><div class="tile col-12" style="height:400px"><div class="skeleton" style="width:100%; height:100%"></div></div></div>`;
    },

    render: (view) => {
        const container = document.getElementById('app-content');
        const d = app.data;
        let html = '';

        // --- VIEW: HOME ---
        if (view === 'home') {
            html = `
                <div class="bento-grid">
                    <div class="tile col-8">
                        <span class="status-badge">🟢 ${d.profile.status}</span>
                        <h1 style="font-size: 2rem;">${d.profile.name}: ${d.profile.headline}</h1>
                        <h2 style="font-size: 1.1rem; color: var(--accent); margin-bottom: 20px;">${d.profile.subheadline}</h2>
                        <p style="font-size: 1rem; line-height: 1.6;">${d.profile.about}</p>
                        
                        <div style="margin-top:auto; padding-top:30px; display:flex; gap:10px">
                            <button class="btn-calc" style="width:auto" onclick="app.render('tools')">Acessar Simuladores</button>
                            <button class="btn-calc" style="width:auto; background:white; color:#333; border:1px solid #ddd" onclick="app.render('finance')">Ver Tese</button>
                        </div>
                    </div>

                    <div class="tile col-4" style="background:var(--text-primary); color:white;">
                        <h3 style="color:#94a3b8">Diferenciais</h3>
                        <ul style="list-style:none; margin-top:20px; line-height: 2;">
                            <li>✅ Venda Consultiva</li>
                            <li>✅ Matemática Financeira</li>
                            <li>✅ Automação com Python</li>
                            <li>✅ Foco em Metas</li>
                        </ul>
                        <div style="margin-top:auto; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1)">
                            <small style="color:#94a3b8">Status Atual</small><br>
                            <strong>Estudando C_PRO R</strong>
                        </div>
                    </div>

                    <div class="tile col-6">
                        <h3>Solução em Destaque</h3>
                        <h2>${d.tech[0].title}</h2>
                        <p>${d.tech[0].details}</p>
                    </div>

                    <div class="tile col-6">
                        <h3>Visão de Mercado</h3>
                        <p>"${d.finance.macro_view}"</p>
                    </div>
                </div>
            `;
        }

        // --- VIEW: TOOLS (AS 3 CALCULADORAS) ---
        if (view === 'tools') {
            html = `
                <div class="bento-grid">
                    <div class="tile col-12">
                        <h1>Ferramentas de Consultoria</h1>
                        <p>Simuladores desenvolvidos para auxiliar na tomada de decisão do cliente.</p>
                    </div>

                    <div class="tile col-6">
                        <span class="tech-pill">Consórcio vs. Financiamento</span>
                        <h2>O Decisor de Sonhos</h2>
                        <div class="calc-box">
                            <div class="calc-input-group"><label>Valor do Bem (R$)</label><input type="number" id="valorBem" class="calc-input" value="50000"></div>
                            <div class="calc-input-group"><label>Prazo (Meses)</label><input type="number" id="prazoMeses" class="calc-input" value="60"></div>
                            <button class="btn-calc" onclick="app.calcConsorcio()">Comparar Custo</button>
                            <div id="resConsorcio" class="calc-result"></div>
                        </div>
                    </div>

                    <div class="tile col-6">
                        <span class="tech-pill">Tributação</span>
                        <h2>CDB vs. LCI/LCA</h2>
                        <div class="calc-box">
                            <div class="calc-input-group"><label>Taxa do CDB (% do CDI)</label><input type="number" id="taxaCDB" class="calc-input" value="110"></div>
                            <div class="calc-input-group"><label>Prazo (Meses)</label><input type="number" id="prazoInvest" class="calc-input" value="12"></div>
                            <button class="btn-calc" onclick="app.calcTributacao()">Calcular Equivalência</button>
                            <div id="resTributacao" class="calc-result"></div>
                        </div>
                    </div>

                    <div class="tile col-12">
                        <span class="tech-pill">Longo Prazo</span>
                        <h2>Simulador Jovem Milionário</h2>
                        <div style="display:flex; gap:20px; flex-wrap:wrap;">
                            <div style="flex:1">
                                <div class="calc-input-group"><label>Aporte Mensal (R$)</label><input type="number" id="aporteJovem" class="calc-input" value="300"></div>
                                <div class="calc-input-group"><label>Tempo (Anos)</label><input type="number" id="tempoJovem" class="calc-input" value="30"></div>
                                <div class="calc-input-group"><label>Taxa Anual (%)</label><input type="number" id="taxaJovem" class="calc-input" value="10"></div>
                                <button class="btn-calc" onclick="app.calcMilionario()">Projetar Futuro</button>
                            </div>
                            <div style="flex:1"><div id="resMilionario" class="calc-result" style="display:none; height:100%; justify-content:center; flex-direction:column;"></div></div>
                        </div>
                    </div>
                </div>
            `;
        }

        // --- VIEW: TECH ---
        if (view === 'tech') {
            html = `
                <div class="bento-grid">
                    <div class="tile col-12">
                        <h1>Engenharia de Software</h1>
                        <p>Soluções focadas em resolver problemas de negócio.</p>
                    </div>
                    ${d.tech.map(t => `
                        <div class="tile col-4">
                            <span class="tech-pill" style="background:#EFF6FF; color:var(--accent)">${t.hook}</span>
                            <h3 style="margin-top:10px">${t.category}</h3>
                            <h2 style="font-size:1.2rem; margin-bottom:10px">${t.title}</h2>
                            <p style="font-size:0.9rem; flex-grow:1">${t.details}</p>
                            <div style="margin-top:15px">
                                ${t.stack.map(s => `<span class="tech-pill">${s}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // --- VIEW: FINANCE ---
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

        container.innerHTML = html;
        feather.replace();
    },

    // --- RODAPÉ AZUL ROYAL ---
    renderFooter: () => {
        const d = app.data;
        const footerHTML = `
            <div class="footer-container">
                <div style="flex:1">
                    <h2>${d.profile.name}</h2>
                    <span class="copyright">Desenvolvido com Lógica e Estratégia.</span>
                </div>
                <div style="flex:1">
                    <h3>Links Rápidos</h3>
                    <ul class="footer-links">
                        <li><a href="#" onclick="app.render('tools'); return false;">Simulador de Financiamento</a></li>
                        <li><a href="#" onclick="app.render('tools'); return false;">Análise de Renda Fixa</a></li>
                        <li><a href="#" onclick="app.render('finance'); return false;">Cronograma C_PRO</a></li>
                    </ul>
                </div>
                <div style="flex:1">
                    <h3>Contato</h3>
                    <ul class="footer-links">
                        <li><a href="https://${d.profile.social.linkedin}" target="_blank">LinkedIn</a></li>
                        <li><a href="mailto:${d.profile.social.email}">Email</a></li>
                    </ul>
                </div>
            </div>
        `;
        document.getElementById('app-footer').innerHTML = footerHTML;
    },

    // --- LÓGICA CALCULADORAS ---
    calcConsorcio: () => {
        const valor = parseFloat(document.getElementById('valorBem').value);
        const meses = parseInt(document.getElementById('prazoMeses').value);
        const totalFinanc = valor * (1.6/100) / (1 - Math.pow(1 + 1.6/100, -meses)) * meses;
        const totalConsorcio = valor * 1.16;
        const economia = totalFinanc - totalConsorcio;
        const res = document.getElementById('resConsorcio');
        res.style.display = 'block';
        res.innerHTML = `
            <div style="font-size:0.9rem;"><strong>Financiamento:</strong> ${totalFinanc.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</div>
            <div style="font-size:0.9rem;"><strong>Consórcio:</strong> ${totalConsorcio.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</div>
            <p style="margin-top:10px; font-weight:600; color:var(--accent);">"Se você pode esperar ser contemplado, o Consórcio economiza ${economia.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})} no seu bolso."</p>
        `;
    },

    calcTributacao: () => {
        const cdb = parseFloat(document.getElementById('taxaCDB').value);
        const dias = parseInt(document.getElementById('prazoInvest').value) * 30;
        let aliquota = 0.225;
        if (dias > 180) aliquota = 0.20;
        if (dias > 360) aliquota = 0.175;
        if (dias > 720) aliquota = 0.15;
        const lci = cdb * (1 - aliquota);
        const res = document.getElementById('resTributacao');
        res.style.display = 'block';
        res.innerHTML = `
            <div><strong>Alíquota IR:</strong> ${(aliquota*100).toFixed(1)}%</div>
            <p style="margin-top:10px; font-weight:600; color:var(--accent);">"Um CDB de ${cdb}% equivale a uma LCI de ${lci.toFixed(2)}%. Se o banco oferecer menos, fique no CDB."</p>
        `;
    },

    calcMilionario: () => {
        const aporte = parseFloat(document.getElementById('aporteJovem').value);
        const anos = parseInt(document.getElementById('tempoJovem').value);
        const taxa = parseFloat(document.getElementById('taxaJovem').value) / 100;
        const meses = anos * 12;
        const tm = Math.pow(1 + taxa, 1/12) - 1;
        const vf = aporte * ( (Math.pow(1 + tm, meses) - 1) / tm );
        const res = document.getElementById('resMilionario');
        res.style.display = 'flex';
        res.innerHTML = `
            <div style="font-size:1rem;">Acumulado:</div>
            <strong style="font-size:2rem; color:var(--accent);">${vf.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>
            <p style="margin-top:10px; font-weight:600;">"O segredo não é o aporte, é a constância."</p>
        `;
    }
};

document.addEventListener('DOMContentLoaded', app.init);