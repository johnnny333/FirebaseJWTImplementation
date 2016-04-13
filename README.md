# FirebaseJWTImplementation
Implementation of FirebaseJWT library for handling JWT tokens;

1. $ git clone https://github.com/johnnny333/FirebaseJWTImplementation.git
2. $ cd FirebaseJWTImplementation
3. $ composer install

Generate public and private keys 

4. $ cd server/keys
5. $ openssl genrsa -out privkey.pem 2048
6. $ openssl rsa -in privkey.pem -pubout -out pubkey.pem
7. Fire it up with index.html :)
