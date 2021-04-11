var searchHistory = [];
$(document).ready(() => {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (!searchHistory) {
    searchHistory = [];
  }
});

var flightInfoArray = [];

// // function to get a list of airports at both origin and destination (separate calls for each)
function showFlightInfo(searchOrigin, searchDestination) {
  var departFrom = $("#depart-from").val().trim();
  var arriveTo = $("#arrive-to").val().trim();
  var departDate = $("#depart-date").val().trim();
  var returnDate = $("#return-date").val().trim();

  console.log(departDate + "			" + returnDate);

  var departureMonth = moment(departDate).format("YYYY-MM");
  var returnMonth = moment(returnDate).format("YYYY-MM");

  $("#display-flight-dates").text(
    `${moment(departureMonth).format("MMM YYYY")} to ${moment(
      returnMonth
    ).format("MMM YYYY")}`
  );
  // dates must be in YYYY-MM-DD format.

  var searchObj = {
    origin: departFrom,
    destination: arriveTo,
  };

  searchHistory.push(searchObj);

  // storing search history in localStorage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

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
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/CA/CAD/en-US/${departurePlace}/${arrivalPlace}/${departureMonth}?inboundpartialdate=${returnMonth}`,
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

                    var indexLength = 0;
                    if (data.Quotes.length < 5) {
                      indexLength = data.Quotes.length;
                      console.log(`Index Length is ${indexLength}`);
                      console.log(data.Quotes.length);
                    } else if (data.Quotes.length >= 5) {
                      indexLength = 5;
                      console.log(`Index Length is ${indexLength}`);
                      console.log(data.Quotes.length);
                    }

                    $("#trips-heading").text(
                      `Trips from ${departFrom} to ${arriveTo}`
                    );

                    var carriers = data.Carriers;
                    console.log(carriers);

                    for (let a = 0; a < indexLength; a++) {
                      var departTimeVal =
                        data.Quotes[a].OutboundLeg.DepartureDate;
                      var separatedTime = departTimeVal.split("T");

                      var flightInfoObj = {
                        flightDate: separatedTime[0],
                        flightCarrierID:
                          data.Quotes[a].OutboundLeg.CarrierIds[0],
                        flightOriginPlace: data.Places[1].Name,
                        flightOriginStation: departurePlace,
                        flightDestinationPlace: data.Places[0].Name,
                        flightDestinationStation: arrivalPlace,
                        flightPrice: data.Quotes[a].MinPrice,
                        flightCurrency: data.Currencies[0].Symbol,
                        flightIsDirect: data.Quotes[a].Direct,
                      };

                      flightInfoArray.push(flightInfoObj);
                    }

                    for (let b = 0; b < flightInfoArray.length; b++) {
                      $(`#departTime${b}`).html(
                        `<p><b>${moment(flightInfoArray[b].flightDate).format(
                          "DD MMM, YYYY"
                        )}</b></p>`
                      );
                      $(`#price${b}`).text(
                        `${flightInfoArray[b].flightCurrency}${flightInfoArray[b].flightPrice}`
                      );

                      if (flightInfoArray[b].flightIsDirect) {
                        $(`#departDirect${b}`).text("Direct Flight");
                      } else {
                        $(`#departDirect${b}`).text("Non-Direct Flight");
                      }
                    }

                    console.log(flightInfoArray);

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

                              $("#covidEl-destination-country").text(
                                covidData[0].Country
                              );
                              $("#covidEl-new-cases").text(
                                covidData[0].NewCases
                              );
                              $("#covidEl-total-cases").text(
                                covidData[0].TotalCases
                              );
                              $("#covidEl-active-cases").text(
                                covidData[0].ActiveCases
                              );
                              $("#covidEl-recovery-proportion").text(
                                covidData[0].Recovery_Proporation + "%"
                              );

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

$("#search-submit").on("click", showFlightInfo);

/*
	Test Browse Dates Inbound api url
*/
