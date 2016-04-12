<html>
<head>
<script type="text/javascript" src="jsFunctions.js"></script>
</head>
<body>

	<!-- Form to specify JWT payload -->
	Issuer:
	<br>
	<input type="text" name="issuer" value="issuer">
	<br> Auditorium:
	<br>
	<input type="text" name="auditorium" value="auditorium">
	<br> Token Time:
	<br>
	<input type="number" name="exp" min="1" max="5" value="1">Minute(s)
	<br>
	<br>
	<input type="button" value='Get JWT Token' onclick="prepareRequest('encode')">

	<!-- TextArea to display encoded JWT -->
	<div style="border: 2px solid #73AD21; width: auto; height: 90px; resize: both; overflow: auto;"></div>

	<!-- Button to decode given JWT token -->
	<input type="button" value='Decode JWT Token' onclick="prepareRequest('decode')">
	<span id='error'></span>

	<!-- TextArea to display decoded JWT -->
	<div style="border: 2px solid #73AD21; width: auto; height: 90px; resize: both; overflow: auto;"></div>

	<input type="button" value='Show Resource' onclick="prepareRequest('resource')">

</body>
</html>

