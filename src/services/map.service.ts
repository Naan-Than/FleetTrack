import instance from '.';
import { AppConfig } from '../constants/AppConfig';

export const searchLocationAPI = (query: string) => {
  return instance.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${AppConfig.gmaps_API_KEY}&input=${query}`);
};

export const searchPlaceIdAPI = (placeId: string) => {
  return instance.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${AppConfig.gmaps_API_KEY}&placeid=${placeId}`);
};

export const placeDirectionsAPI = (pickup:any, drop:any) => {
  return instance.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.long}&destination=${drop.lat},${drop.long}&key=${AppConfig.gmaps_API_KEY}`);
};






