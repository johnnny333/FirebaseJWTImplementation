// create single HTML elements and use them within showImage()
var img = document.createElement("img"), span = document.createElement("span");

/**
 * Prepare variables for ajaxRequest()
 * 
 * @param string requestType
 * @returns void
 * @author jzarewicz
 */
function prepareRequest(requestType) {

	// get jwt token from local storage
	var jwt = localStorage.getItem("jwt");

	switch (requestType) {

	case 'jwtRequest':

		var iss = document.getElementsByName("issuer")[0].value.trim(), aud = document
				.getElementsByName("auditorium")[0].value.trim(), exp = document
				.getElementsByName("exp")[0].value,

		script = 'server/jwtRequest.php', 
		vars = "iss=" + iss + "&aud=" + aud + "&exp=" + exp;

		break;

	case 'resource':

		var script = 'server/resource.php',  
		vars = "jwt=" + jwt;

		break;

	}
	ajaxRequest(script, vars)
}
/**
 * Execute Ajax request with given arguments from prepareRequest() and handle
 * responses accordigly
 * 
 * @param string script
 * @param number reqNmbr
 * @param string vars
 */
function ajaxRequest(script, vars) {
	// Create our XMLHttpRequest object
	var hr = new XMLHttpRequest();
	hr.open("POST", script, true);
	// Set content type header information for sending url encoded variables in
	// the request
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// Access the onreadystatechange event for the XMLHttpRequest object
	hr.onreadystatechange = function() {
		if (hr.readyState == 4 && hr.status == 200) {

			if (checkForErrorInResponse(hr.responseText) == false) {
				return false
			}

			if (script == 'server/jwtRequest.php') {

				var responseJSON = JSON.parse(hr.responseText);

				// Save encoded token to the local storage
				localStorage.setItem("jwt", responseJSON.encoded['jwt'])

				// Get token exp and pass it to timer()
				 timer(responseJSON.decoded['exp']);

				// Put encoded JWT to the appropriate div
				document.getElementsByTagName('div')[0].innerHTML = responseJSON.encoded['jwt'];
				// Put decoded JWT to the apropriate div
				document.getElementsByTagName('div')[1].innerHTML = JSON
						.stringify(responseJSON.decoded);

			}
			// Resource: Incoming base64 is handed to showImage()
			if (script == 'server/resource.php') {
				showImage(hr.responseText)
			}
		}
	}
	// Send the data to PHP
	hr.send(vars);
}

function showImage(resource) {

	// reset HTML elements with every call to function
	img.setAttribute('src', '');

	var src = "data:image;base64," + resource;
	img.setAttribute('src', src)
	document.body.appendChild(img);
}
/**
 * Countdown token life in seconds
 * @param number expTime
 */
function timer(expTime) {

	var timer = setInterval(function() {
		var currentTime = new Date().getTime() / 1000;
		console.log((expTime - currentTime).toFixed()) // changes type from
														// number to string :/

		// Stop the timer when 0 is reached
		if ((expTime - currentTime).toFixed() <= 0) {
			clearInterval(timer)
		}

	}, 1000);
}
/**
 * Check for errors in response and if so, display error msg from server
 * 
 * @param string response
 * @returns {Boolean}
 */
function checkForErrorInResponse(response) {

	span.innerHTML = '';

	if (response.search("Error") != -1 || response.search("Unexpected") != -1) {
		span.innerHTML = response;
		document.body.appendChild(span);
		return false
	}
}