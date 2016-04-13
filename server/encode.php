<?php
require_once ( '../config.php' );
require_once (LIBRARY);

use \Firebase\JWT\JWT;

$iss = $_POST['iss'];
$aud = $_POST['aud'];
$exp = $_POST['exp'];

function JWTencode($iss, $aud, $exp = 5) {
	// RS256 ASSYMETRIC
	// private key
	$privKey = file_get_contents ( KEYS.'/privkey.pem' );
	// public key
	$pubKey = file_get_contents ( KEYS.'/pubkey.pem' );

	// HS256 SYMETRIC (HMAC-SHA256)
	// $key = "example_key";

	$token = array (

			"iss" => $iss,
			"aud" => $aud,
			"iat" => time(),
			"exp" => time () + (60*$exp)
	);

	/**
	 * * IMPORTANT:
	 * * You must specify supported algorithms for your application.
	 * See
	 * * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
	 * * for a list of spec-compliant algorithms.
	 */
	$jwt = JWT::encode ( $token, $privKey, 'RS256' );

// 	echo "encoded token:\n";
	print_r ( $jwt );
// 	echo "\n\n";

// 	return $jwt;

}

JWTencode($iss, $aud, $exp);

?>