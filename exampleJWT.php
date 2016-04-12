<?php
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;


	// RS256 ASSYMETRIC
	// private key
	$privKey = file_get_contents ( 'keys/privkey.pem' );
	// public key
	$pubKey = file_get_contents ( 'keys/pubkey.pem' );
	
	// HS256 SYMETRIC (HMAC-SHA256)
	// $key = "example_key";
	
	$token = array (
			"iss" => "http://example.org",
			"aud" => "http://example.com",
			"iat" => 1356999524,
			"nbf" => 1357000000 
	);
	
	/**
	 * * IMPORTANT:
	 * * You must specify supported algorithms for your application.
	 * See
	 * * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
	 * * for a list of spec-compliant algorithms.
	 */
	$jwt = JWT::encode ( $token, $privKey, 'RS256' );
	
	echo "encoded token:\n";
	print_r ( $jwt );
	echo "\n\n";
	

$decoded = JWT::decode ( $jwt, $pubKey, array (
		'RS256' 
) );

echo "decoded object (not array):\n";
print_r ( $decoded );

/*
 * NOTE: This will now be an object instead of an associative array. To get
 * an associative array, you will need to cast it as such:
 */

$decoded_array = ( array ) $decoded;

/**
 * * You can add a leeway to account for when there is a clock skew times between
 * * the signing and verifying servers.
 * It is recommended that this leeway should
 * * not be bigger than a few minutes.
 * *
 * * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
 */
JWT::$leeway = 60; // $leeway in seconds
$decoded = JWT::decode ( $jwt, $pubKey, array (
		'RS256' 
) );
?>
