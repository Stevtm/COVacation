var skyscannerUrl = "";
var vaccovidUrl = "";
var openweatherUrl = "";


// function to get a list of airports at both origin and destination (separate calls for each)
function getPlaces(queryName) {
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/CA/CAD/en-US/?query=${queryName}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
		}
	})
	.then(response => {
		response.json().then(data => {
		console.log(data);
		console.log(data.Places);
		});
	})
	.catch(err => {
		console.error(err);
	});

}

function showFlights() {
	fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/CA/CAD/en-US/YYZ-sky/CLE-sky/anytime?inboundpartialdate=anytime", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
		}
	})
	.then(response => {
		console.log(response);
		response.json().then(data => {
			console.log(data);
		})
	})
	.catch(err => {
		console.error(err);
	});

}


// testing function - currently testing data for YYZ to LAX with return routes
function testFunction() {
	fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/CA/CAD/en-US/YYZ-sky/LAX-sky/2021-05?inboundpartialdate=2021-12", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(response => {
	response.json().then(data => {
		console.log(data);
	});
})
.catch(err => {
	console.error(err);
});
}


function showWeatherInfo(cityName) {
	fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=3e8aa64128a8b382a871af127be1e2d0&units=imperial&exclude=current,minutely,hourly`)
	.then(response => {
		response.json().then(data => {
			console.log(data);

			// use onecall url to fetch local weather report
			// var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&exclude=minutely,hourly,alerts&appid=3e8aa64128a8b382a871af127be1e2d0&units=imperial`;

		})
	})
}



/* shows covid info based on country parameter
	country parameter can be Country name with first letter capitalized (eg, "Canada"), or two-letter country code in lowercase (eg, "ca" for Canada)
*/
function showCovidInfo(countryName) {

	fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
			"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
		}
	})
	.then(response => {
		response.json().then(data => {
			console.log(data);
			var countryExists = false;
			for(let i = 0; i < data.length; i++){
				if ( data[i].Country === countryName || data[i].TwoLetterSymbol === countryName) {
					console.log(`${data[i].Country}		${data[i].TwoLetterSymbol}		${data[i].TotalCases}		${i}`);
					countryExists = true;
				}
			}
			if(countryExists){
				console.log("No errors");
			}
			else {
				console.log("error");
			}
		});
	})
	.catch(err => {
		console.error(err);
	});

}

