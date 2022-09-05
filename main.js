//recuperer les element dont on a besoin du Dom (est une interface de programmationqui est une représentation du HTML d'une page web et qui permet d'accéder aux éléments de cette page web et de les modifier avec le langage JavaScript.)

const  app =document.querySelector('.weather-app');
const  temp =document.querySelector('.temp');
const  dateOutput =document.querySelector('.date');
const  timeOutput =document.querySelector('.time');
const  conditionOutput =document.querySelector('.condition');
const  nameOutput =document.querySelector('.name');
const  icon =document.querySelector('.icon');
const  cloudOutput =document.querySelector('.cloud');
const  humidityOutput =document.querySelector('.humidity');
const  windOutput =document.querySelector('.wind');
const  form =document.getElementById('locationInput');
const  search =document.querySelector('.search');
const  btn =document.querySelector('.submit');
const  cities =document.querySelectorAll('.city');

//la ville par defaut quand la page se charge

let cityInput = "London";

// ajouter un ecouteur devenement click pour chaque city dans le panel

cities.forEach((city) => { 
    city.addEventListener('click' , (e) => {

        //changer de la city par defaut a celle qu'on a clicker
        cityInput = e.target.innerHTML; // e.target se refer a l'objet qui a envoyé l'evenement ei city innerHTML pour récupère ou définit la syntaxe HTML décrivant les descendants de l'élément.
        
        //fonction pour fetch les données de l'API 
        fetchWeatherData(); 
        //une annime
        app.style.opacity = "0";
    });
})

//ajouter un evenement submit au form
form.addEventListener('submit' , (e) => {
    //si l'input de la searchbar est vide afficher une alerte
    if(search.value.length == 0){
        alert('please type in a city name');
    } else {
        //changer la city par defaut par celle ecrite
        cityInput = search.value;

        fetchWeatherData();

        //suprimer le texte de la barre de recheche
        search.value = "";
        app.style.opacity = "0";
        
    }
    e.preventDefault();
});
 
//fonction qui retourn le jour depuis la date
function dayOfTheWeek(day, month, year){
    const weekday =[
        "Sanday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "thursday",
        "friday",
        "Saturday"
    ];
    return weekday[new Date('${day}/{month}/${year}').getDay()];
};

//fonction qui recupere et fetch les données de l'API meteo

function fetchWeatherData() {
    
    //fetch les donner et ajouter dynamiquement le nom de la city 
    fetch('http://api.weatherapi.com/v1/current.json?key=e52671183066468f821143353220409&q='+cityInput+'&aqi=no    ')

    .then(response => response.json())
    .then(data => {
        console.log(data);

        //ajouter la temperature etc
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        //avoir la date et le temp de la city et extraire le jour le mois et lennée dans des var

        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        //reformer la date en qlq chose de plus attirant  et lajouter a la page
        dateOutput.innerHTML = date;
        timeOutput.innerHTML = time;

        //ajouter le nom du la city dans la page 
        nameOutput.innerHTML = data.location.name;

        //l'url de licon correspondante
        const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length);
        icon.src = "./icons/" + iconId;

        //weather details
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
 
        let timeOfDay = "day";
        const code = data.current.condition.code;

        //change to night (if its night time in the city)
        if(!data.current.is_day) {
            timeOfDay = "night";
        }
        if(code == 1000){

            app.style.backgroundImage =' url(./images/'+timeOfDay+'/clear.jpg)';

            btn.style.background = "#e5ba92";
            if(timeOfDay == "night"){
                btn.style.background ="#181e27"
            }
        }
        else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279  ||
            code == 1282
        ){
           app.style.backgroundImage ='url(./images/'+timeOfDay+'/cloudy.jpg)';
            btn.style.background = "#fa6d1b";
            if(timeOfDay == "night"){
                btn.style.background ="#181e27"
            }

        }else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ){
            app.style.backgroundImage ='url(./images/'+timeOfDay+'/rainy.jpg)';
            btn.style.background = "#647d75";
            if(timeOfDay == "night"){
                btn.style.background ="#325c80"
            }
        }else {
            app.style.backgroundImage ='url(./images/'+timeOfDay+'/snowy.jpg)';
            btn.style.background = "#4d72aa";
            if(timeOfDay == "night"){
                btn.style.background ="#1b1b1b" 
            }
        }
        app.style.opacity = "1";

    })

    //si lutilisateur ecrit une ville qui n'existe pas
    .catch(() => {
        alert('la ville nest pas trouver réessayer');
        app.style.opacity = "1";
    });
}
fetchWeatherData();

app.style.opacity = "1";