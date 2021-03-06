<?php
require_once ('../config.php');
require_once (LIBRARY);

use \Firebase\JWT\JWT;

$iss = $_POST ['iss'];
$aud = $_POST ['aud'];
$exp = $_POST ['exp'];
$res = $_POST ['res']; 
/**
 * Encode JWT token with given parameters from POST
 *
 * @param string $iss        	
 * @param string $aud        	
 * @param number $exp        	
 * @return void
 */
function JWTencode($iss, $aud, $exp = 5, $res) {
	
	// RS256 ASSYMETRIC
	// private key
	if(!$privKey = file_get_contents ( KEYS . '/privkey.pem' )){
		echo 'Error: No private key found,did you generate it?';
		return;
	}
	// public key
	if(!$pubKey = file_get_contents ( KEYS . '/pubkey.pem' )){
		echo 'Error: No public key found,did you generate it?';
		return;
	}
	
	// HS256 SYMETRIC (HMAC-SHA256)
	// $key = "example_key";
	
	$token = array (
			
			"iss" => $iss,
			"aud" => $aud,
			"iat" => time (),
			"exp" => time () + (60 * $exp),
			"res" => $res
	);
	
	/**
	 * * IMPORTANT:
	 * * You must specify supported algorithms for your application.
	 * See
	 * * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
	 * * for a list of spec-compliant algorithms.
	 */
	
	// encode parameters given in post
	$encoded = JWT::encode ( $token, $privKey, 'RS256' );
	
	// decode jwt token or throw appropriate error
	try {
		$decoded = JWT::decode ( $encoded, $pubKey, array (
				'RS256' 
		) );
	} catch ( Exception $e ) {
		print_r ( 'Error : ' . $e->getMessage () );
	}
	
	// 	Prepare JSON to echo 
	$jsonArray['encoded'] = $encoded;
	$jsonArray['decoded'] = $decoded;
	echo json_encode ( $jsonArray );
}

JWTencode ( $iss, $aud, $exp, $res );

?>