import React, { useState } from 'react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState('AUD');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [date, setDate] = useState('2022-05-12');

  const exchangeRates = {
    '2022-05-12': {
      'AUD': 1,
      'USD': 0.74,
      'EUR': 0.67
    },
    '2022-04-15': {
      'AUD': 1,
      'USD': 0.75,
      'EUR': 0.68
    }
  };

  const convert = () => {
    const rates = exchangeRates[date];
    if (rates) {
      const rate = rates[targetCurrency] / rates[sourceCurrency];
      setConvertedAmount(amount * rate);
    } else {
      setConvertedAmount('Exchange rate not available for the selected date.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center font-extrabold text-4xl text-green-700 mb-6">Currency Converter</h1>
      <div className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={convert}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Convert
        </button>
        {convertedAmount && (
          <p className="text-center text-lg font-semibold mt-4 text-red-600">
            Converted Amount: {convertedAmount} {targetCurrency}
          </p>
        )}
      </div>
    </div>
  );
}