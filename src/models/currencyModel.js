const BASE_URL = 'https://api.frankfurter.dev/v2';

export async function fetchCurrencies() {
  try {
    const res = await fetch(`${BASE_URL}/currencies`);
    if (!res.ok) {
      throw new Error('Erro ao carregar a lista de moedas.');
    }
    const data = await res.json();
    
    const currenciesArray = Array.isArray(data) 
      ? data 
      : Object.keys(data).map(key => ({
          iso_code: key,
          name: data[key].name || data[key],
          symbol: data[key].symbol || ''
        }));

    const formattedCurrencies = currenciesArray.map((item) => {
      return { 
        iso_code: item.iso_code || item.code, 
        symbol: item.symbol || '', 
        name: item.name || '' 
      };
    });

    return formattedCurrencies;
  } catch (error) {
    console.error('Erro no Model (fetchCurrencies):', error);
  }
}

export async function fetchExchangeRate(fromCurrency, toCurrency) {
  try {
    const from = String(fromCurrency).toLowerCase();
    const to = String(toCurrency).toLowerCase();

    const res = await fetch(`${BASE_URL}/rate/${from}/${to}`);
    
    if (!res.ok) {
      throw new Error(`Erro ao consultar a taxa de câmbio (Status: ${res.status})`);
    }
    
    const data = await res.json();
    
    const rate = data.rate !== undefined ? data.rate : (data.rates ? data.rates[toCurrency] : null);

    if (rate === undefined || rate === null) {
      throw new Error('Taxa de câmbio não encontrada para esta conversão.');
    }

    return {
      rate: rate,
      date: data.date || new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Erro no Model (fetchExchangeRate):', error);
    throw error;
  }
}