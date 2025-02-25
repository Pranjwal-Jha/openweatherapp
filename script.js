document.addEventListener("DOMContentLoaded",()=>{
    const cityInput= document.querySelector('#city-input');
    const weatherbutton = document.querySelector('#get-weather');
    const additionDiv = document.querySelector('#info');
    const insertCity = document.querySelector('#city-name');
    const insrertTemperature = document.querySelector('#temperature');
    const insrertDescription = document.querySelector('#description');
    API_KEY = 'c6b9799c6357e448331959bc08178cfc';
    weatherbutton.addEventListener('click',async ()=>{
        const city = cityInput.value.trim();
        if(!city) return;
        console.log(`You've entered the city : ${city}`);
        
        //api takes time 
        try {
            const weatherData = await getWeatherInput(city);
            if(!weatherData.ok){
                throw new Error(`Error`);
            }
            const jsonData = await weatherData.json();
            // const data = await
            printWeatherInput(jsonData);     
        } catch (error) {
            showError(error.message);
        }
    })
    

    async function getWeatherInput(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`City now found !`);
        }
        return response;

    }

    function printWeatherInput(data){
        // const json = data.json();
        // console.log(data);
        const {name,main,weather}=data;
        console.log(`The temperature is ${main.temp}*C`);
        insertCity.innerHTML = `The City you've select is, ${name}, `;
        insrertTemperature.innerHTML = `Having Temperature `+main.temp+`*C`;
        insrertDescription.innerHTML = `Weather Description : `+weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    }

    function showError(){

    }
})