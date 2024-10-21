export type IVariable =
  | 'weathercode'
  | 'temperature_2m_max'
  | 'temperature_2m_min'
  | 'apparent_temperature_max'
  | 'apparent_temperature_min'
  | 'sunrise'
  | 'sunset'
  | 'precipitation_sum'
  | 'rain_sum'
  | 'showers_sum'
  | 'snowfall_sum'
  | 'precipitation_hours'
  | 'windspeed_10m_max'
  | 'windgusts_10m_max'
  | 'winddirection_10m_dominant'
  | 'shortwave_radiation_sum'
  | 'et0_fao_evapotranspiration';

export interface IWeather {
  daily: {
    time: string[];
  } & {
    [key in Exclude<IVariable, 'time'>]?: number[];
  } & {
    [key: string]: string[] | number[];
  };
  daily_units: {
    time: string;
  } & {
    [key in Exclude<IVariable, 'time'>]?: string;
  };
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
