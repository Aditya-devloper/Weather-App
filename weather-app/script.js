
const cityName = document.querySelector('#city-name');
const searchBtn = document.querySelector('.search');
const tempContainer = document.querySelector('.temp-container');

searchBtn.addEventListener('click', () => {
    // console.log(cityName.value); 
    if (cityName.value == '') return;

    data();

    cityName.value = '';

})


async function data() {
    const api = `http://api.weatherapi.com/v1/current.json?key=40ef1b428eff42fab9a53905242009&q=${cityName.value}&aqi=no`;

    let tempHtml = '';
    tempContainer.innerHTML = `<h2 class="center">Loading...</h2>`

    try {

    let weather = await fetch(api);
    weatherData = await weather.json();

    console.log(weatherData);

    tempHtml += `
    <div class="data">

            <h1 class="titte">${weatherData.location.name}</h1>
            <hr>
            <div class="info">
                <div class="location"><i class="bi bi-geo-alt-fill"></i> <span>${weatherData.location.name}, ${weatherData.location.country}</span></div>

                <div class="time"><i class="bi bi-calendar"></i>   <span>${weatherData.location.localtime}</span></div>
            </div>

            <div class="temp-data">
                <h4 class="temp">${weatherData.current.
            temp_c} <sup>o</sup>C & ${weatherData.current.
                temp_f} <sup>o</sup>F</h4>
                <div class="icon"> <img src="${weatherData.current.condition.icon}" alt="img"></div>
            </div>

            <div class="text-content">
                <h3 class="text">${weatherData.current.condition.text}</h3>
                <p class="humidity">Humidity: ${weatherData.current.humidity}%</p>
                <p class="wind-speed">Wind: ${weatherData.current.wind_kph} km/h</p>
            </div>
    </div>`

    tempContainer.innerHTML = tempHtml;
    } catch (error) {
        tempContainer.innerHTML = `<h2  class="center">Location not found</h2>`;
    }

}