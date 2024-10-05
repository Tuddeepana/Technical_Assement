import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../services/currencyService';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState('AUD');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const convert = async () => {
    try {
      setError(null); // Reset error state
      //Test
      console.log('Amount:', amount);
      console.log('Date:', date);
      console.log('Source Currency:', sourceCurrency);
      console.log('Target Currency:', targetCurrency);

      const rates = await getExchangeRates(date);
      console.log('API response:', rates);

      const rate = rates[targetCurrency] / rates[sourceCurrency];
      const result = amount * rate;
      console.log(`Conversion: ${amount} ${sourceCurrency} = ${result} ${targetCurrency}`);

      setConvertedAmount(result);
    } catch (error) {
      setError('Please check input data *Date*.');
      setConvertedAmount(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center font-extrabold text-4xl text-green-700 mb-6">Currency Converter</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Source Currency</label>
          <select
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AUD">AUD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-green-700">Target Currency</label>
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AUD">AUD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={convert}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Convert
        </button>
        {error && (
          <p className="text-center text-lg font-semibold mt-4 text-red-600">
            {error}
          </p>
        )}
        {convertedAmount && (
          <p className="text-center text-lg font-semibold mt-4 text-red-600">
            Convert Amount : {convertedAmount} {targetCurrency}
          </p>
        )}
      </div>
    </div>
  );
}