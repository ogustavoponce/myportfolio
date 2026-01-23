document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-container');

    // Função para renderizar os artigos
    function renderArticles() {
        // Pega os primeiros 8 artigos para exibir
        const displayArticles = articlesData.slice(0, 8);

        let html = '';
        displayArticles.forEach(article => {
            // Se tiver conteúdo completo, mostra um resumo. Se não, mostra texto genérico.
            const snippet = article.content ? "Clique para ler a análise completa sobre este tópico financeiro..." : "Análise detalhada sobre produtos bancários e regulação de mercado.";
            
            html += `
                <article class="article-card">
                    <div class="article-meta">
                        <span>${article.category}</span> • ${article.date}
                    </div>
                    <h3>${article.title}</h3>
                    <p>${snippet}</p>
                    <a href="#" class="link-arrow">Ler Artigo Completo &rarr;</a>
                </article>
            `;
        });
        blogContainer.innerHTML = html;
    }

    renderArticles();
});