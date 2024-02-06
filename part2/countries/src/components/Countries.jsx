const Countries = ({ countries, onShowCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.tld}>
          {country.name.common}{" "}
          <button onClick={() => onShowCountry(country)}>show</button>
        </p>
      ))}
    </div>
  )
}

export default Countries
