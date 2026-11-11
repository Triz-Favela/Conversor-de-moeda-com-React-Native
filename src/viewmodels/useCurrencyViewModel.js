import { useEffect, useState } from 'react';
import { fetchCurrencies, fetchExchangeRate } from '../models/currencyModel';

export function useCurrencyViewModel() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  
  // Novos estados para congelar o valor exibido no card após a conversão
  const [convertedResult, setConvertedResult] = useState(null);
  const [displayAmount, setDisplayAmount] = useState(''); // Armazena o valor que gerou o resultado atual
  
  const [exchangeRate, setExchangeRate] = useState(null);
  const [referenceDate, setReferenceDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCurrencies() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCurrencies();
        if (data && data.length > 0) {
          setCurrencies(data);
        }
      } catch (err) {
        setError('Não foi possível carregar a lista de moedas.');
      } finally {
        setLoading(false);
      }
    }
    loadCurrencies();
  }, []);

  const handleConvert = async () => {
    setError('');

    if (!amount.trim()) {
      setError('Por favor, informe um valor para converter.');
      return;
    }

    const sanitizedAmount = amount.replace(',', '.');
    const numericAmount = parseFloat(sanitizedAmount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Informe um valor numérico maior que zero.');
      return;
    }

    if (!fromCurrency || !toCurrency) {
      setError('Selecione a moeda de origem e a de destino.');
      return;
    }

    if (fromCurrency === toCurrency) {
      setError('A moeda de origem e a de destino devem ser diferentes.');
      return;
    }

    try {
      setLoading(true);
      const data = await fetchExchangeRate(fromCurrency, toCurrency);
      const rate = data.rate;

      if (rate === undefined || rate === null) {
        throw new Error('Taxa de câmbio não encontrada.');
      }

      const result = numericAmount * rate;

      setExchangeRate(rate);
      setReferenceDate(data.date || new Date().toISOString().split('T')[0]);
      setConvertedResult(result.toFixed(2));
      setDisplayAmount(amount); // Congela o valor informado no momento da conversão bem-sucedida
    } catch (err) {
      setError('Erro ao realizar a conversão. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return {
    currencies,
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedResult,
    displayAmount, // Retorna o valor estático para a View
    exchangeRate,
    referenceDate,
    loading,
    error,
    handleConvert,
  };
}