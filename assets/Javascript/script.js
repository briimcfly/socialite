let weather=document.getElementById("weather");
let inputCity=document.getElementById("input-city");
let buttonCity=document.getElementById("button-city");
let ticketmasterEventData=document.getElementById("ticketmaster-event-data")

let todayDate= dayjs().format("YYYY-MM-DD")
console.log(todayDate)
inputLocation =inputCity.value.trim()

//document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  //});




function currentWeather() {
    inputLocation =inputCity.value.trim() 
    //request URL incorporating the user inputted city
    let requestUrl ="https://api.openweathermap.org/data/2.5/weather?q="+inputLocation+"&APPID=88a5790f881a820d719667c737ffc4f3&units=imperial";

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
    ticketMasterEvents();
 })

 inputCity.addEventListener("keypress" , function(event){
    if (event.key === "Enter") {
    event.preventDefault()
    weather.textContent="";
//calls the current weather and five day functions when the button is clicked
    currentWeather();
    ticketMasterEvents();
    }
 })

 function ticketMasterEvents () {

   let eventRequestUrl= "https://app.ticketmaster.com/discovery/v2/events.json?dates="+todayDate+"&city="+inputLocation+"&apikey=yTpugCkiZy8jJLwQIFI29hvie9b9teAA"
   
   fetch(eventRequestUrl)
        .then(function (response){
             return response.json();
        })
   .then(function (data) {
       console.log(data);

    //    var headerIconEl =document.createElement("img");
    //    var temperature = document.createElement("p");

       
    //    temperature.textContent="Temp: " + data.main.temp + "° F";
 
    //   ticketmasterEventData.appendChild(headerIconEl);
    //   ticketmasterEventData.appendChild(temperature);
 })
}


// openBrewery api

function requestBarsBreweries() {
  // html elements
  let barContainer = document.querySelector("#barContainer");
  let barBrewNames = document.querySelectorAll("#barBrewName");
  let barBrewTypes = document.querySelectorAll("#barBrewType");

  let requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=sacramento&per_page=5`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
      let returnedResults = []

      for (i = 0; i < data.length; i++) {
        let barObject = {
          barname: data[i].name,
          bartype: data[i].brewery_type,
          address: data[i].street,
          lat: data[i].latitude,
          lon: data[i].longitude,
          phone: data[i].phone,
          url: data[i].website_url
        }

        returnedResults.push(barObject)
      }

      // create result cards - waiting on html template to create/append elements
      for (i = 0; i < returnedResults.length; i++) {
        let barCardEl = document.createElement("div")
        barCardEl.className = "column is-one-quarter"
        barCardEl.innerHTML = 
          `<div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
              </div>

              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p id = "barBrewName" class="title is-4">${returnedResults[i].barname}</p>
                    <p id = "barBrewType" class="subtitle is-6">${returnedResults[i].bartype}</p>
                  </div>
                </div>
                <div id = "eventDescription" class="content ellipsis">
                </div>
              </div>
            </div>`
        

        barContainer.appendChild(barCardEl)
        // barBrewNames[i].textContent = returnedResults[i].barname
        // barBrewTypes[i].textContent = returnedResults[i].bartype
      }
    })
}

requestBarsBreweries()

