import axios from 'axios';
import { useEffect, useState} from 'react';

const Weather = () => {
    
    const [ weather, setWeather] = useState({})
   

   useEffect(()=>{
     
     
     function success(pos) {
       var crd = pos.coords;
     
       console.log('Your current position is:');
       console.log('Latitude : ' + crd.latitude);
       console.log('Longitude: ' + crd.longitude);
       console.log('More or less ' + crd.accuracy + ' meters.');
       axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=3d93c3390db49336f8981a13ef14a0e5`)
       .then(res => setWeather(res.data))
     };
     
     function error(err) {
       console.log("User not data position");
     };
     
     navigator.geolocation.getCurrentPosition(success, error)
    
   },[])
   console.log(weather)

   const [isTemp, setIsTemp] = useState(true);
   const changeTemp = () => setIsTemp(!isTemp);

   
   
 return (
     <div className='ctn__wheater' style={{color:"https://picsum.photos/1080/300"}}>
        <h1>Wheater App</h1>
       <div className='card__info1'>
           
            <h3>{weather.name}, {weather.sys?.country} </h3>
            <p>
            {isTemp ? `${weather.main?.temp} °K` : `${weather.main?.temp -273} °C`}
            </p>
             <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt=""/>
       </div>

          <div className='list__wheater'>
             <h3>{weather.weather?.[0].description}</h3>
             <p><b>Wind speed</b><h3>{weather.wind?.speed} </h3></p>
             <p><b>Cloud</b><h3>{weather.clouds?.all}%</h3></p>
             <p><b>Pressure</b><h3>{weather.main?.pressure} </h3></p>
             <button onClick={changeTemp}>Degrees °k/°C</button>
         
         </div>     
       
     </div>
 );
};
 

   

  
export default Weather;