import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5/forecast"
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const fetch = (lat, lon) => {
  const endpoint = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=1`
  return axios.get(endpoint)
}

export default { fetch }
