// ----- functions that change the front-end styling -----

// function that reduces the size of the header once the "submit" button is first clicked
var shrinkHeader = function () {
	// resize the site name and put it in the corner
	$("h1")
		.removeClass("pt-12 text-center text-5xl")
		.addClass("text-2xl text-left");

	// remove the slogan from the page
	$("header").find("p").remove();

	// reduce the height of the header so that it sits at the top of the page
	$("header").addClass("transition-all");
	$("header").removeClass("p-4 pt-40").addClass("p-2");

	// slightly reduce the size of the form elements
	$("form").find("span.p-4").removeClass("p-4").addClass("p-3");
	$("form").find("input.p-2").removeClass("p-2").addClass("p-1 px-2");
	$("form").find("span.p-1").removeClass("p-1");
};

// function that displays the destination image and covid information
var showCOVIDInfo = function () {
	// create a section element to hold the card
	var sectionEL = $("<section>").addClass(
		"m-3 border border-gray-400 rounded-xl shadow-md w-10/12"
	);

	// create an image element to hold the destination image
	var destinationImg = $("<img>")
		.addClass("w-full rounded-t-xl")
		.attr("src", "assets/images/van-img.jpeg");

	// create an element to hold the COVID information
	var COVIDEl = $("<div>").addClass("w-full rounded-b-lg w-10/12");

	// create and append children elements for the COVID information card
	var COVIDTitle = $("<h2>")
		.addClass("pt-2 text-3xl font-semibold text-center text-red-600 bg-red-50")
		.text("COVID-19 Update");

	var location = $("<h3>")
		.addClass(
			"pb-2 text-2xl text-center font-semibold text-gray-700 border-b border-gray-400 bg-red-50"
		)
		.text("Canada");

	var COVIDInfo = $("<div>").addClass("py-2 flex flex-row flex-wrap");

	// new cases
	var newCasesEl = $("<div>").addClass("p-2 text-center w-6/12");

	var newCasesTitle = $("<h4>").addClass("text-red-600").text("New Cases");
	var newCasesVal = $("<p>").addClass("font-semibold text-2xl").text("6,098");

	newCasesEl.append(newCasesTitle, newCasesVal);

	// total cases
	var totalCasesEl = $("<div>").addClass("p-2 text-center w-6/12");

	var totalCasesTitle = $("<h4>").addClass("text-red-600").text("Total Cases");
	var totalCasesVal = $("<p>")
		.addClass("font-semibold text-2xl")
		.text("996,702");

	totalCasesEl.append(totalCasesTitle, totalCasesVal);

	// new vaccinations
	var newVaxEl = $("<div>").addClass("p-2 text-center w-6/12");

	var newVaxTitle = $("<h4>").addClass("text-red-600").text("New Vaccinations");
	var newVaxVal = $("<p>").addClass("font-semibold text-2xl").text("126,257");

	newVaxEl.append(newVaxTitle, newVaxVal);

	// total vaccinations
	var totalVaxEl = $("<div>").addClass("p-2 text-center w-6/12");

	var totalVaxTitle = $("<h4>")
		.addClass("text-red-600")
		.text("Total Vaccinations");
	var totalVaxVal = $("<p>")
		.addClass("font-semibold text-2xl")
		.text("8,468,570");

	totalVaxEl.append(totalVaxTitle, totalVaxVal);

	COVIDInfo.append(newCasesEl, totalCasesEl, newVaxEl, totalVaxEl);

	COVIDEl.append(COVIDTitle, location, COVIDInfo);

	// append image element and COVID info element to the section
	sectionEL.append(destinationImg, COVIDEl);

	// append section to the beginning of the main element
	$("main").prepend(sectionEL);

	COVIDEl.append(COVIDTitle, location, COVIDInfo);

	// append image element and COVID info element to the section
	sectionEL.append(destinationImg, COVIDEl);

	// append section to the beginning of the main element
	$("main").prepend(sectionEL);
};

// function that shows flights matching the criteria
// details argument must include: to/from locations and depart/return date
var showFlights = function (details) {
	// declare array of flight details objects
	var flightsArray = [
		{
			departLeave: "7:00 AM",
			departArrive: "9:00 AM",
			returnLeave: "7:30 AM",
			returnArrive: "3:00 PM",
			price: 470,
		},
		{
			departLeave: "9:00 AM",
			departArrive: "11:00 AM",
			returnLeave: "11:00 AM",
			returnArrive: "6:30 PM",
			price: 500,
		},
		{
			departLeave: "11:00 AM",
			departArrive: "1:00 PM",
			returnLeave: "1:00 PM",
			returnArrive: "8:30 PM",
			price: 350,
		},
	];

	console.log("time to show some flights!");
	// create a section element to hold all of the flight results
	var flightsEl = $("<section>").addClass(
		"m-3 border border-gray-400 rounded-xl shadow-md w-10/12"
	);

	// create a title for the section
	var flightsLocation = $("<h2>")
		.addClass("pt-4 rounded-t-xl text-3xl font-semibold text-center bg-red-100")
		.text("Trips from Toronto to Vancouver");
	var flightsDate = $("<h3>")
		.addClass(
			"pb-4 text-2xl text-center font-semibold text-gray-700 bg-red-100"
		)
		.text("Sun, Apr 18 to Wed, Apr 21");

	// append to the flightsEl
	flightsEl.append(flightsLocation, flightsDate);

	// create a row for each search result (need to decide how many we will show)
	for (trip of flightsArray) {
		// create a div to hold the flight information
		tripEl = $("<div>").addClass(
			"trip py-2 flex flex-row border-t border-gray-400 cursor-pointer hover:bg-gray-100 w-full"
		);

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
			.html(`<p><b>${trip.departLeave}</b> to <b>${trip.departArrive}</b></p>`);
		departDuration = $("<p>")
			.addClass("text-gray-700 w-full")
			.text("5 hr 00 min");

		departTimeEl.append(departTimes, departDuration);

		departEl.append(departIcon, departTimeEl);
		detailsEl.append(departEl);

		// create a div and children for the return flight times
		returnEl = $("<div>").addClass("flex flex-row w-full");
		returnIcon = $("<span>")
			.addClass(
				"p-2 flex flex-col justify-center items-center px-3 text-gray-700 text-sm w-2/12"
			)
			.html("<i class='fas fa-plane-arrival'></i>");
		returnTimeEl = $("<div>").addClass("flex flex-col items-center w-10/12");
		returnTimes = $("<p>")
			.addClass("flex flex-col justify-center w-full")
			.html(`<p><b>${trip.returnLeave}</b> to <b>${trip.returnArrive}</b></p>`);
		returnDuration = $("<p>")
			.addClass("text-gray-700 w-full")
			.text("4 hr 30 min");

		returnTimeEl.append(returnTimes, returnDuration);

		returnEl.append(returnIcon, returnTimeEl);
		detailsEl.append(returnEl);

		// create a div that holds the flight price
		var priceEl = $("<div>")
			.addClass(
				"flex flex-col justify-center items-center font-semibold text-xl text-green-600 w-4/12"
			)
			.text(`CA$${trip.price}`);

		// append the detail and price elements to the trip div
		tripEl.append(detailsEl, priceEl);

		flightsEl.append(tripEl);
	}

	$("main").prepend(flightsEl);

	// add rotated corners to the bottom-most flight information
	$(".trip").last().addClass("rounded-b-xl");
};

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
});
