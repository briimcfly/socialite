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
let restaurants = document.getElementById('restaurants')

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
            thingToDo(data.name);
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

//Function that sets a "Things to do in:" Header
function thingToDo(param){
    const titleEl = document.createElement('h1'); //Create the H2
    titleEl.className = 'title is-3'; // Add the Title Classes
    titleEl.textContent = 'Things to do in '; // Add the intial Text
    const spanEl = document.createElement('span'); // Create the Span
    spanEl.className = 'has-text-link'; // Add the Styling Class
    spanEl.textContent = param; // Set the City Name as Text
    titleEl.appendChild(spanEl); // Add Span to H2
    document.getElementById('cityHeader').prepend(titleEl); // Add H2 to Section
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

    getFoodAll();
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
       eventCard.appendChild(descriptionEvents);
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
       eventCard.appendChild(descriptionEvents);
          
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


//adding event listeners to different tabs of events
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


function getFoodAll () {
 
  inputLocation =inputCity.value.trim() 
  //request URL incorporating the user inputted city
  let requestUrl ="http://api.openweathermap.org/geo/1.0/direct?q=" + inputLocation + "&limit=5&appid=88a5790f881a820d719667c737ffc4f3" /* used to get the latitude and longintue from the input */
  fetch(requestUrl)
      .then(function (response){
          return response.json();
      })
      .then(function (data) {
     
     let lat = parseInt(data[0].lat)
      let lon = parseInt(data[0].lon)

      let urlAll= "https://api.geoapify.com/v2/places?categories=commercial.food_and_drink,catering&filter=circle:" +lon + ","+lat + ",25000&apiKey=b3be0caaf96f4d2ca82c919fad3a6a1d"
      
      /* adjust URL for tabbed type
      catering.restaurant.pizza
      catering.restaurant.burger
      catering.restaurant.italian
      catering.restaurant.chinese
      catering.restaurant.japanese
      catering.restaurant.indian
      catering.restaurant.sushi
      catering.restaurant.seafood
      catering.restaurant.steak_house	
      catering.restaurant.barbecue	
      */

      fetch(urlAll)
      .then(function (response){
          return response.json();
      })
      .then(function (data) {
        console.log(data)
    for (i=0; i < data.length; i++) {
   
    let foodCard = document.createElement("div");
    let foodCardImage=document.createElement("div");
    let headingFood=document.createElement("p");
    let foodUrl= document.createElement("p");
    let foodPhone= document.createElement("p");
    let foodAddress=document.createElement("p")
    
    foodCard.className="card";
    foodCardImage.className="card-image";
    
    // foodCardImage = insert generic picture cards based on type
    headingFood.textContent=data.features[i].properties.name;
    foodUrl.textContent=data.features[i].properties.datasource.raw.url;
    foodPhone.textContent=data.features[i].properties.datasource.raw.phone;
    foodAddress.textContent=data.features[i].properties.address_line2;

    foodCard.appendChild(foodCardImage);
    foodCard.appendChild(headingFood);
    foodCard.appendChild(foodUrl);
    foodCard.appendChild(foodPhone);
    foodCard.appendChild(foodAddress);
    restaurants.appendChild(foodCard);
    
  }
   
      })
  })
}

    

  

    

  
