var skyscannerUrl = "";
var vaccovidUrl = "";
var openweatherUrl = "";


// function to get a list of airports at both origin and destination (two separate calls for each)
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