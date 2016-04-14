// create single HTML elements and use them within showImage()
var img = document.createElement("img"), 
	span = document.createElement("span");

/**
 * Prepare variables for ajaxRequest()
 * @param string requestType 
 * @returns void
 * @author jzarewicz
 */
function prepareRequest(requestType) {

	// get jwt token from local storage
	var jwt = localStorage.getItem("jwt");

	switch (requestType) {

	case 'encode':

		var iss = document.getElementsByName("issuer")[0].value.trim(), 
			aud = document.getElementsByName("auditorium")[0].value.trim(), 
			exp = document.getElementsByName("exp")[0].value,

			script = 'server/encode.php', 
			reqNmbr = 0, 
			vars = "iss=" + iss + "&aud=" + aud + "&exp=" + exp;

		break;

	case 'decode':

		var script = 'server/decode.php', 
			reqNmbr = 1, 
			vars = "jwt=" + jwt;

		// Check for jwt in local storage and if not exist, return apropriate message (if expired token exists it will be passed
		if (jwt == null || jwt == "") {
			document.getElementById('error').innerHTML = 'Please encode token first';
			return false
		}
		document.getElementById('error').innerHTML = ''

		break;

	case 'resource':

		var script = 'server/resource.php', 
			reqNmbr = 2, 
			vars = "jwt=" + jwt;

		break;

	}
	ajaxRequest(script, reqNmbr, vars)
}
/**
 * Execute Ajax request with given arguments from prepareRequest()
 * and handle responses accordigly
 * @param string script
 * @param number reqNmbr
 * @param string vars
 */
function ajaxRequest(script, reqNmbr, vars) {
	// Create our XMLHttpRequest object
	var hr = new XMLHttpRequest();	
	hr.open("POST", script, true);
	// Set content type header information for sending url encoded variables in the request
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// Access the onreadystatechange event for the XMLHttpRequest object
	hr.onreadystatechange = function() {
		if (hr.readyState == 4 && hr.status == 200) {
			
			if(checkForErrorInResponse(hr.responseText) == false) {return false};

			if (reqNmbr == 0 || reqNmbr == 1) {

				// If we're encoding token,save it to the local storage
				if (reqNmbr == 0) {
					localStorage.setItem("jwt", hr.responseText)
				}
				
				if (reqNmbr == 1) {
					var tokenTime = JSON.parse(hr.responseText)										
					timer(tokenTime.exp);
					}

				// Append ajax request to the appropriate div
				document.getElementsByTagName('div')[reqNmbr].innerHTML = hr.responseText;

			}
			//Resource: Incoming base64 is handed to showImage()
			if (reqNmbr == 2) {
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
function timer(expTime){
		
	var timer = setInterval(function(){ 
		var currentTime = new Date().getTime() / 1000;
		console.log((expTime - currentTime).toFixed()) //changes type from number to string :/
		
		//Stop the timer when 0 is reached
		if((expTime - currentTime).toFixed() <= 0){clearInterval(timer)}
		
	},1000);
}
/**
 * Check for errors in response and if so, display error msg from server
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