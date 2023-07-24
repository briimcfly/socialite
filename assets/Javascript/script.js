let weather=document.getElementById("weather");
let inputCity=document.getElementById("input-city");
let buttonCity=document.getElementById("button-city");


function currentWeather() {
    inputLocation =inputCity.value.trim()
    //request URL incorporating the user inputted city
    var requestUrl ="https://api.openweathermap.org/data/2.5/weather?q="+inputLocation+"&APPID=88a5790f881a820d719667c737ffc4f3&units=imperial";

//fetch request that returns data
    fetch(requestUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
//creating elements that will be part of the display
            var headerIconEl =document.createElement("img");
            var temperature = document.createElement("p");
//creating content for the newly created elements
            imgSrc=data.weather[0].icon
            iconUrl= "https://openweathermap.org/img/w/"+imgSrc+ ".png";
            headerIconEl.src=iconUrl
            temperature.textContent="Temp: " + data.main.temp + "° F";
//appending the new elements to the DOM  
           weather.appendChild(headerIconEl);
           weather.appendChild(temperature);
           
        })
}

buttonCity.addEventListener("click" , function(){
    weather.textContent="";
        
//calls the current weather and five day functions when the button is clicked
    currentWeather();
 })

 inputCity.addEventListener("keypress" , function(event){
    if (event.key === "Enter") {
    event.preventDefault()
    weather.textContent="";
//calls the current weather and five day functions when the button is clicked
    currentWeather();
    }
 })