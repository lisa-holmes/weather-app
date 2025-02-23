import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [weather, setWeather] = useState(null); // Состояние для хранения погоды
  const [error, setError] = useState(null);     // Состояние для ошибок

  // Функция для получения погоды
  const getWeather = async () => {
    try {
      // Делаем запрос к API и ждём ответа
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=London&appid=baa477efc19ae61265429bc7dec0999e&units=metric'
      );

      // Если ответ не ок, бросаем ошибку
      if (!response.ok) {
        throw new Error('Не удалось получить данные');
      }

      // Превращаем ответ в JSON и ждём
      const data = await response.json();

      setWeather(data.main.temp);
      setError(null); // Очищаем ошибку, если всё ок
    } catch (err) {
      // Если что-то пошло не так, показываем ошибку
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>Погода</h1>
      <button onClick={getWeather}>Узнать погоду</button>
      {error ? (
        <p>{error}</p> // Показываем ошибку, если она есть
      ) : weather ? (
        <p className="visible">Температура: {weather}°C</p> // Показываем погоду
      ) : (
        <p>Нажми кнопку!</p> // Начальное сообщение
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);