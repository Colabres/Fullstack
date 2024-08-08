import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const [country, setCountry] = useState(null)
  const [countrys, setCountrys] = useState(null)
  
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('Fetched countries:', response.data)
        setData(response.data)}) 
      .catch(error => console.error('Error fetching countries:', error));
  }, [])

  useEffect(() => {
    setCountrys(data.filter(country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    ))
  },[country])

  // useEffect(() => {    
  //   if (country) {
  //     console.log('fetching exchange rates...')
  //     axios
  //     .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)      
            
  //     .then(response => {
  //       console.log(response.data) // Adjust based on the actual API response structure
  //       setData(response.data)
  //       setError(null)
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error)
  //       setData({})
  //       setError('Country not found or other error')
  //     })
  // } else {
  //   setData({})
  //   setError('Please enter a country name')
  // }
  // }, [country])



  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <pre>
        {JSON.stringify(countrys, null, 2)}
      </pre>
    </div>
  )
}

export default App
