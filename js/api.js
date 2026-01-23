const API = {
    // Busca o JSON local (seu CMS)
    getDB: async () => {
        const req = await fetch('data/db.json');
        return await req.json();
    },

    // Busca dados reais de mercado
    getMarket: async () => {
        try {
            const req = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
            return await req.json();
        } catch (e) {
            console.error("API Error", e);
            return null;
        }
    }
};