<?php
require_once ( '../config.php' );
require_once (LIBRARY);

use \Firebase\JWT\JWT;

$jwt = $_POST ['jwt'];

function JWTencode($jwt) {
	$pubKey = file_get_contents ( KEYS.'/pubkey.pem' );
	
	try {
		
		$decoded = JWT::decode ( $jwt, $pubKey, array (
				'RS256' 
		) );
		
	} catch ( Exception $e ) {
		
		print_r( 'Error message: '. $e->getMessage() );
		//Print error msg and break out of script
		return false;
	}
		
	print_r ( base64_encode(file_get_contents(RESOURCES."/malamuty.jpg")));
// 	print_r ( base64_encode('hello'));
	
}

JWTencode ( $jwt );

?>