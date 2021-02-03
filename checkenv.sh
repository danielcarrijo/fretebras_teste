#!/bin/bash
echo "==================================================================="
echo " Checking if .env exists"
echo "==================================================================="
cd /var/www/html
service supervisor start
FILE=/var/www/html/.env
if [ -f "$FILE" ]; then
    echo " .env exists. Skipping step..."
else 
    echo " Generating a .env file..."
    cp /var/www/html/.env.example /var/www/html/.env
    echo " Generating an application encryption key..."
    php artisan key:generate
    echo " Generating a JSON Web Token (JWT) encryption key..."
    #Don't show the secret in the terminal.
    php artisan jwt:secret > /dev/null
fi
echo "=============================MIGRATE==============================="
php artisan migrate
echo "==================================================================="
echo " Done. Exiting"
echo "==================================================================="
