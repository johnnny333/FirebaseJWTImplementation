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
		//Print error msg and break out of script
		return false;
	}
		
	print_r ( base64_encode(file_get_contents("malamuty.jpg")));
// 	print_r ( base64_encode('hello'));
	
}

JWTencode ( $jwt );

?>