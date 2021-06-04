const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const getCountries = () =>
  fetch("https://api.covid19api.com/countries", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));

const getDataCountryforData = (country, initialDate, finishDate) => {
  const dataFormated = `${initialDate}T00:00:00Z&to=${finishDate}T00:00:00Z`;
  const dataForApi = fetch(`https://api.covid19api.com/total/country/${country}/status/confirmed?from=${dataFormated}`, requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));

  return dataForApi;
}

export { getCountries, getDataCountryforData };
