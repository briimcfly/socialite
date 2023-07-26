let weather=document.getElementById("weather");
let inputCity=document.getElementById("input-city");
let buttonCity=document.getElementById("button-city");
let ticketmasterEventData=document.getElementById("ticketmaster-event-data")
let ticketmasterEventContainer=document.getElementById("ticketmaster-event-container")

let todayDate= dayjs().format("YYYY-MM-DD")
console.log(todayDate)
inputLocation =inputCity.value.trim()


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
    requestBarsBreweries();
 })

 inputCity.addEventListener("keypress" , function(event){
    if (event.key === "Enter") {
    event.preventDefault()
    weather.textContent="";
//calls the current weather and five day functions when the button is clicked
    ticketmasterEventData=""
    currentWeather();
    ticketMasterEvents();
    requestBarsBreweries()
    }
 })

 function ticketMasterEvents () {
       let eventRequestUrl= "https://app.ticketmaster.com/discovery/v2/events.json?startDateTime="+todayDate+"T00:00:00Z&&endDateTime="+todayDate+"T23:59:59Z&classificationName=Sports,Family&city="+inputLocation+"&apikey=yTpugCkiZy8jJLwQIFI29hvie9b9teAA"
   
   fetch(eventRequestUrl)
        .then(function (response){
             return response.json();
        })
   .then(function (data) {
       console.log(data);
    if (data.page.totalElements===0) {
       let eventCard = document.createElement("div");
       let eventCardImage=document.createElement("div");
       let eventFigure= document.createElement("figure");
       let imgEvents =document.createElement("img");
       let eventCardContent=document.createElement("div");
       let eventMedia=document.createElement("div");
       let eventMediaContent=document.createElement("div");
       let headingEvents=document.createElement("p");
       let eventClassification=document.createElement("p");
       let descriptionEvents = document.createElement("div");
    
       eventCard.className="card";
       eventCardImage.className="card-image";
       eventFigure.className="image is-4by3";
       eventCardContent.className="card-content";
       eventMedia.className="media";
       eventMediaContent.className="media-content";
       headingEvents.className="title is-4";
       eventClassification.className="subtitle is-6";
       descriptionEvents.className="content";

       headingEvents.textContent="No events of this type";
      
       ticketmasterEventData.appendChild(eventCard);
       eventCard.appendChild(eventCardImage);
       eventCardImage.appendChild(eventFigure)
       eventFigure.appendChild(imgEvents)
       eventCard.appendChild(eventCardContent);
       eventCardContent.appendChild(eventMedia);
       eventMedia.appendChild(eventMediaContent);
       eventMediaContent.appendChild(headingEvents)
       eventMediaContent.appendChild(eventClassification)
       eventCard.appendChild(descriptionEvents);


    }
    else {
       for(i=0; i<data._embedded.events.length; i++){
                
       let eventCard = document.createElement("div");
       let eventCardImage=document.createElement("div");
       let eventFigure= document.createElement("figure");
       let imgEvents =document.createElement("img");
       let eventCardContent=document.createElement("div");
       let eventMedia=document.createElement("div");
       let eventMediaContent=document.createElement("div");
       let headingEvents=document.createElement("p");
       let eventClassification=document.createElement("p");
       let descriptionEvents = document.createElement("div");

       eventCard.className="card";
       eventCardImage.className="card-image";
       eventFigure.className="image is-4by3";
       eventCardContent.className="card-content";
       eventMedia.className="media";
       eventMediaContent.className="media-content";
       headingEvents.className="title is-4";
       eventClassification.className="subtitle is-6";
       descriptionEvents.className="content";

       imgEvents.src=data._embedded.events[i].images[0].url;
       headingEvents.textContent=data._embedded.events[i].name;
       eventClassification.textContent=data._embedded.events[i].classifications[0].genre.name;
       descriptionEvents.textContent=data._embedded.events[i].info;
 
       ticketmasterEventData.appendChild(eventCard);
       eventCard.appendChild(eventCardImage);
       eventCardImage.appendChild(eventFigure)
       eventFigure.appendChild(imgEvents)
       eventCard.appendChild(eventCardContent);
       eventCardContent.appendChild(eventMedia);
       eventMedia.appendChild(eventMediaContent);
       eventMediaContent.appendChild(headingEvents)
       eventMediaContent.appendChild(eventClassification)
       eventCard.appendChild(descriptionEvents);
       }
    }
 })
}


// openBrewery api

function requestBarsBreweries() {
  // html elements
  let barContainer = document.querySelector("#barContainer");

  let requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${inputLocation}&per_page=10`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
      let returnedResults = []
      // iterate thru returned data
      for (i = 0; i < data.length; i++) {
        // filter results that match accepted categories
        if (
          ((data[i].brewery_type === "bar") || 
          (data[i].brewery_type === "brewpub") || 
          (data[i].brewery_type === "micro") ||
          (data[i].brewery_type === "nano") ||
          (data[i].brewery_type === "regional")) ) {
            // create object for each data result with relevant properties to be used elsewhere
            let barObject = {
              barname: data[i].name,
              bartype: data[i].brewery_type,
              address: data[i].street,
              lat: data[i].latitude,
              lon: data[i].longitude,
              phone: data[i].phone ?? "None available",
              url: data[i].website_url ?? "None available"
            }
            returnedResults.push(barObject)
        }
      }

      // create result cards
      for (i = 0; i < returnedResults.length; i++) {
        let barCardEl = document.createElement("div")
        barCardEl.className = "column is-one-quarter"
        barCardEl.innerHTML = 
          `<div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="assets\\images\\${returnedResults[i].bartype}.png" alt="Placeholder image">
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
                  <p class="has-text-weight-bold">${returnedResults[i].address}</p>
                  <p class="has-text-weight-bold">Phone: <a href="tel:${returnedResults[i].phone}">${returnedResults[i].phone}</a></p>
                  <p class="has-text-weight-bold"><a href=${returnedResults[i].url} target="_blank">Visit them here!</a></p>
                </div>
              </div>
            </div>`
        

        barContainer.appendChild(barCardEl)
      }
    })
}


