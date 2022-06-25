const country = document.querySelector(".main__region")
const temperature = document.querySelector(".main__temperature")
const description = document.querySelector(".main__weather__description")
const degree = document.querySelector(".degrees")
const changeDegree = document.querySelector(".temp")
const currentDate = document.querySelector(".date")
let otherLatitude = document.querySelector(".latitudeInput")
let otherLongitude = document.querySelector(".longitudeInput")
let searchButton =  document.querySelector(".dateButton")
let currentLocationBtn = document.querySelector(".currentDateButton")
const errorText = document.querySelector(".error__text")

let coordinates ={
    latitude: null,
    longitude: null,
}


async function getYourPosition(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let coordinates ={
        latitude,
        longitude,
    }
    localStorage.setItem("coordinates", JSON.stringify(coordinates))
    let myCoordinates = JSON.parse(localStorage.getItem("coordinates"))

    let res = await axios.get("http://api.openweathermap.org/data/2.5/onecall?", {
        params:{
            lat: myCoordinates.latitude,
            lon: myCoordinates.longitude,
            appid: "9a4f4bb3e9b9706556c90de2a41fb2db"
        }
    })
    
    let weatherData = res.data

    let weatherDate = new Date(weatherData.current.dt * 1000).toLocaleString();
    country.innerText = weatherData.timezone
    let tempIndegree = Math.floor(weatherData.daily[0].temp.day + (-273.15))
    temperature.innerText = tempIndegree
    degree.innerText = "C"
    description.innerText = weatherData.daily[0].weather[0].description
    currentDate.innerText = weatherDate;

    toggleDegree(weatherData)
}

async function getOtherPosition(){
    let coordinates ={
        latitude: otherLatitude.value,
        longitude: otherLongitude.value,
    }
    localStorage.setItem("coordinates", JSON.stringify(coordinates))
    let newCoordinates = JSON.parse(localStorage.getItem("coordinates"))

    try{
        let res = await axios.get("http://api.openweathermap.org/data/2.5/onecall?", {
        params:{
            lat: newCoordinates.latitude,
            lon: newCoordinates.longitude,
            appid: "9a4f4bb3e9b9706556c90de2a41fb2db"
        }
    })

    let weatherData = res.data

    let weatherDate = new Date(weatherData.current.dt * 1000).toLocaleString();
    country.innerText = weatherData.timezone
    let tempIndegree = Math.floor(weatherData.daily[0].temp.day + (-273.15))
    temperature.innerText = tempIndegree
    degree.innerText = "C"
    description.innerText = weatherData.daily[0].weather[0].description
    currentDate.innerText = weatherDate;

    toggleDegree(weatherData)
    }
    catch(err){
        errorText.innerText = `${err.response.status}:  ${err.response.data.message.toUpperCase()}. Try again`;
    }
}

function toggleDegree(data){
    changeDegree.addEventListener("click", ()=>{
        let tempIndegree = Math.floor(data.main.temp + (-273.15))

        if(degree.innerText === "C"){
            temperature.innerText = tempIndegree * 9/5 + 32
            degree.innerText = "F"
        }
        else{
            temperature.innerText = tempIndegree
            degree.innerText = "C"
        }
    })
}

searchButton.addEventListener("click", ()=>{
    errorText.innerText = ""
    country.innerText = ""
    temperature.innerText = ""
    description.innerText = ""
    currentDate.innerText = "";
    degree.innerText = ""
    getOtherPosition()
})

currentLocationBtn.addEventListener("click", ()=>{
    errorText.innerText = ""
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getYourPosition)
    }
    else{
        console.log("Navigator not supported in browser.");
    }
})
