const wform=document.querySelector(".wform");
const cityIn=document.querySelector(".cityIn");
const card=document.querySelector(".card");
const errorD=document.querySelector(".errorD");
const apiKey="8e765731abf9d80c8dae1c133f55f903";
wform.addEventListener("submit", async event =>{
      event.preventDefault(); /* to prevent any default behaviour*/
      const city =cityIn.value;
      if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
      }
      else{
        displayError("Please enter a city");
      }
    });


async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
     const response = await fetch(apiUrl);
     console.log(response);
     if(!response){
        throw new Error("Could not fetch weather data");
     }
     return await response.json();
}
function displayWeatherInfo(data){
    const{
        name: city, main:{temp, humidity},
         weather: [{description, id}] }= data;
         card.textContent="";
         card.style.display="flex";
         const cityDisplay=document.createElement("h1");
         const tempD=document.createElement("p");
         const descD=document.createElement("p");
         const humidityD=document.createElement("p");
         const weatherE=document.createElement("p");
         
         cityDisplay.textContent=city;
         cityDisplay.classList.add("cityDislay");
         card.appendChild(cityDisplay);
         tempD.textContent=`${(temp-273.15).toFixed(1)}°C`;
         tempD.classList.add("tempD");
         card.appendChild(tempD);
         humidityD.textContent=`Humidity: ${humidity}%`;
         humidityD.classList.add("humidityD");
         card.appendChild(humidityD);
         descD.textContent=description;
         descD.classList.add("descD");
         card.appendChild(descD);
         weatherE.textContent=getWeatherEmoji(id);
         weatherE.classList.add("weatherE");
         card.appendChild(weatherE);
    }


function getWeatherEmoji(weatherId){
   switch(true){
    case(weatherId >=200 && weatherId <300):
    return "⛈️";
    case(weatherId >=300&& weatherId <400):
    return "🌧️";
    case(weatherId >=500 && weatherId <600):
    return "🌧️";
    case(weatherId >=600 && weatherId <700):
    return "☃️";
    case(weatherId >=700 && weatherId <800):
    return "🌫️";
    case(weatherId ===800 ):
    return "☀️";
    case(weatherId >=801 && weatherId <810):
    return "🌫️";
    default:
        return "?";
   }

}
function displayError(message){
    const errorD=document.createElement("p");
    errorD.textContent=message;
    errorD.classList.add("errorD");
    card.textContent="";
    card.style.display=`flex`;
    card.appendChild(errorD);

}