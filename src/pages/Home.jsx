import React, { useEffect, useState } from 'react';
import Graphic from '../components/Graphic';
import { getDataCountryforData, getCountries } from '../api/coronavirusApi';
import { Form, Button } from 'react-bootstrap';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('brazil');
  const [allCountries, setAllCountries] = useState([]);
  const [initialDate, setInitialDate] = useState('2021-03-01');
  const [finishDate, setFinishDate] = useState('2021-03-31');

  const getData = async () => {
    setIsLoading(true);
    const dataFromApi = await getDataCountryforData(country, initialDate, finishDate);
    const formatData = dataFromApi.map(({ Cases, Date: date }) => {
        const name = date.substring(8, 10);
        return ({ pv: Cases, name })
    })
    setData(formatData);
    const sortedCountries = await getCountries();
    setAllCountries(sortedCountries.sort((a, b) => {
      return a.Country < b.Country ? -1 : a.Country > b.Country ? 1 : 0;
    }));
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const searchData = await getDataCountryforData(country, initialDate, finishDate);
    const formatData = searchData.map(({ Cases, Date: date }) => {
      const name = date.substring(8, 10);
      return ({ pv: Cases, name })
  })
    setData(formatData);
    setIsLoading(false);
  }

  return (
    <div>
      <h1>Mapa da COVID-19 pelo mundo</h1>
      <div className="container-filters">
        <Form.Group className="form-countries">
          <Form.Control as="select" onChange={ ({ target }) => setCountry(target.value) }>
            <option>Escolha um país</option>
            {allCountries && allCountries.map(({ Country, Slug }) => (
              <option
                key={Slug}
                value={Slug}
              >
                {Country}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <label htmlFor="initial">
          Data inicial
          <input id="initial" type="date" onChange={ ({target}) => setInitialDate(target.value) } />
        </label>
        <label htmlFor="finish">
          Data Final
          <input id="finish" type="date" onChange={ ({target}) => setFinishDate(target.value) } />
        </label>
        <Button onClick={ () => fetchData() }>Buscar</Button>
      </div>
      {isLoading ? <p>Carregando...</p>
        : 
        <Graphic data={ data } />
      }
    </div>
  )
};  

export default Home;
