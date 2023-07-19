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
    
    weatherDisplay.innerHTML = 
    `<h2>${name}, ${country}</h2>
    <a href = "https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target = "_BLANK">Click to view map</a>
    <img src = "https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>${description}</p>
    <br>
    <p>${temp}</p>
    <p>${feels_like}</p>
    <br>
    <p>"Last updated: ${timeString(dt)}</p>`
}

const timeString = (dt) =>{
    const date = new Date((dt)*1000)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    return timeString
}       
