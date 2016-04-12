<?php
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = $_POST ['jwt'];

function JWTencode($jwt) {
	$pubKey = file_get_contents ( 'keys/pubkey.pem' );
	
	try {
		
		$decoded = JWT::decode ( $jwt, $pubKey, array (
				'RS256' 
		) );
		
	} catch ( Exception $e ) {
		
		print_r( 'Error message: '. $e->getMessage() );
		
	}
	
	
	print_r ( $decoded );

	//Get jwt as array
	$decoded_array = ( array ) $decoded;

	//calc token lifetime
// 	print_r (($decoded_array[exp] - time())/60);
	
}

JWTencode ( $jwt );

?>