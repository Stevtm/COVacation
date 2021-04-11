// ----- array containing flight information (this will come from the APIs) -----
var flightsArray = [
  {
    departAirline: "Air Canada",
    departLeave: "7:00 AM",
    departArrive: "9:00 AM",
    departAirport: "YYZ",
    returnAirline: "Air Canada",
    returnLeave: "7:30 AM",
    returnArrive: "3:00 PM",
    returnAirport: "YVR",
    price: 470,
  },
  {
    departAirline: "West Jet",
    departLeave: "9:00 AM",
    departArrive: "11:00 AM",
    departAirport: "YYZ",
    returnAirline: "Air Canada",
    returnLeave: "11:00 AM",
    returnArrive: "6:30 PM",
    returnAirport: "YVR",
    price: 500,
  },
  {
    departAirline: "Air Canada",
    departLeave: "11:00 AM",
    departArrive: "1:00 PM",
    departAirport: "YYZ",
    returnAirline: "Air Canada",
    returnLeave: "1:00 PM",
    returnArrive: "8:30 PM",
    returnAirport: "YVR",
    price: 350,
  },
  {
    departAirline: "Air Canada",
    departLeave: "11:00 AM",
    departArrive: "1:00 PM",
    departAirport: "YYZ",
    returnAirline: "Air Canada",
    returnLeave: "1:00 PM",
    returnArrive: "8:30 PM",
    returnAirport: "YVR",
    price: 350,
  },
  {
    departAirline: "West Jet",
    departLeave: "9:00 AM",
    departArrive: "11:00 AM",
    departAirport: "YYZ",
    returnAirline: "Air Canada",
    returnLeave: "11:00 AM",
    returnArrive: "6:30 PM",
    returnAirport: "YVR",
    price: 500,
  },
];

// create a div to hold both the trip list card and the details card
var tripListDetailsEl = $("<div>").addClass(
  "flex flex-col items-center w-full md:flex-row md:justify-center md:items-start"
);

$("input#depart-date").datepicker({ minDate: 0, dateFormat: "yy-mm-dd" });
$("input#return-date").datepicker({ minDate: 0, dateFormat: "yy-mm-dd" });

// ----- functions that change the front-end styling -----

// function that reduces the size of the header once the "submit" button is first clicked
var shrinkHeader = function () {
  // resize the site name and put it in the corner
  // $("h1")
  // 	.removeClass("pt-12 text-center text-5xl")
  // 	.addClass("text-2xl text-left");

  // // remove the slogan from the page
  // $("header").find("p").remove();

  // reduce the height of the header so that it sits at the top of the page
  $("header").addClass("transition-all");
  $("header").removeClass("p-4 pt-40").addClass("p-2");

  // slightly reduce the size of the form elements
  // form itself
  $("form").removeClass("py-4").addClass("py-2 lg:flex-row");
  // icon
  $("form").find("span.p-4").removeClass("p-4").addClass("p-3");
  // date input
  $("form").find("input.p-2").removeClass("p-2").addClass("p-1 px-2");
  // date input header
  $("form").find("span.p-1").removeClass("p-1");
  // button
  $("form")
    .find("input.cursor-pointer")
    .removeClass("mt-4")
    .addClass("mt-1 lg:ml-6");
};

// function that displays the destination image and covid information
var showCOVIDInfo = function () {
  // remove existing COVID section, if it already exists
  if ($(".COVID")) {
    $(".COVID").remove();
  }

  // create a section element to hold the card
  var sectionEL = $("<section>").addClass(
    "COVID m-3 flex flex-col border border-gray-400 rounded-xl shadow-md w-10/12 md:flex-row md:w-11/12"
  );

  // create an image element to hold the destination country image
  var countryImg = $("<div>")
    .addClass(
      "w-full h-40 bg-cover bg-center rounded-t-xl md:rounded-l-xl md:rounded-r-none md:h-64 md:border-r md:border-gray-400"
    )
    .css("background-image", "url(assets/images/canada-img.jpeg)");

  // create an element to hold the COVID information
  var COVIDEl = $("<div>").addClass(
    "w-full rounded-b-lg w-10/12 md:rounded-tr-xl"
  );

  // create and append children elements for the COVID information card
  var COVIDTitle = $("<h2>")
    .addClass(
      "pt-2 text-3xl font-semibold text-center text-red-600 bg-red-50 md:rounded-tr-xl"
    )
    .text("COVID-19 Update");

  // changing this to show Destination country dynamically
  // var location = $("<h3>")
  // 	.addClass(
  // 		"pb-2 text-2xl text-center font-semibold text-gray-700 border-b border-gray-400 bg-red-50"
  // 	)
  // 	.text("Canada");
  var location = $("<h3>")
    .addClass(
      "pb-2 text-2xl text-center font-semibold text-gray-700 border-b border-gray-400 bg-red-50"
    )
    .attr("id", "covidEl-destination-country");

  var COVIDInfo = $("<div>").addClass("py-2 flex flex-row flex-wrap");

  // new cases
  var newCasesEl = $("<div>").addClass("p-2 text-center w-6/12");

  var newCasesTitle = $("<h4>").addClass("text-red-600").text("New Cases");

  // changing to dynamic value
  // var newCasesVal = $("<p>").addClass("font-semibold text-2xl").text("6,098");
  var newCasesVal = $("<p>")
    .addClass("font-semibold text-2xl")
    .attr("id", "covidEl-new-cases");

  newCasesEl.append(newCasesTitle, newCasesVal);

  // total cases
  var totalCasesEl = $("<div>").addClass("p-2 text-center w-6/12");

  var totalCasesTitle = $("<h4>").addClass("text-red-600").text("Total Cases");

  // changing to dynamic
  // var totalCasesVal = $("<p>")
  // 	.addClass("font-semibold text-2xl")
  // 	.text("996,702");

  var totalCasesVal = $("<p>")
    .addClass("font-semibold text-2xl")
    .attr("id", "covidEl-total-cases");

  totalCasesEl.append(totalCasesTitle, totalCasesVal);

  // new vaccinations
  var newVaxEl = $("<div>").addClass("p-2 text-center w-6/12");

  var newVaxTitle = $("<h4>").addClass("text-red-600").text("Active Cases");
  var newVaxVal = $("<p>")
    .addClass("font-semibold text-2xl")
    .attr("id", "covidEl-active-cases");

  newVaxEl.append(newVaxTitle, newVaxVal);

  // total vaccinations
  var totalVaxEl = $("<div>").addClass("p-2 text-center w-6/12");

  var totalVaxTitle = $("<h4>")
    .addClass("text-red-600")
    .text("Recovery Proportion");
  var totalVaxVal = $("<p>")
    .addClass("font-semibold text-2xl")
    .attr("id", "covidEl-recovery-proportion");

  totalVaxEl.append(totalVaxTitle, totalVaxVal);

  COVIDInfo.append(newCasesEl, totalCasesEl, newVaxEl, totalVaxEl);

  COVIDEl.append(COVIDTitle, location, COVIDInfo);

  // append image element and COVID info element to the section
  sectionEL.append(countryImg, COVIDEl);

  // append section to the beginning of the main element
  $(".previous").before(sectionEL);
};

// function that shows flights matching the criteria
var showFlights = function () {
  // remove existing flights list section, if it already exists
  if ($(".flights")) {
    $(".flights").remove();
  }

  // create a section element to hold all of the flight results
  var flightsEl = $("<section>").addClass(
    "flights m-3 border border-gray-400 rounded-xl shadow-md w-10/12 md:w-5/12"
  );

  // create a title for the section
  var flightsLocation = $("<h2>")
    .addClass(
      "pt-4 rounded-t-xl text-3xl font-semibold text-center bg-gray-200"
    )
    // .text("Trips from Toronto to Vancouver")
    .attr("id", "trips-heading");
  var flightsDate = $("<h3>")
    .addClass(
      "pb-4 text-2xl text-center font-semibold text-gray-700 bg-gray-200"
    )
    // .text("Sun, Apr 18 to Wed, Apr 21")
    .attr("id", "display-flight-dates");

  // append to the flightsEl
  flightsEl.append(flightsLocation, flightsDate);

  // create a row for each search result (need to decide how many we will show) - i is the counter
  // var i = -1;
  for (let i = 0; i < 5; i++) {
    // increase the counter
    // i++;

    // create a div to hold the flight information - i is saved as identifier
    tripEl = $("<div>")
      .addClass(
        "trip py-2 flex flex-row border-t border-gray-400 cursor-pointer hover:bg-gray-100 w-full"
      )
      .attr("id", i);

    detailsEl = $("<div>").addClass("flex flex-col w-8/12");

    // create a div and children for the departure flight times

    departEl = $("<div>").addClass("flex flex-row w-full");
    departIcon = $("<span>")
      .addClass(
        "p-3 flex flex-col justify-center items-center text-gray-700 text-sm w-2/12"
      )
      .html("<i class='fas fa-plane-departure'></i>");
    departTimeEl = $("<div>").addClass("flex flex-col items-center w-10/12");
    departTimes = $("<p>")
      .addClass("flex flex-col justify-center w-full")
      // .html(`<p><b>${trip.departLeave}</b> to <b>${trip.departArrive}</b></p>`);
      .attr("id", `departTime${i}`);
    departDirect = $("<p>")
      .addClass("text-gray-700 w-full")
      .attr("id", `departDirect${i}`);

    departTimeEl.append(departTimes, departDirect);

    departEl.append(departIcon, departTimeEl);
    detailsEl.append(departEl);

    // create a div and children for the return flight times

    // returnEl = $("<div>").addClass("flex flex-row w-full");
    // returnIcon = $("<span>")
    // 	.addClass(
    // 		"p-2 flex flex-col justify-center items-center px-3 text-gray-700 text-sm w-2/12"
    // 	)
    // 	.html("<i class='fas fa-plane-departure fa-flip-horizontal'></i>");
    // returnTimeEl = $("<div>").addClass("flex flex-col items-center w-10/12");
    // returnTimes = $("<p>")
    // 	.addClass("flex flex-col justify-center w-full")
    // 	.html(`<p><b>${trip.returnLeave}</b> to <b>${trip.returnArrive}</b></p>`);
    // returnDuration = $("<p>")
    // 	.addClass("text-gray-700 w-full")
    // 	.text("4 hr 30 min");

    // returnTimeEl.append(returnTimes, returnDuration);

    // returnEl.append(returnIcon, returnTimeEl);
    // detailsEl.append(returnEl);

    // create a div that holds the flight price
    var priceEl = $("<div>")
      .addClass(
        "flex flex-col justify-center items-center font-semibold text-xl text-green-600 w-4/12"
      )
      // .text(`CA$${trip.price}`);
      .attr("id", `price${i}`);

    // append the detail and price elements to the trip div
    tripEl.append(detailsEl, priceEl);

    flightsEl.append(tripEl);
  }

  tripListDetailsEl.append(flightsEl);
};

// function that shows the detailed information for the first flight element
var showDetails = function (id) {
  // remove existing flights list section, if it already exists
  if ($(".details")) {
    $(".details").remove();
  }

  // remove highlight from previous elements
  $(".flights")
    .find(".trip")
    .removeClass("bg-red-100")
    .addClass("hover:bg-gray-100");

  // highlight the clicked element in red
  $(`[id="${id}"]`).removeClass("hover:bg-gray-100").addClass("bg-red-100");

  // create a section element to hold the detailed flight information
  var detailedEl = $("<section>").addClass(
    "details pb-2 m-3 flex flex-col border border-gray-400 rounded-xl shadow-md w-10/12 md:w-5/12"
  );

  // create a img element for the picture of the location
  var destinationImg = $("<div>")
    .addClass("w-full h-44 bg-cover bg-center rounded-t-xl lg:h-36")
    .css("background-image", "url(assets/images/van-img.jpeg)");

  // create a div to hold departure and return flight details
  var departReturnEl = $("<div>").addClass("flex flex-col w-full");

  // create a departure flight div and corresponding children
  var departureEl = $("<div>").addClass(
    "border-gray-400 flex flex-col items-center w-full"
  );

  // start fixing this
  var departureTitle = $("<h3>")
    .addClass(
      "py-3 border-b border-t border-gray-400 text-lg text-center font-semibold bg-red-100 w-full"
    )
    // .html(
    //   "<i class='fas fa-plane-departure'></i>&nbsp DEPARTING FLIGHT - Apr 18"
    // )
    .attr("id", "departureTitle");

  var departureAirline = $("<h4>")
    .addClass("pt-3 text-xl")
    // .text(`${flightsArray[id].departAirline}`)
    .attr("id", "departureAirline");

  var departureDetails = $("<div>").addClass(
    "mb-5 px-4 w-10/12 flex flex-col border-l-2 border-dashed border-black"
  );

  //   var departureLeaveTime = $("<div>")
  //     .addClass("text-lg font-semibold")
  //     .text(`${flightsArray[id].departLeave}`);

  var departureLeaveAirport = $("<div>")
    // .addClass("text-md")
    .addClass("text-lg font-semibold")
    // .text(`${flightsArray[id].departAirport}`)
    .attr("id", "departureLeaveAirport");

  var departureLeaveStation = $("<div>")
    .addClass("text-md")
    .attr("id", "departureLeaveStation");

  var spacer = $("<div>").html(`|`);

  //   var travelTime = $("<div>")
  //     .addClass("py-2 text-md text-gray-700")
  //     .text("Travel time: 5 hr 00 min");

  //   var departureArriveTime = $("<div>")
  //     .addClass("text-lg font-semibold")
  //     .text(`${flightsArray[id].departArrive}`);

  var departureArriveAirport = $("<div>")
    // .addClass("text-md")
    .addClass("text-lg font-semibold")
    // .text(`${flightsArray[id].returnAirport}`)
    .attr("id", "departureArriveAirport");

  var departureArriveStation = $("<div>")
    .addClass("text-md")
    .attr("id", "departureArriveStation");

  departureDetails.append(
    // departureLeaveTime,
    departureLeaveAirport,
    departureLeaveStation,
    spacer,
    // travelTime,
    // departureArriveTime,
    departureArriveAirport,
    departureArriveStation
  );

  departureEl.append(departureTitle, departureAirline, departureDetails);

  // create a return flight div and corresponding children
  //   var returnEl = $("<div>").addClass(
  //     "border-gray-400 flex flex-col items-center w-full"
  //   );

  //   var returnTitle = $("<h3>")
  //     .addClass(
  //       "py-3 border-b border-t border-gray-400 text-lg text-center font-semibold bg-red-100 w-full"
  //     )
  //     .html(
  //       `<i class='fas fa-plane-departure fa-flip-horizontal'></i>&nbsp RETURNING FLIGHT - Apr 21`
  //     );

  //   var returnAirline = $("<h4>")
  //     .addClass("pt-3 text-xl")
  //     .text(`${flightsArray[id].returnAirline}`);

  //   var returnDetails = $("<div>").addClass(
  //     "mb-5 px-4 w-10/12 flex flex-col border-l-2 border-dashed border-black"
  //   );

  //   var returnLeaveTime = $("<div>")
  //     .addClass("text-lg font-semibold")
  //     .text(`${flightsArray[id].returnLeave}`);

  //   var returnLeaveAirport = $("<div>")
  //     .addClass("text-md")
  //     .text(`${flightsArray[id].returnAirport}`);

  //   var returnTravelTime = $("<div>")
  //     .addClass("py-2 text-md text-gray-700")
  //     .text("Travel time: 4 hr 30 min");

  //   var returnArriveTime = $("<div>")
  //     .addClass("text-lg font-semibold")
  //     .text(`${flightsArray[id].returnArrive}`);

  //   var returnArriveAirport = $("<div>")
  //     .addClass("text-md")
  //     .text(`${flightsArray[id].departAirport}`);

  //   returnDetails.append(
  //     returnLeaveTime,
  //     returnLeaveAirport,
  //     returnTravelTime,
  //     returnArriveTime,
  //     returnArriveAirport
  //   );

  //   returnEl.append(returnTitle, returnAirline, returnDetails);

  // append departure and return divs
  //   departReturnEl.append(departureEl, returnEl);
  departReturnEl.append(departureEl);

  // append image and details to the section element
  detailedEl.append(destinationImg, departReturnEl);

  tripListDetailsEl.append(detailedEl);

  // prepend section element to the main element
  $(".previous").before(tripListDetailsEl);
};

function showSearchHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

  if (!searchHistory) {
    console.log("No search history found");
    return;
  }

  $(".previous").removeClass("hidden");

  for (let k = 0; k < searchHistory.length; k++) {
    var divContainer = $("<div>").addClass(
      "m-2 border border-gray-400 rounded-xl shadow-md bg-red-300 hover:bg-red-400 w-full cursor-pointer sm:w-5/12 lg:w-3/12"
    );
    var headerEl = $("<h3>")
      .addClass("py-2 text-lg text-center border-b border-gray-400")
      .html(
        `${searchHistory[k].origin} <i class="fas fa-arrow-right"></i> ${searchHistory[k].destination}`
      );

    divContainer.append(headerEl);
    $(".previous").append(divContainer);
  }
}

// ----- event listeners -----

// listen for the click on the search button
$("#search-submit").on("click", function (event) {
  // stop the page from reloading
  event.preventDefault();

  // change the header configuration to the smaller version
  shrinkHeader();

  // display the destination image and covid information
  showCOVIDInfo();

  // show flight results based on the search criteria
  showFlights();

  // show detailed flight results for the first flight option
  showDetails();

  // highlight the first flight option (the detailed information for this flight will be shown at load)
  $(".trip").first().removeClass("hover:bg-gray-100").addClass("bg-red-100");

  // listen for the click on one of the flight options once they are rendered
  $(".trip").click(function () {
    // get the corresponding id from the clicked flight
    var id = $(this).attr("id");

    //   console.log($(this).children(".text-green-600").text());
    // populate the detailed information div with the information from the corresponding flight
    // showDetails(id);

    $(".flights")
      .find(".trip")
      .removeClass("bg-red-100")
      .addClass("hover:bg-gray-100");

    // highlight the clicked element in red
    $(`[id="${id}"]`).removeClass("hover:bg-gray-100").addClass("bg-red-100");

    $("#departureTitle").html(
      `<i class='fas fa-plane-departure'></i>&nbsp DEPARTING FLIGHT - ${moment(
        flightInfoArray[id].flightDate
      ).format("MMM DD")}`
    );

    $("#departureAirline").text(flightInfoArray[id].flightCarrierID);
    $("#departureLeaveAirport").text(flightInfoArray[id].flightOriginPlace);
    $("#departureLeaveStation").text(flightInfoArray[id].flightOriginStation);
    $("#departureArriveAirport").text(
      flightInfoArray[id].flightDestinationPlace
    );
    $("#departureArriveStation").text(
      flightInfoArray[id].flightDestinationStation
    );
  });
});

$(document).ready(showSearchHistory);
