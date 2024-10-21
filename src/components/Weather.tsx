/* tslint:disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { IWeather } from '../utils/types';

interface Props {
  lat: number;
  long: number;
  variables: string[];
}

const Weather: React.FC<Props> = ({ lat, long, variables }) => {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(
            ','
          )}&timezone=Europe/Moscow&past_days=0`,
          { method: 'GET' }
        );
        if (!response.ok) {
          throw new Error('Ошибка при получении данных о погоде');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
        );
      }
    };

    fetchWeather();
  }, [lat, long, variables]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!weather) {
    return <div>Загрузка...</div>;
  }

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Дата</th>
          {variables.map((variable) => (
            <th key={variable}>{variable}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weather.daily?.time.map((time, index) => (
          <tr key={time}>
            <td>{time}</td>
            {variables.map((variable) => (
              <td key={`${time}-${variable}`}>
                {weather.daily[variable]?.[index] ?? '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Weather;
