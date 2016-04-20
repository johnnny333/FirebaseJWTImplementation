<?php
//Root is in '/phpJWTFirebase' NOT in '/'
define ( 'ROOT', dirname ( dirname ( __FILE__ ) ) . '/FirebaseJWTImplementation/' );
define ( 'CLIENT', ROOT . 'client/' );
define ( 'SERVER', ROOT . 'server/' );
define ( 'KEYS', SERVER. 'keys/' );
define ( 'RESOURCES', SERVER. 'resources/' );
define ( 'LIBRARY', ROOT . 'vendor/autoload.php');
?>