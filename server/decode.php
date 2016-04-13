<?php
require_once ('../config.php');
require_once (LIBRARY);

use \Firebase\JWT\JWT;

$jwt = $_POST ['jwt'];
function JWTencode($jwt) {
	$pubKey = file_get_contents ( KEYS . '/pubkey.pem' );
	try {
		$decoded = JWT::decode ( $jwt, $pubKey, array (
				'RS256' 
		));
	} catch ( Exception $e ) {
		
		print_r ( 'Error message: ' . $e->getMessage () );
	}
	
	echo json_encode ( $decoded );
	
	// Get jwt as array
	$decoded_array = ( array ) $decoded;
	
	// calc token lifetime
	// print_r (($decoded_array[exp] - time())/60);
}
JWTencode ( $jwt );
?>