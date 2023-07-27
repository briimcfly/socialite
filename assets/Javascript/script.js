let weather=document.getElementById("weather");
let inputCity=document.getElementById("input-city");
let cityName = document.getElementById(`cityName`);
let cityHeader = document.getElementById(`cityHeader`);
let buttonCity=document.getElementById("button-city");
let ticketmasterEventData=document.getElementById("ticketmaster-event-data")
let ticketmasterEventContainer=document.getElementById("ticketmaster-event-container")
let musicEvent=document.getElementById("music");
let sportsEvent=document.getElementById("sports");
let artsEvent=document.getElementById("arts");
let familyEvent=document.getElementById("family");
let comedyEvent=document.getElementById("comedy");
let filmEvent=document.getElementById("film");
let festivalsEvent=document.getElementById("festivals");
let miscEvent=document.getElementById("misc");
const modalLauncher = document.getElementById('modal-launcher')

let todayDate= dayjs().format("YYYY-MM-DD")
console.log(todayDate)
inputLocation =inputCity.value.trim()
let eventInput= "music"

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
// Add the City Name & Header   
            cityHero(data);
        })
}

//Function that sets a "Things to do in:" Header
function cityHero(param){
    modalLauncher.style.display = "inline-flex";
    const titleEl = document.getElementById('titleEl'); 
    titleEl.innerHTML = "";
    titleEl.textContent = "Things to do in "; 
    const spanEl = document.createElement('span');
    spanEl.className = "has-text-link";
    titleEl.append(spanEl); 
    spanEl.textContent = param.name
    document.getElementById('cityHeader').prepend(titleEl);

    //creating elements that will be part of the display
    var headerIconEl =document.createElement("img");
    var temperature = document.createElement("p");
    //creating content for the newly created elements
    imgSrc=param.weather[0].icon
    iconUrl= "https://openweathermap.org/img/w/"+imgSrc+ ".png";
    headerIconEl.src=iconUrl
    temperature.textContent="Temp: " + param.main.temp + "° F";
    //appending the new elements to the DOM  
    weather.appendChild(headerIconEl);
    weather.appendChild(temperature);
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
    
    currentWeather();
    ticketMasterEvents();
    requestBarsBreweries()

    }
 })

 function ticketMasterEvents () {
     let eventRequestUrl= "https://app.ticketmaster.com/discovery/v2/events.json?startDateTime="+todayDate+"T00:00:00Z&&endDateTime="+todayDate+"T23:59:59Z&classificationName="+eventInput+"&city="+inputLocation+"&apikey=yTpugCkiZy8jJLwQIFI29hvie9b9teAA"
   
   fetch(eventRequestUrl)
        .then(function (response){
             return response.json();
        })
   .then(function (data) {
       console.log(data);

    if (data.page.totalElements===0) {
        ticketmasterEventData.innerHTML=""
       let eventColumn=document.createElement("div")
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
    
       eventColumn.className="column"
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
      
       ticketmasterEventData.appendChild(eventColumn);
       eventColumn.appendChild(eventCard);
       eventCard.appendChild(eventCardImage);
       eventCardImage.appendChild(eventFigure)
       eventFigure.appendChild(imgEvents)
       eventCard.appendChild(eventCardContent);
       eventCardContent.appendChild(eventMedia);
       eventMedia.appendChild(eventMediaContent);
       eventMediaContent.appendChild(headingEvents)
       eventMediaContent.appendChild(eventClassification)
       eventCardContent.appendChild(descriptionEvents);
    }

    else {
       ticketmasterEventData.innerHTML=""
        for(i=0; i<data._embedded.events.length; i++){
       

       let eventColumn=document.createElement("div")
       let eventCard = document.createElement("div");
       let eventCardImage=document.createElement("div");
       let eventFigure= document.createElement("figure");
       let imgEvents =document.createElement("img");
       let eventCardContent=document.createElement("div");
       let eventMedia=document.createElement("div");
       let eventMediaContent=document.createElement("div");
       let headingEvents=document.createElement("p");
       let eventLink=document.createElement("a");
       let eventClassification=document.createElement("p");
       let descriptionEvents = document.createElement("div");

       ticketmasterEventData.ClassName="columns section carousel is-multiline"
       eventColumn.className="column is-one-quarter"
       eventCard.className="card";
       eventCardImage.className="card-image";
       eventFigure.className="image is-4by3";
       eventCardContent.className="card-content";
       eventMedia.className="media";
       eventMediaContent.className="media-content";
       headingEvents.className="title is-4";
       eventClassification.className="subtitle is-6";
       descriptionEvents.className="content ellipsis";

       imgEvents.src=data._embedded.events[i].images[0].url;
       headingEvents.textContent=data._embedded.events[i].name;
       eventClassification.textContent=data._embedded.events[i].classifications[0].genre.name;
       eventLink.textContent="Link to TicketMaster" 
       eventLink.href=data._embedded.events[i].url
       descriptionEvents.textContent=data._embedded.events[i].info;
        
       ticketmasterEventData.appendChild(eventColumn);
       eventColumn.appendChild(eventCard);
       eventCard.appendChild(eventCardImage);
       eventCardImage.appendChild(eventFigure)
       eventFigure.appendChild(imgEvents)
       eventCard.appendChild(eventCardContent);
       eventCardContent.appendChild(eventMedia);
       eventMedia.appendChild(eventMediaContent);
       eventMediaContent.appendChild(headingEvents)
       eventMediaContent.appendChild(eventLink)
       eventMediaContent.appendChild(eventClassification)
       eventCardContent.appendChild(descriptionEvents);
          
    }

    }
    bulmaCarousel.attach('.carousel', {
        slidesToScroll:1,
        slidesToShow:4,
        navigation: true,
        loop: true,   
       })
 })
}


musicEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    musicEvent.classList.add("is-active")
    eventInput="music"
    ticketMasterEvents()
})

sportsEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    sportsEvent.classList.add("is-active")
    eventInput="sports"
    ticketMasterEvents()
})

artsEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    artsEvent.classList.add("is-active")
    eventInput="arts";
    ticketMasterEvents()
})

familyEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    familyEvent.classList.add("is-active")
    eventInput="family";
    ticketMasterEvents()
})

comedyEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    comedyEvent.classList.add("is-active")
    eventInput="comedy";
    ticketMasterEvents()
})

filmEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    filmEvent.classList.add("is-active")
    eventInput="film";
     ticketMasterEvents()
})

festivalsEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li")
    for(i=0; i<eventLi.length; i++){
        eventLi[i].className=""}
    festivalsEvent.classList.add("is-active")
    eventInput="festivals"
    ticketMasterEvents()
})

miscEvent.addEventListener("click" , function(){
    let eventLi=document.querySelectorAll("li") 
    for(i=0; i<eventLi.length; i++){
    eventLi[i].className=""}
    miscEvent.classList.add("is-active")
    eventInput="Miscellaneous";
     ticketMasterEvents()
})

bulmaCarousel.attach('.carousel', {
    slidesToScroll:1,
    slidesToShow:4,
    navigation: true,
    loop: true,
})


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



