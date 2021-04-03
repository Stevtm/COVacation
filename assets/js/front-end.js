// ----- functions that change the front-end styling -----

// function that reduces the size of the header once the "submit" button is first clicked
var shrinkHeader = function () {
	console.log("time to shrink the header!");

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
var showCOVIDInfo = function () {};

// ----- event listeners -----

// listen for the click on the search button
$("#search-submit").on("click", function (event) {
	// stop the page from reloading
	event.preventDefault();

	// change the header configuration to the smaller version
	shrinkHeader();

	// display the destination image and covid information
});
