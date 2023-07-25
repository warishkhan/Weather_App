const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')
const city_name = document.getElementById('city_name')
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');

function fToC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var num = parseFloat(fToCel).toFixed(2);
  var message =  num + '\xB0C,';
    return message;
} 

const getInfo = async(event)=>{
      event.preventDefault();
  let cityVal = cityName.value;

  if(cityVal === ''){
    city_name.innerText =`Please Write the name before search`;
    dataHide.classList.add('data_hide');
  }else{
   try {
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=980fb982d78096642cac70621379eea2`;
    const response = await fetch(url);
    const data = await response.json()
    const arrData = [data];
     let deg = arrData[0].main.temp;
    city_name.innerText =`${cityVal},${arrData[0].sys.country}`;
    // temp.innerText =`${arrData[0].main.temp}`
    temp.innerText = fToC(deg)
    // temp_status.innerText =`${arrData[0].weather[0].main}`;

    const tempMood = arrData[0].weather[0].main;

    if(tempMood == "Clear") {
        temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
    } else if (tempMood =="Clouds") {
        temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
    }
     else if (tempMood =="Rain") {
        temp_status.innerHTML = "<i class='fas fa-rain' style='color: #a4b0be;'></i>";
    } else {
        temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
    }

    dataHide.classList.remove('data_hide');

   } catch (error) {
    city_name.innerText =`Please Enter the city name properly`;
    dataHide.classList.add('data_hide');
   }
  }
    
}

const date = document.getElementById('today_data')

const getCurrentDay = ()=>{

var weekday = ["Sumday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]

let days = weekday[new Date().getDay()];

return days;
}

let day = document.getElementById('day');

day.innerText = getCurrentDay();


const getCurrentTime = ()=>{
    var months =[
        "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    var hours = now.getHours();
    var mins = now.getMinutes();
    var years = now.getFullYear();

    let periods = "AM";

    if(hours > 11){
        periods = "PM"
    
    if(hours > 12) hours -= 12;
    }
    if(mins <10){
        mins = "0"+mins;
    }  

    if(hours < 10){
        hours = "0"+hours;
    }
    return ` ${month} ${date} ${years} | ${hours}:${mins}${periods}`;
}

     
    date.innerText= getCurrentTime();

submitBtn.addEventListener('click',getInfo)