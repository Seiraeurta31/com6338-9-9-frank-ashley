var weatherDisplay = document.getElementById('weather')
var form = document.querySelector('form')

form.onsubmit = function(e) {
    e.preventDefault()
    var userInput = this.search.value.trim()

    if(!userInput) {
        form.search.value = "" 
        return
    }
        
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&appid=08ace7633004d5ddf370678a8c052e90')
    .then(function(res){
        return res.json()    
    })
    .then(formatLocationData)
    .catch(function(err){
        form.search.value = ""
        weatherDisplay.innerHTML = ""
        var errorMessage = document.createElement('h2')
        errorMessage.textContent = "Location not found"
        weatherDisplay.appendChild(errorMessage)
    })   
}


function formatLocationData(locationData){
    //Clear previous data
    form.search.value = ""
    weatherDisplay.innerHTML = ""
    
    //City/Country 
    var cityName = document.createElement('h2')
    cityName.textContent = locationData.name + ", " + locationData.sys.country
    console.log(cityName)
    weatherDisplay.appendChild(cityName)

    //Map Link 
    var mapLink = document.createElement('a')
    mapLink.textContent = "Click to view map"
    var latitude = locationData.coord.lat
    var longitude = locationData.coord.lon
    mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude 
    mapLink.setAttribute('target', '_BLANK')
    weatherDisplay.appendChild(mapLink)

    //Weather Icon 
    var weatherIcon = document.createElement('img')
    var iconCode = locationData.weather[0].icon
    weatherIcon.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    weatherDisplay.appendChild(weatherIcon)

    //Weather Description
    var weatherDescription = document.createElement('p')
    weatherDescription.style.textTransform = "capitalize"
    weatherDescription.textContent = locationData.weather[0].description
    weatherDisplay.appendChild(weatherDescription)

    weatherDisplay.appendChild(document.createElement('br'))

    //Current Temp
    var currentTemp = document.createElement('p') 
    currentTemp.textContent = "Current: " + (locationData.main.temp).toFixed(2) + "° F"
    weatherDisplay.appendChild(currentTemp)

    // //Feels Like Temp
    var feelLikeTemp = document.createElement('p') 
    feelLikeTemp.textContent = "Feels like: " + (locationData.main.feels_like).toFixed(2) + "° F"
    weatherDisplay.appendChild(feelLikeTemp)

    weatherDisplay.appendChild(document.createElement('br'))

    // //TimeStamp
    var timeStamp = document.createElement('p')
    var date = new Date((locationData.dt)*1000)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    }) 
    timeStamp.textContent = "Last updated: " + timeString
    weatherDisplay.appendChild(timeStamp)

}
