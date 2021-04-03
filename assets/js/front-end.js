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
	var newCasesVal = $("<p>").addClass("font-semibold text-3xl").text("6,098");

	newCasesEl.append(newCasesTitle, newCasesVal);

	// total cases
	var totalCasesEl = $("<div>").addClass("p-2 text-center w-6/12");

	var totalCasesTitle = $("<h4>").addClass("text-red-600").text("Total Cases");
	var totalCasesVal = $("<p>")
		.addClass("font-semibold text-3xl")
		.text("996,702");

	totalCasesEl.append(totalCasesTitle, totalCasesVal);

	// new vaccinations
	var newVaxEl = $("<div>").addClass("p-2 text-center w-6/12");

	var newVaxTitle = $("<h4>").addClass("text-red-600").text("New Vaccinations");
	var newVaxVal = $("<p>").addClass("font-semibold text-3xl").text("126,257");

	newVaxEl.append(newVaxTitle, newVaxVal);

	// total vaccinations
	var totalVaxEl = $("<div>").addClass("p-2 text-center w-6/12");

	var totalVaxTitle = $("<h4>")
		.addClass("text-red-600")
		.text("Total Vaccinations");
	var totalVaxVal = $("<p>")
		.addClass("font-semibold text-3xl")
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

// ----- event listeners -----

// listen for the click on the search button
$("#search-submit").on("click", function (event) {
	// stop the page from reloading
	event.preventDefault();

	// change the header configuration to the smaller version
	shrinkHeader();

	// display the destination image and covid information
	showCOVIDInfo();
});
