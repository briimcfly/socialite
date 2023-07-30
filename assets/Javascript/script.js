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
let all = document.getElementById('all')
let foodCardImage="";
let foodPic= "./assets/images/brewpub.png"

// The Current City that has been saved to Local Storage or default value of "Sacramento, CA"
let currentCity = localStorage.getItem("storedCurrentCity") ?? "Sacramento, CA";
let cityObject = {
  cityName: null,
  lat: null,
  lon: null,
}

currentWeather(currentCity);
let todayDate= dayjs().format("YYYY-MM-DD")
let weekDate= dayjs().add(7,"day").format("YYYY-MM-DD")
let eventInput= "arts"
let foodInput = 'commercial.food_and_drink,catering'

function currentWeather(city) {

    // Geocoding API to convert city input into lat/lon coordinates

    // take city input and split into pieces. 
    cityQuery = city.split(",");

    let requestCoordsUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery[0]},${cityQuery[1] ?? ""},${cityQuery[2] ?? ""}&limit=1&appid=e7d709054173c8d786359abf189001df`

    // fetch coordinates
    fetch(requestCoordsUrl)
    .then(response => response.json())
    .then(function (data) {
      console.log("geo data", data)
      if (data.length === 0) {
        modalTitle.textContent = "Incorrect Input Format"
        modalBody.innerHTML = `<p>Please separate city and state/province with a comma ",".</p>`
        modal.style.display = 'block';
      }
      else {
        // save search result coords for later use
        cityObject = {
          searchText: city,
          lat: data[0].lat,
          lon: data[0].lon
        }
        currentCity = cityObject.searchText
        console.log("current city", currentCity)
        localStorage.setItem("storedCurrentCity", currentCity);
      }
      //request URL incorporating the user inputted city
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityObject.lat}&lon=${cityObject.lon}&appid=88a5790f881a820d719667c737ffc4f3&units=imperial`)
    })
    // .catch(err => console.log("error", err))
    //fetch request that returns Weather data
    .then(response => response.json())
    .then(function (data) {

      // Add the City Name & Header  
      ticketMasterEvents();
      requestBarsBreweries();
      getFoodAll();
      cityHero(data);
    })
}

//Function that sets a "Things to do in:" Header
function cityHero(param){
    inputCity.value = "";
    modalLauncher.style.display = "inline-flex";
    const titleEl = document.getElementById('titleEl'); 
    titleEl.innerHTML = "";
    titleEl.textContent = "Things to do this week in "; 
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

//Modal Launcher 
const modalLauncher = document.getElementById('modal-launcher')
const modal = document.getElementById('modal');
const modalClose = document.getElementById('close');
const modalTitle = document.querySelector(".modal-card-title")
const modalBody = document.querySelector(".modal-card-body")

modalLauncher.onclick = function() {
    modal.style.display = 'block';
}

modalClose.onclick = function(){
    modalTitle.textContent = ""
    modalBody.innerHTML = ""
    modal.style.display = 'none';
}


buttonCity.addEventListener("click" , function(){
    weather.textContent="";
    inputLocation =inputCity.value.trim()
//calls the current weather and five day functions when the button is clicked
    currentWeather(inputLocation);
 })

 inputCity.addEventListener("keypress" , function(event){
    if (event.key === "Enter") {
    event.preventDefault()
    inputLocation =inputCity.value.trim()

    weather.textContent="";
//calls the current weather and five day functions when the button is clicked


    currentWeather(inputLocation);

    }
 })

 function ticketMasterEvents () {

     let eventRequestUrl= "https://app.ticketmaster.com/discovery/v2/events.json?startDateTime="+todayDate+"T00:00:00Z&&endDateTime="+weekDate+"T23:59:59Z&classificationName="+eventInput+"&city="+currentCity+"&apikey=yTpugCkiZy8jJLwQIFI29hvie9b9teAA"


   
   fetch(eventRequestUrl)
        .then(function (response){
             return response.json();
        })
   .then(function (data) {

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
       eventMediaContent.appendChild(headingEvents);
       eventMediaContent.appendChild(eventClassification)
       eventCardContent.appendChild(descriptionEvents);
    }

    else {
       ticketmasterEventData.innerHTML=""
       let newParent=document.createElement("div")
       newParent.setAttribute("id","slider")
       ticketmasterEventData.setAttribute("class","")

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
       let eventDate=document.createElement("p");
       let eventLink=document.createElement("a");
       let eventClassification=document.createElement("p");
       let descriptionEvents = document.createElement("div");

      // ticketmasterEventData.className="columns section is-multiline slider"
       eventColumn.newParent="column is-one-third "
       eventCard.className="card";
       eventCardImage.className="card-image";
       eventFigure.className="image is-4by3";
       eventCardContent.className="card-content";
       eventMedia.className="media";
       eventMediaContent.className="media-content";
       headingEvents.className="title is-4";
       eventClassification.className="subtitle is-6";
       descriptionEvents.className="content ellipsis";
       eventLink.setAttribute("target","_blank")

       imgEvents.src=data._embedded.events[i].images[0].url;
       headingEvents.textContent=data._embedded.events[i].name;
       eventClassification.textContent=data._embedded.events[i].classifications[0].genre.name;
       eventDate.textContent="Date: "+data._embedded.events[i].dates.start.localDate +" "+ data._embedded.events[i].dates.start.localTime;
       eventLink.textContent="Link to TicketMaster" 
       eventLink.href=data._embedded.events[i].url
       descriptionEvents.textContent=data._embedded.events[i].info;
        
       ticketmasterEventData.appendChild(newParent);
       newParent.appendChild(eventColumn)
       eventColumn.appendChild(eventCard);
       eventCard.appendChild(eventCardImage);
       eventCardImage.appendChild(eventFigure)
       eventFigure.appendChild(imgEvents)
       eventCard.appendChild(eventCardContent);
       eventCardContent.appendChild(eventMedia);
       eventMedia.appendChild(eventMediaContent);
       eventMediaContent.appendChild(headingEvents)
       eventMediaContent.appendChild(eventDate)
       eventMediaContent.appendChild(eventLink)
       eventMediaContent.appendChild(eventClassification)
       eventCardContent.appendChild(descriptionEvents);
       
       
    }
    bulmaCarousel.attach('#slider', {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true,
        autoplay: false,
    });  
    }
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

// openBrewery api

function requestBarsBreweries() {
  // html elements
  let barContainer = document.querySelector("#barContainer");
  barContainer.innerHTML = "";

  let requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_dist=${cityObject.lat},${cityObject.lon}&per_page=10`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
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


indian.addEventListener("click", function() {
  let eventLi=document.querySelectorAll("li")
  for(i=0; i<eventLi.length; i++){
    eventLi[i].className=""}
    foodInput = 'catering.restaurant.indian'
    foodPic = "./assets/images/indian.png"
    indian.classList.add("is-active")
    getFoodAll()
})


steakhouse.addEventListener("click", function() {
  let eventLi=document.querySelectorAll("li")
  for(i=0; i<eventLi.length; i++){
    eventLi[i].className=""}
  foodInput = 'catering.restaurant.steak_house,catering.restaurant.barbecue'
  foodPic = "./assets/images/steakhouse.png"
  steakhouse.classList.add("is-active")
  getFoodAll()
})


seafood.addEventListener("click", function() {
  let eventLi=document.querySelectorAll("li")
  for(i=0; i<eventLi.length; i++){
    eventLi[i].className=""}
    foodInput = 'catering.restaurant.seafood,catering.restaurant.fish_and_chips'
    foodPic = "./assets/images/seafood.png"
  seafood.classList.add("is-active")
  getFoodAll()
})


italian.addEventListener("click", function() {
  let eventLi=document.querySelectorAll("li")
  for(i=0; i<eventLi.length; i++){
    eventLi[i].className=""}
    foodInput = 'catering.restaurant.pizza,catering.restaurant.italian'
    foodPic = "./assets/images/italian.png"
  italian.classList.add("is-active")
  getFoodAll()
})

chinese.addEventListener("click", function() {
  let eventLi=document.querySelectorAll("li")
  for(i=0; i<eventLi.length; i++){
    eventLi[i].className=""}
    foodInput = 'catering.restaurant.chinese'
    foodPic = "./assets/images/chinese.png"
    chinese.classList.add("is-active")
    getFoodAll()
})

mexican.addEventListener("click", function() {
let eventLi=document.querySelectorAll("li")
for(i=0; i<eventLi.length; i++){
  eventLi[i].className=""}
  mexican.classList.add("is-active")
  foodInput = 'catering.restaurant.mexican,catering.restaurant.tex-mex,catering.restaurant.tacos'
  foodPic = "./assets/images/mexican.png"
  getFoodAll()
})


korean.addEventListener("click", function() {
let eventLi=document.querySelectorAll("li")
for(i=0; i<eventLi.length; i++){
  eventLi[i].className=""}
korean.classList.add("is-active")
foodInput = 'catering.restaurant.korean'
foodPic = "./assets/images/korean.png"
getFoodAll()
})

function getFoodAll () {
  restaurants.innerHTML ="";
  let newParent2=document.createElement("div")
 newParent2.setAttribute("id","slider2")
 restaurants.setAttribute("class","")

      let urlAll= 'https://api.geoapify.com/v2/places?categories=' + foodInput +'&filter=circle:'+cityObject.lon+','+cityObject.lat+',25000&apiKey=b3be0caaf96f4d2ca82c919fad3a6a1d'
      
      fetch(urlAll)
        .then(function (response){
          return response.json();
        })
      .then(function (data) {
        for (i=0; i < data.features.length; i++) {
      
        let foodCard = document.createElement("div");
        foodCardImage=document.createElement("img");
        let headingFood=document.createElement("h2");
        let foodUrl= document.createElement("a");
        let foodPhone= document.createElement("a");
        let foodAddress=document.createElement("p")
        

        foodCard.className="card column section";
        foodCardImage.className="card-image";
        headingFood.className="title is-4"
        foodUrl.className= "content"
        foodPhone.className="has-text-weight-bold"
        foodAddress.className= "content"
        

        foodCardImage.src= foodPic
        headingFood.textContent=data.features[i].properties.name;
        foodUrl.textContent=data.features[i].properties.datasource.raw.website;
        foodPhone.textContent="Phone: "+data.features[i].properties.datasource.raw.phone;
        foodAddress.textContent=data.features[i].properties.address_line2;

        foodCard.appendChild(foodCardImage);
        foodCard.appendChild(headingFood);
        foodCard.appendChild(foodPhone);
        foodCard.appendChild(foodAddress);
        restaurants.appendChild(newParent2);
        newParent2.appendChild(foodCard);
        foodCard.appendChild(foodUrl);
        }
        bulmaCarousel.attach('#slider2', {
          slidesToScroll: 1,
          slidesToShow: 3,
          infinite: true,
          autoplay: false,
      });  
      })
}
