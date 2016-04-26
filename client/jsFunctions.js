// create single HTML elements and use them within showImage()
var timerInterval;

/**
 * Prepare variables for ajaxRequest()
 * @param  requestType
 * @returns void
 * @author jzarewicz
 */
function prepareRequest(requestType) {

	switch (requestType) {

	case 'jwtRequest':

		var iss = document.getElementsByName("issuer")[0].value.trim(), 
			aud = document.getElementsByName("auditorium")[0].value.trim(), 
			exp = document.getElementsByName("exp")[0].value.trim(),
			res = document.getElementsByName("resource")[0].value.trim(),
			
		script = 'server/jwtRequest.php', 
		vars = "iss=" + iss + "&aud=" + aud + "&exp=" + exp + "&res=" + res;
		
		break;

	case 'resource':

		var script = 'server/resource.php',  
		vars = "jwt=" + localStorage.getItem("jwt");

		break;

	}
	ajaxRequest(script, vars)
}
/**
 * Execute Ajax request with given arguments from prepareRequest() and handle
 * responses accordingly
 * @param {String} script
 * @param {String} vars
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
				localStorage.setItem("jwt", responseJSON.encoded['jwt']);

                //clear previous timer
                clearInterval(timerInterval);
				// Get token exp and pass it to timer()
                timer(responseJSON.decoded['exp']);

				// Put encoded JWT to the appropriate div
				document.getElementsByTagName('textarea')[0].innerHTML = responseJSON.encoded['jwt'];
				// Put decoded JWT to the apropriate div and format in nicely
				document.getElementsByTagName('textarea')[1].innerHTML = JSON.stringify(responseJSON.decoded, undefined, 4);
			}
			// Resource: Incoming base64 is handed to showImage()
			if (script == 'server/resource.php') {
				showImage(hr.responseText)
			}
		}
	};
	// Send the data to PHP script
	hr.send(vars);
}

function showImage(resource) {
    var rsrImg = document.getElementsByTagName('img')[0];

	// reset HTML elements with every call to function
	rsrImg.setAttribute("src", '');

	var src = "data:image;base64," + resource;
	rsrImg.setAttribute('src', src);
    rsrImg.style.visibility = "visible"
}
/**
 * Countdown token life in seconds
 * @param {number} expTime
 */
function timer(expTime) {

	    timerInterval = setInterval(function() {
		var currentTime = new Date().getTime() / 1000,
			timerSpan = document.getElementsByTagName('span')[1];
		timerSpan.innerHTML = 'Token time: ' + (expTime - currentTime).toFixed() + ' seconds';

		// Stop the timer when 0 is reached
		if ((expTime - currentTime).toFixed() <= 0) {
			clearInterval(timerInterval);
			timerSpan.parentNode.removeChild(timerSpan);
		}
	}, 1000);
}
/**
 * Check for errors in response and if so, display error msg from server
 * @param {string} response
 * @returns {boolean}
 */
function checkForErrorInResponse(response) {

    var span = document.getElementsByTagName('span')[0];
	span.innerHTML = '';

	if (response.search("Error") != -1 || response.search("Unexpected") != -1) {
		span.innerHTML = response;
		return false
	}
}