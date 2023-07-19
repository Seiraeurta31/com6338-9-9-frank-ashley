const weatherDisplay = document.getElementById('weather')
const form = document.querySelector('form')

form.onsubmit = async function(e) {
    e.preventDefault()
    const userInput = this.search.value.trim()

    if(!userInput) return

    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`)
        const weatherData = await res.json() 
        console.log(weatherData) 
        formatLocationData(weatherData)
    } catch(err){
        form.search.value = ""
        weatherDisplay.innerHTML = ""
        weatherDisplay.innerHTML = `<h2>${'location not found'}</h2>`
    }   
}


const formatLocationData = (locationData) =>{
    const {
        name,
        dt,
        sys: {
            country
        },
        coord: {
            lat,
            lon
        },
        main: {
            temp,
            feels_like
        },
        weather: [{
            description,
            icon
            },
        ]
    } = locationData
    //Clear previous data
    form.search.value = ""
    weatherDisplay.innerHTML = ""
    
    //City/Country 
    var cityName = document.createElement('h2')
    cityName.textContent = name + ", " + country
    console.log(cityName)
    weatherDisplay.appendChild(cityName)

    //Map Link 
    var mapLink = document.createElement('a')
    mapLink.textContent = "Click to view map"
    var latitude = lat
    var longitude = lon
    mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude 
    mapLink.setAttribute('target', '_BLANK')
    weatherDisplay.appendChild(mapLink)

    //Weather Icon 
    var weatherIcon = document.createElement('img')
    var iconCode = icon
    weatherIcon.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    weatherDisplay.appendChild(weatherIcon)

    //Weather Description
    var weatherDescription = document.createElement('p')
    weatherDescription.style.textTransform = "capitalize"
    weatherDescription.textContent = description
    weatherDisplay.appendChild(weatherDescription)

    weatherDisplay.appendChild(document.createElement('br'))

    //Current Temp
    var currentTemp = document.createElement('p') 
    currentTemp.textContent = "Current: " + (temp).toFixed(2) + "° F"
    weatherDisplay.appendChild(currentTemp)

    // //Feels Like Temp
    var feelLikeTemp = document.createElement('p') 
    feelLikeTemp.textContent = "Feels like: " + (feels_like).toFixed(2) + "° F"
    weatherDisplay.appendChild(feelLikeTemp)

    weatherDisplay.appendChild(document.createElement('br'))

    // //TimeStamp
    var timeStamp = document.createElement('p')
    var date = new Date((dt)*1000)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    }) 
    timeStamp.textContent = "Last updated: " + timeString
    weatherDisplay.appendChild(timeStamp)

}
