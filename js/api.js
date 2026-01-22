const API = {
    // Simula uma busca no banco de dados interno
    getLocalData: async () => {
        const response = await fetch('data/data.json');
        return await response.json();
    },
    
    // Busca dados reais de mercado
    getMarketData: async () => {
        try {
            const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
            return await res.json();
        } catch (e) {
            console.error("API Offline", e);
            return null;
        }
    }
};