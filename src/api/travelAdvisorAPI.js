/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      
      headers: {
        'x-rapidapi-key': '131467726dmsh78e4fc099f95345p1c61b9jsn37d7e09bdeb9',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': '131467726dmsh78e4fc099f95345p1c61b9jsn37d7e09bdeb9',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',  
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
