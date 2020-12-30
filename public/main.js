// Foursquare API Info
const clientId = 'DDXYIYBZFFB4QXET1OEHWNV5XVTD1WZBE5GKWKTJIPYV5OJH';
const clientSecret = 
'VK5QVU5LUJXBDQLY10MD10ALHM1XIUDH2U5RIPRPANTC4Z3G';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '4d6264c63bc757d82f350727c13c403e';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const date = new Date();
  const urlToFetch = url + city + '&limit=10&client_id=' + clientId + "&client_secret=" + clientSecret + "&v=" + date.getFullYear() + date.getMonth() + date.getDate();
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse['response']['groups'][0].items.map(item => item.venue);
      // console.log(jsonResponse);
      console.log(venues);
      return venues;
    }
  } catch(e) {
    console.log(e);
  }
}

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = weatherUrl + "?q=" + city + "&APPID=" + openWeatherKey;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(e) {
    console.log(e);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

    let venueContent = '';
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
  let weatherContent = '';
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
  getForecast()
  return false;
}

$submit.click(executeSearch)

const city = $input.val();
const date = new Date();
const urlToFetch = url + city + '&limit=10&client_id=' + clientId + "&client_secret=" + clientSecret + "&v=" + date.getFullYear() + date.getMonth() + date.getDate();

// document.getElementById("main").innerHTML = urlToFetch;


