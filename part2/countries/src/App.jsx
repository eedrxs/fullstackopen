import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Countries from "./components/Countries"
import Country from "./components/Country"

import countryService from "./services/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesList, setCountriesList] = useState()
  const [countryToView, setCountryToView] = useState()
  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    countryService.getAll().then((countries) => setCountries(countries))
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      new RegExp(filterText, "i").test(country.name.common)
    )
    
    if (filteredCountries.length !== 1) {
      setCountriesList(filteredCountries)
      setCountryToView(null)
    } else {
      setCountriesList(null)
      setCountryToView(filteredCountries[0])
    }
  }, [filterText])

  return (
    <div>
      <Filter value={filterText} onChange={setFilterText} />

      {filterText && (
        <>
          {countriesList?.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}

          {countriesList?.length <= 10 && (
            <Countries
              countries={countriesList}
              onShowCountry={setCountryToView}
            />
          )}

          {countryToView && <Country country={countryToView} />}
        </>
      )}
    </div>
  )
}

export default App
