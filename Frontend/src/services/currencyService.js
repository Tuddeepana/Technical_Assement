import axios from 'axios';

const API_URL = 'https://openexchangerates.org/api/historical';
const APP_ID = '712762a538a840d28437072104ceefb4';

export const getExchangeRates = async (date) => {
  try {
    console.log('Fetching exchange rates for date:', date); // Log the date being passed
    const response = await axios.get(`${API_URL}/${date}.json`, {
      params: {
        app_id: APP_ID,
      },
    });
    console.log('API response:', response.data); // Log the entire response
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};