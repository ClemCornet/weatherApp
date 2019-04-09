class Data {
    constructor(obj) {
      this.city = obj.name;
      this.country = obj.sys.country;
      this.temp = obj.main.temp;
      this.icon = obj.weather[0].icon;
    }
  }

let myPosition = {
    lat: '',
    lng: '',
}

function showPosition(position) {
    myPosition.lat = position.coords.latitude;
    myPosition.lng = position.coords.longitude;
    loadWeatherData()
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

getLocation();

function loadWeatherData(){
    ajaxGet("https://fcc-weather-api.glitch.me/api/current?lat=" + myPosition.lat + "&lon="+ myPosition.lng +"", function (reponse) {
        // Transforme les données JSON en objet
        var weather = JSON.parse(reponse);
        // Instancie l'objet Data
        let weatherData = new Data(weather);
        insertData(weatherData);
    });
};

function insertData(obj){
    let city = document.querySelector('.city');
    let country = document.getElementById('country');
    let temp = document.querySelector('.temp');
    let icon = document.querySelector('.icon');

    city.textContent = obj.city + ",";
    country.textContent = obj.country;
    temp.textContent = obj.temp + " C°";
    icon.src = obj.icon;
}

