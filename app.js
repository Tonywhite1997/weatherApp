window.addEventListener("load", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition)
    }
    else{
        return alert("Geolocation not supported in browser.")
    }
})

const country = document.querySelector(".main__region")
const temperature = document.querySelector(".main__temperature")
const description = document.querySelector(".main__weather__description")
const degree = document.querySelector(".degrees")
const changeDegree = document.querySelector(".temp")


async function getPosition(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather?", {
        params:{
            lat: latitude,
            lon: longitude,
            appid: "9a4f4bb3e9b9706556c90de2a41fb2db"
        }
    })

    let weatherData = res.data
    // console.log(weatherData);
    country.innerText = weatherData.sys.country
    let tempIndegree = Math.floor(weatherData.main.temp + (-273.15))
    temperature.innerText = tempIndegree
    degree.innerText = "C"
    description.innerText = weatherData.weather[0].description

    toggleDegree(weatherData)
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

