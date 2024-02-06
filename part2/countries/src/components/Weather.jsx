const Weather = ({ weather, countryName }) => {
  return (
    <div style={{ marginTop: 15 }}>
      <h2>Weather in {countryName}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${weather.weather[0].description}`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
