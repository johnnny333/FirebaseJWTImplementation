function prepareRequest(requestType) {

	// get jwt token from local storage
	var jwt = localStorage.getItem("jwt");

	switch (requestType) {

	case 'encode':

		var iss = document.getElementsByName("issuer")[0].value.trim(), aud = document
				.getElementsByName("auditorium")[0].value.trim(), exp = document
				.getElementsByName("exp")[0].value,

		script = 'server/encode.php', reqNmbr = 0, vars = "iss=" + iss
				+ "&aud=" + aud + "&exp=" + exp;

		break;

	case 'decode':

		var script = 'server/decode.php', reqNmbr = 1, vars = "jwt=" + jwt;

		// Check for jwt in local storage and if not exist, return apropriate
		// message
		if (jwt == null || jwt == "") {
			document.getElementById('error').innerHTML = 'Please encode token first';
			return false
		}
		document.getElementById('error').innerHTML = ''

		break;

	case 'resource':

		var script = 'server/resource.php', reqNmbr = 2, vars = "jwt=" + jwt;

		break;

	}
	ajaxRequest(script, reqNmbr, vars)
}

function ajaxRequest(script, reqNmbr, vars) {
	// Create our XMLHttpRequest object
	var hr = new XMLHttpRequest();
	// Create some variables we need to send to our PHP file

	hr.open("POST", script, true);
	// Set content type header information for sending url encoded variables in
	// the request
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// Access the onreadystatechange event for the XMLHttpRequest object
	hr.onreadystatechange = function() {
		if (hr.readyState == 4 && hr.status == 200) {

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

			if (reqNmbr == 2) {
				showImage(hr.responseText)
			}

		}
	}
	// Send the data to PHP now... and wait for response to update the status
	// div
	hr.send(vars); // Actually execute the request
}

// create single HTML elements and use the within a showImage()
var img = document.createElement("img"), span = document.createElement("span");

function showImage(resource) {

	// reset HTML elements with every call to function
	span.innerHTML = '';
	img.setAttribute('src', '');

	// Chech if resource contains Error msg
	if (resource.search("Error") != -1) {

		span.innerHTML = resource;
		document.body.appendChild(span);
		return false
		console.log('hi');

	}
	;

	var src = "data:image;base64," + resource;

	img.setAttribute('src', src)
	document.body.appendChild(img);
}

function timer(expTime){
	
	var currentTime = new Date().getTime() / 1000;
	console.log(expTime - currentTime);
	
}
