
const weatherLogSchema = {
  temperature: [{
    temperature: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  humidity: [{
    humidity: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  precipitation: [{
    precipitation: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  windSpeed: [{
    wind_speed: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  actualHumidity: 0,
  actualRegisterHour: {day: '', time: ''},
  actualTemperature: 0
}


export default weatherLogSchema