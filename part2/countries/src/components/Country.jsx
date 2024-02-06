import { useEffect, useState } from "react"
import Weather from "./Weather"

import weatherService from "../services/weather"

const Country = ({ country }) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    weatherService.fetch(...country.latlng).then(({ data }) => {
      setWeather(data.list[0])
    })
  }, [country])

  return (
    <div>
      <h1 style={{ marginTop: 15 }}>{country.name.common}</h1>

      <div style={{ marginTop: 15 }}>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>

      <div style={{ marginTop: 15 }}>
        <p style={{ fontWeight: "bold" }}>languages:</p>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>

      {weather && <Weather weather={weather} countryName={country.name.common} />}
    </div>
  )
}

export default Country
