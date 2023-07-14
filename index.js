const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails= document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',()=>{
    const APIKey = '7219357c2a7338b6202e2b5f50fb6aa4';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response=>response.json()).then(json=>{
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'clear':
                image.src = 'images/clear.jpg'; 
                break;

            case 'Rain':
                image.src = 'images/rain.jpg'; 
                break; 

            case 'Snow':
                image.src = 'images/snow.jpeg'; 
                break;
            
            case 'Clouds':
                image.src = 'images/clouds.jpg'; 
                break;
                
            case 'Haze':
                image.src = 'images/haze.jpeg'; 
                break;

            default:
                image.src = '';    
        }

        temperature.innerHTML = `${parseint(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = ``;
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';



    });   

});