import { API_CONFIG } from "./config"
import type { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";

class WeatherAPI{
    private createUrl(endPoint:string, params:Record<string, string | number>){
        const searchParams = new URLSearchParams({
        ...API_CONFIG.DEFAULT_PARAMS, 
            ...params,
            })
            return `${endPoint}?${searchParams.toString()}`;
    };

  private async fetchData<T>(url:string): Promise<T>{
    const response  = await fetch(url);
    if(!response.ok){
        throw new Error(`API request failed with status ${response.statusText}`);
    }
    return response.json();
  }
  
   async getCurrentWeather({lat, lon}: Coordinates): Promise<WeatherData>{
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
        lat: lat.toString(),
        lon: lon.toString(),
     });
    return this.fetchData<WeatherData>(url);
   }
  
   async getForecast({lat, lon}: Coordinates): Promise<ForecastData>{
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
      lat: lat.toString(),
      lon: lon.toString(),
    });
    return this.fetchData<ForecastData>(url);
    }
// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
    async reverseGeocode({lat,lon}: Coordinates): Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 10,
        });
        return this.fetchData<GeocodingResponse[]>(url);
    }

    async searchLocations(query:string):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q: query,
            limit: "5",
        });
        return this.fetchData<GeocodingResponse[]>(url);
    }
}
   
export const weatherAPI = new WeatherAPI();