$("#search-submit").on("click", showFlightInfo);

// // function to get a list of airports at both origin and destination (separate calls for each)

function showFlightInfo() {
	var departFrom = $("#depart-from").val().trim();
	var arriveTo = $("#arrive-to").val().trim();
	var departDate = $("#depart-date").val().trim();
	var returnDate = $("#return-date").val().trim();

	console.log(departDate + "			" + returnDate);
	// dates must be in YYYY-MM-DD format.

	fetch(
		`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/CA/CAD/en-US/?query=${departFrom}`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-key": "e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
				"x-rapidapi-host":
					"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			},
		}
	)
		.then((response) => {
			response.json().then((data) => {
				// get departure airport name
				var departurePlace = data.Places[1].PlaceId;

				fetch(
					`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/CA/CAD/en-US/?query=${arriveTo}`,
					{
						method: "GET",
						headers: {
							"x-rapidapi-key":
								"e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
							"x-rapidapi-host":
								"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
						},
					}
				)
					.then((response) => {
						response.json().then((data) => {
							// get arrival airport name
							var arrivalPlace = data.Places[1].PlaceId;

							console.log(
								`Departure from ${departurePlace}; Arrival at ${arrivalPlace}`
							);

							// get flight quotes
							fetch(
								`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/CA/CAD/en-US/${departurePlace}/${arrivalPlace}/${departDate}?inboundpartialdate=${returnDate}`,
								{
									method: "GET",
									headers: {
										"x-rapidapi-key":
											"e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
										"x-rapidapi-host":
											"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
									},
								}
							)
								.then((response) => {
									response.json().then((data) => {
										// flight quote data
										console.log(data);
										var flightCarrier = data.Carriers[0].Name; // flight carrier name
										var currencyCode = data.Currencies[0].Code; // currency code, API is currently set to CAD
										var departureAirportName = data.Places[1].Name; // airport name for departure, example YYZ-sky for Toronto
										var arrivalAirportName = data.Places[0].Name; // arrival airport name
										var flightQuotePrice = data.Quotes[0].MinPrice; // quote price for flight

										// output from above fetch requests
										console.log(
											`Flight Carrier: ${flightCarrier}  Departure: ${departureAirportName}  Arrival: ${arrivalAirportName}  Quote: $${flightQuotePrice} ${currencyCode}`
										);

										// fetch requests for covid and temperature info at destination
										fetch(
											`https://api.opencagedata.com/geocode/v1/json?key=bf9cc7921eff4de78bd861e487142a0a&pretty=1&q=${arriveTo}&no_annotations=1`
										).then((response) => {
											if (response.ok) {
												response.json().then((data) => {
													console.log(data); // data from opencage api

													var cityLat = data.results[0].geometry.lat;
													var cityLon = data.results[0].geometry.lng;
													var searchCountry =
														data.results[0].components.country;
													var threeLetterSymbol = data.results[0].components[
														"ISO_3166-1_alpha-3"
													].toLowerCase();
													console.log(
														`Destination: ${searchCountry}, ThreeLetterSymbol: ${threeLetterSymbol}, Latitude: ${cityLat}, Longitude: ${cityLon}`
													);

													if (searchCountry === "United States") {
														searchCountry = "USA";
													}

													// fetch covid info
													fetch(
														`https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${searchCountry}/${threeLetterSymbol}`,
														{
															method: "GET",
															headers: {
																"x-rapidapi-key":
																	"e94756adcfmsh4384f35646a8fc5p17f530jsn906fc3f8b7a4",
																"x-rapidapi-host":
																	"vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
															},
														}
													).then((response) => {
														response.json().then((covidData) => {
															console.log(covidData[0]); // get covid data from this object
															console.log(
																`New Cases: ${covidData[0].NewCases}	Total Cases: ${covidData[0].TotalCases}		Active cases: ${covidData[0].ActiveCases}		Recovery Proportion: ${covidData[0].Recovery_Proporation}%`
															);

															$("#covidEl-new-cases").text(covidData[0].NewCases);
															$("#covidEl-total-cases").text(covidData[0].TotalCases);
															$("#covidEl-active-cases").text(covidData[0].ActiveCases);
															$("#covidEl-recovery-proportion").text(covidData[0].Recovery_Proporation);

															fetch(
																`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&appid=3e8aa64128a8b382a871af127be1e2d0&units=imperial`
															).then((response) => {
																response.json().then((weatherData) => {
																	console.log(weatherData);
																	console.log(
																		`Current Temperature: ${weatherData.current.temp} F`
																	);
																});
															});
														});
													});
												});
											} else {
												console.log("Error with response"); // add modal here for showing response on screen.
											}
										});
									});
								})
								.catch((err) => {
									console.error(err);
								});
						});
					})
					.catch((err) => {
						console.error(err);
					});
			});
		})
		.catch((err) => {
			console.error(err);
		});
}