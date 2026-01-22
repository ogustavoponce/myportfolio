// Busca cotações reais de uma API pública
async function getMarketData() {
    const tickerDiv = document.getElementById('market-ticker');
    try {
        // API AwesomeAPI (Gratuita e Real-time)
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
        const data = await response.json();
        
        const usd = parseFloat(data.USDBRL.bid).toFixed(2);
        const eur = parseFloat(data.EURBRL.bid).toFixed(2);
        const btc = parseFloat(data.BTCBRL.bid).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

        tickerDiv.innerHTML = `
            <div class="ticker-item">🇺🇸 USD: R$ ${usd} <span class="${getTrend(data.USDBRL.pctChange)}">(${data.USDBRL.pctChange}%)</span></div>
            <div class="ticker-item">🇪🇺 EUR: R$ ${eur} <span class="${getTrend(data.EURBRL.pctChange)}">(${data.EURBRL.pctChange}%)</span></div>
            <div class="ticker-item">₿ BTC: ${btc}</div>
            <div class="ticker-item">🇧🇷 SELIC: 11.25% (Meta)</div>
        `;
    } catch (error) {
        tickerDiv.innerHTML = "Mercado Offline";
        console.error("Erro na API:", error);
    }
}

function getTrend(value) {
    return parseFloat(value) >= 0 ? 'positive' : 'negative';
}

// Inicia assim que carregar
document.addEventListener('DOMContentLoaded', getMarketData);