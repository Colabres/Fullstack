import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const apikey = import.meta.env.VITE_SOME_KEY
    
  const [value, setValue] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState(null);

  const [input, setInput] = useState(null)
  const [countrys, setCountrys] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  
  //const apikey ="f3643d60ba351d33a677bba5ea4b3807"

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setInput(value)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('Fetched countries:', response.data)
        console.log(apikey)
        setData(response.data)})       
  }, [])

  useEffect(() => {
    if(selectedCountry){
        
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${selectedCountry.capital}&limit=5&appid=${apikey}`)
        .then(response => {
          console.log('Fetched lat:', response.data[0].lat)          
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${apikey}`)
          .then(response => {
            setWeather(response.data)
          })
          })   
    }    
  }, [selectedCountry])

  useEffect(() => {
    if(input){
        const result = data.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
        if (result.length === 1) {
            setCountrys([])
            setSelectedCountry(result[0])
            setError(null)
          } else if (result.length <= 10) {
            setCountrys(result)
            setSelectedCountry(null)
            setError(null)
          } else {
            setCountrys([])
            setSelectedCountry(null)
            setError('Too many results, please refine your search.')
            }
        }
    }, [input])

    const getLanguages = (languages) => {
        return languages ? Object.values(languages) : [];
      }

    const handleCountryClick = (country) => {
        setCountrys([])
        setSelectedCountry(country)
    }


  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}

      
      {selectedCountry&&weather && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>capital: {selectedCountry.capital}</p>
          <p>area: {selectedCountry.area}</p>
          <h3>Languages</h3>
          <ul>
            {getLanguages(selectedCountry.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          
          <img src={selectedCountry.flags.png} alt={`${selectedCountry.name.common} flag`} width="200" />
          <h3>Weather in {selectedCountry.capital}</h3>
          <p>tempurature : {weather.main.temp} Celsius </p>
          <p>feels like : {weather.main.feels_like} </p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>wind: {weather.wind.speed} m/s</p>

          <button onClick={() => setSelectedCountry(null)}>Back to list</button>
        </div>
      )}

      
      {countrys.length > 0 && !selectedCountry && !error && (
        <ul>
          {countrys.map(country => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleCountryClick(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}     
    
    </div>
  )
}


export default App
