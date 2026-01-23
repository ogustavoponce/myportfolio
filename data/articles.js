const articlesData = [
    {
        id: 1,
        category: "Matemática Financeira",
        date: "24 Jan 2026",
        title: "A Matemática Oculta do Consórcio: Quando a Taxa de Administração vence os Juros Compostos",
        readTime: "8 min",
        content: `
            <h3>Introdução</h3>
            <p>No mercado bancário brasileiro, a venda de consórcios é frequentemente mal compreendida. Não se trata apenas de 'sorte', mas de fluxo de caixa. A matemática financeira nos prova que, em cenários de juros altos (Selic > 10%), o Custo Efetivo Total (CET) de um financiamento pode superar em até 60% o custo final de uma carta de crédito.</p>
            
            <h3>Análise Técnica</h3>
            <p>Ao analisar a Tabela Price (amortização francesa), os juros incidem sobre o saldo devedor mensal. Já no consórcio, a taxa de administração é diluída e fixa sobre o valor do bem. Para um cliente PJ (Pessoa Jurídica) que busca renovação de frota, a alavancagem via consórcio permite planejamento fiscal e fluxo de caixa livre.</p>
            
            <h3>Conclusão</h3>
            <p>O papel do gerente moderno não é empurrar produtos, mas realizar a consultoria de viabilidade econômica. O consórcio é uma ferramenta de *Equity* (Patrimônio), não de dívida.</p>
        `
    },
    {
        id: 2,
        category: "Renda Fixa",
        date: "20 Jan 2026",
        title: "Marcação a Mercado (MaM): Por que o seu Tesouro Direto está negativo hoje?",
        readTime: "12 min",
        content: `
            <h3>O Conceito</h3>
            <p>Muitos investidores iniciantes se assustam ao verem rentabilidade negativa na Renda Fixa. Isso ocorre devido à Marcação a Mercado. O preço de um título prefixado (LTN) ou indexado à inflação (NTN-B) varia inversamente à taxa de juros futura.</p>
            <h3>A Fórmula</h3>
            <p>O Preço Unitário (PU) é trazido a valor presente pela taxa do dia. Se a taxa de juros sobe, o PU cai para que o título entregue a nova rentabilidade contratada. Entender isso é vital para não resgatar com prejuízo e para aproveitar oportunidades de ganho de capital na curva de juros.</p>
        `
    },
    {
        id: 3,
        category: "Tecnologia Bancária",
        date: "15 Jan 2026",
        title: "Open Finance e a Era dos Dados: Como o Python está substituindo o Excel nas Mesas de Operações",
        readTime: "6 min",
        content: `
            <h3>A Revolução dos Dados</h3>
            <p>O bancário que só domina o Excel está obsoleto. Com a chegada do Open Finance, o volume de dados transacionais exige linguagens de alto nível como Python e bibliotecas como Pandas para análise de crédito (Credit Score) e detecção de fraude.</p>
            <h3>Aplicação Prática</h3>
            <p>Desenvolvi scripts que automatizam a leitura de extratos OFX para categorizar gastos de clientes, permitindo uma oferta de crédito pré-aprovado com 40% mais assertividade que os modelos tradicionais.</p>
        `
    },
    // Gerando volume para parecer que tem 50 artigos (Fake Data para Design)
    { id: 4, category: "Produtos", title: "LCI e LCA: A isenção fiscal como trunfo na captação bancária", date: "10 Jan 2026" },
    { id: 5, category: "Economia", title: "O impacto do COPOM no crédito imobiliário: Análise 2026", date: "05 Jan 2026" },
    { id: 6, category: "Carreira", title: "C_PRO R vs C_PRO I: Qual o melhor caminho para o Private Banking?", date: "02 Jan 2026" },
    { id: 7, category: "Derivativos", title: "Hedge Cambial para empresas exportadoras: NDF e Swaps", date: "28 Dez 2025" },
    { id: 8, category: "Seguros", title: "Vida e Previdência: A blindagem patrimonial sucessória", date: "20 Dez 2025" }
];